import { GUIDE_REGIONS } from '../guideData';
import type { GuidePanel } from '../guideData';
import { cx } from '../../../shared/cx';
import styles from './PanelGrid.module.css';

/**
 * Annotated image filling the column, trimmed to `panel.crop` when set.
 * Capped at its natural pixel width so it is never upscaled (stays sharp).
 */
export function PanelImage({ panel }: { panel: GuidePanel }) {
  const alt = panel.fields.map((f) => GUIDE_REGIONS[f].code).join(', ');
  const [iw, ih] = panel.imageSize;
  // width/height attributes give the <img> its real box before it loads.
  // Without them a lazy, not-yet-loaded crop image is 0px tall and sits
  // above its overflow:hidden frame, so Safari never sees it as visible
  // and never loads it.
  if (!panel.crop) {
    return (
      <img
        src={panel.src}
        alt={alt}
        width={iw}
        height={ih}
        loading="lazy"
        className={styles.panelImage}
        style={{ maxWidth: iw }}
      />
    );
  }
  const [x, y, w, h] = panel.crop;
  return (
    <span
      className={cx(styles.panelImage, styles.panelCrop)}
      style={{ aspectRatio: `${w} / ${h}`, maxWidth: w }}
    >
      <img
        src={panel.src}
        alt={alt}
        width={iw}
        height={ih}
        loading="lazy"
        style={{
          width: `${(iw / w) * 100}%`,
          left: `${(-x / w) * 100}%`,
          top: `${(-y / h) * 100}%`,
        }}
      />
    </span>
  );
}
