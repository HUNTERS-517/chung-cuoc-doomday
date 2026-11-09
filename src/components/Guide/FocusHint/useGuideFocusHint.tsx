import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { FocusEvent } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../../../context/LocaleContext';
import { GUIDE_REGIONS } from '../guideData';
import type { GuideField } from '../guideData';
import { cx } from '../../../shared/cx';
import { GuideCrop, MAX_CROP_WIDTH } from '../shared/GuideCrop';
import { focusHintPosition } from './focusHintPosition';
import common from '../shared/guideCommon.module.css';
import styles from './FocusHint.module.css';

/**
 * Shows a cropped screenshot of the matching in-game area while a field is
 * focused. Spread `bind(field)` on the field's wrapper; render `popover`.
 */
export function useGuideFocusHint() {
  const t = useTranslation();
  const [active, setActive] = useState<{
    field: GuideField;
    target: HTMLElement;
  } | null>(null);
  const [tick, setTick] = useState(0);
  const popoverRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!active) return;
    const reposition = () => setTick((n) => n + 1);
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    const viewport = window.visualViewport;
    viewport?.addEventListener('scroll', reposition);
    viewport?.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
      viewport?.removeEventListener('scroll', reposition);
      viewport?.removeEventListener('resize', reposition);
    };
  }, [active]);

  useLayoutEffect(() => {
    const element = popoverRef.current;
    if (!active || !element) return;
    const viewport = window.visualViewport;
    const bounds = {
      top: viewport?.offsetTop ?? 0,
      left: viewport?.offsetLeft ?? 0,
      width: viewport?.width ?? window.innerWidth,
      height: viewport?.height ?? window.innerHeight,
    };
    element.style.maxWidth = `${Math.min(MAX_CROP_WIDTH + 22, bounds.width - 24)}px`;
    // Measure the actual caption and crop, including wrapped translations.
    element.style.maxHeight = 'none';
    const position = focusHintPosition(
      active.target.getBoundingClientRect(),
      bounds,
      element.getBoundingClientRect(),
    );
    element.style.left = `${position.left}px`;
    element.style.top = `${position.top}px`;
    element.style.maxHeight = `${position.height}px`;
    element.style.visibility = position.visible ? 'visible' : 'hidden';
  }, [active, tick, t]);

  const bind = useCallback(
    (field: GuideField) => ({
      onFocus: (event: FocusEvent<HTMLElement>) =>
        setActive({ field, target: event.target as HTMLElement }),
      onBlur: () => setActive(null),
    }),
    [],
  );

  let popover = null;
  if (active) {
    const r = GUIDE_REGIONS[active.field];
    const isPackage = active.field === 'buyPackage249';
    popover = createPortal(
      <span
        ref={popoverRef}
        className={cx(styles.popover, isPackage && styles.package)}
        role="tooltip"
      >
        <span
          className={cx(styles.caption, isPackage && common.packageCaption)}
        >
          <span className={common.badge}>{r.code}</span>
          {t(r.labelKey)}
        </span>
        <GuideCrop field={active.field} className={styles.crop} />
      </span>,
      document.body,
    );
  }

  return { bind, popover };
}
