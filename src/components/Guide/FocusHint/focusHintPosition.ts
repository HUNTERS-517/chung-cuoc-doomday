const MARGIN = 12;
const GAP = 8;

export function focusHintPosition(
  target: { top: number; bottom: number; left: number },
  viewport: { top: number; left: number; width: number; height: number },
  size: { width: number; height: number },
) {
  const bottom = viewport.top + viewport.height;
  const above = Math.max(0, target.top - GAP - viewport.top - MARGIN);
  const below = Math.max(0, bottom - MARGIN - target.bottom - GAP);
  const placeBelow = below >= size.height || below >= above;
  const height = Math.min(size.height, placeBelow ? below : above);

  return {
    left: Math.max(
      viewport.left + MARGIN,
      Math.min(
        target.left,
        viewport.left + viewport.width - size.width - MARGIN,
      ),
    ),
    top: placeBelow ? target.bottom + GAP : target.top - GAP - height,
    height,
    // Hide when the input is offscreen or there is no useful room for a hint.
    visible:
      target.top >= viewport.top && target.bottom <= bottom && height >= 60,
  };
}
