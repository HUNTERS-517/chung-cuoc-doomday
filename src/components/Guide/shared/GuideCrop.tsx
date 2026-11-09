import { GUIDE_REGIONS } from '../guideData';
import type { GuideField } from '../guideData';
import { cx } from '../../../shared/cx';
import styles from './GuideCrop.module.css';

const CROP_PADDING = 48;
export const MAX_CROP_WIDTH = 300;
const MAX_CROP_HEIGHT = 200;
const MAX_SCALE = 2;

/**
 * The field's focus screenshot, cropped around its box (or `region.crop`)
 * and scaled to fit `maxWidth` × MAX_CROP_HEIGHT.
 */
export function GuideCrop({
  field,
  maxScale = MAX_SCALE,
  maxWidth = MAX_CROP_WIDTH,
  className,
}: {
  field: GuideField;
  maxScale?: number;
  maxWidth?: number;
  className?: string;
}) {
  const r = GUIDE_REGIONS[field];
  const [iw, ih] = r.imageSize;
  const [bx, by, bw, bh] = r.box;
  const [cx0, cy0, cw, ch] = r.crop ?? [
    Math.max(0, bx - CROP_PADDING),
    Math.max(0, by - CROP_PADDING),
    Math.min(iw, bx + bw + CROP_PADDING) - Math.max(0, bx - CROP_PADDING),
    Math.min(ih, by + bh + CROP_PADDING) - Math.max(0, by - CROP_PADDING),
  ];
  const fitWidth = Math.min(maxWidth, window.innerWidth - 40);
  const scale = Math.min(maxScale, fitWidth / cw, MAX_CROP_HEIGHT / ch);
  return (
    <span
      className={cx(styles.crop, className)}
      style={{ width: cw * scale, height: ch * scale }}
    >
      <img
        src={r.focusSrc}
        alt=""
        style={{ width: iw * scale, left: -cx0 * scale, top: -cy0 * scale }}
      />
    </span>
  );
}
