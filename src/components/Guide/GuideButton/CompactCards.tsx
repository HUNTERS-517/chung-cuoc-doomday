import { useTranslation } from '../../../context/LocaleContext';
import { GUIDE_REGIONS } from '../guideData';
import type { GuidePanel } from '../guideData';
import { cx } from '../../../shared/cx';
import { GuideCrop } from '../shared/GuideCrop';
import common from '../shared/guideCommon.module.css';
import styles from './CompactCards.module.css';

const COMPACT_CROP_WIDTH = 280;

/**
 * One card per field using the same crop as the focus hint, stacked in the
 * columns of the section's panel layout.
 */
export function CompactCards({ columns }: { columns: GuidePanel[][] }) {
  const t = useTranslation();
  return (
    <div className={styles.columns}>
      {columns.map((column) => (
        <div key={column[0].fields[0]} className={styles.column}>
          {column.flatMap((panel) => [
            panel.noteKey && (
              <p key={`note-${panel.fields[0]}`} className={styles.panelNote}>
                {t(panel.noteKey)}
              </p>
            ),
            ...panel.fields.map((field) => {
              const region = GUIDE_REGIONS[field];
              const isPackage = field === 'buyPackage249';
              return (
                <figure
                  key={field}
                  className={cx(common.card, isPackage && common.packageRegion)}
                >
                  <figcaption
                    className={cx(
                      common.cardCaption,
                      isPackage && common.packageCaption,
                    )}
                  >
                    <span className={common.badge}>{region.code}</span>
                    {t(region.labelKey)}
                  </figcaption>
                  {region.noteKey && (
                    <p className={styles.fieldNote}>{t(region.noteKey)}</p>
                  )}
                  <GuideCrop
                    field={field}
                    maxScale={1}
                    maxWidth={COMPACT_CROP_WIDTH}
                  />
                </figure>
              );
            }),
          ])}
        </div>
      ))}
    </div>
  );
}
