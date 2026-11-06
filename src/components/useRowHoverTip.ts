import { useEffect, useState, type RefObject } from 'react';

/** Rows marked with this attribute open their InfoTip on hover (desktop only). */
const TIP_ROW_ATTR = 'data-tip-row';

/** Delay so sweeping the mouse across rows doesn't flash every tooltip. */
const ROW_HOVER_DELAY_MS = 250;

const canHover = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Desktop: hovering the closest `[data-tip-row]` ancestor of `iconRef`
 * (not just the icon) opens the tooltip after a short delay.
 * Returns true when the row handles hover, so the icon can skip its own
 * mouseleave (leaving the icon but staying in the row keeps it open).
 */
export function useRowHoverTip(
  iconRef: RefObject<HTMLElement | null>,
  open: () => void,
  close: () => void,
): boolean {
  const [rowHover, setRowHover] = useState(false);

  useEffect(() => {
    const row = iconRef.current?.closest<HTMLElement>(`[${TIP_ROW_ATTR}]`);
    if (!row || !canHover()) return;
    setRowHover(true);
    let timer: number | undefined;
    const enter = () => {
      timer = window.setTimeout(open, ROW_HOVER_DELAY_MS);
    };
    const leave = () => {
      window.clearTimeout(timer);
      close();
    };
    row.addEventListener('mouseenter', enter);
    row.addEventListener('mouseleave', leave);
    return () => {
      window.clearTimeout(timer);
      row.removeEventListener('mouseenter', enter);
      row.removeEventListener('mouseleave', leave);
    };
    // open/close only read the ref / call setState at event time, so binding
    // once on mount is safe.
  }, []);

  return rowHover;
}
