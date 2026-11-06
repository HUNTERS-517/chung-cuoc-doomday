import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRowHoverTip } from './useRowHoverTip';
import styles from './InfoTip.module.css';

interface InfoTipProps {
  label: string;
}

export function InfoTip({ label }: InfoTipProps) {
  const id = useId();
  const iconRef = useRef<HTMLSpanElement>(null);
  const [anchor, setAnchor] = useState<DOMRect | null>(null);

  const open = () => {
    if (iconRef.current) setAnchor(iconRef.current.getBoundingClientRect());
  };
  const close = () => setAnchor(null);

  useEffect(() => {
    if (!anchor) return;
    window.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [anchor]);

  const rowHover = useRowHoverTip(iconRef, open, close);

  const width = Math.min(360, window.innerWidth - 24);
  const below = anchor !== null && anchor.top < 200;

  return (
    <span
      ref={iconRef}
      className={styles.infoTip}
      tabIndex={0}
      aria-label={label}
      aria-describedby={anchor ? id : undefined}
      onMouseEnter={open}
      onMouseLeave={rowHover ? undefined : close}
      onFocus={open}
      onBlur={close}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === 'Escape') close();
      }}
    >
      i
      {anchor &&
        createPortal(
          <span
            id={id}
            className={styles.infoPopover}
            role="tooltip"
            style={{
              width,
              left: Math.max(
                12,
                Math.min(
                  anchor.left + anchor.width / 2 - width / 2,
                  window.innerWidth - width - 12,
                ),
              ),
              top: below ? anchor.bottom + 9 : anchor.top - 9,
              transform: below ? undefined : 'translateY(-100%)',
            }}
          >
            {label}
          </span>,
          document.body,
        )}
    </span>
  );
}
