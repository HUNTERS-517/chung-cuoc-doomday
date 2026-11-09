import type { CSSProperties } from 'react';
import { useTranslation } from '../../../context/LocaleContext';
import { GUIDE_REGIONS } from '../guideData';
import type { GuidePanel } from '../guideData';
import { cx } from '../../../shared/cx';
import { PanelImage } from './PanelImage';
import common from '../shared/guideCommon.module.css';
import styles from './PanelGrid.module.css';

/** Full annotated screenshots, one figure per panel, laid out in columns. */
export function PanelGrid({ columns }: { columns: GuidePanel[][] }) {
  const t = useTranslation();
  return (
    <div
      className={styles.grid}
      style={
        {
          '--cols': Math.min(columns.length, 3),
          '--cols-md': Math.min(columns.length, 2),
        } as CSSProperties
      }
    >
      {columns.map((column) => (
        <div key={column[0].fields[0]} className={styles.column}>
          {column.map((panel) => (
            <figure
              key={panel.fields[0]}
              className={cx(common.card, styles.figure)}
            >
              <figcaption
                className={cx(
                  styles.legend,
                  panel.legendLayout === 'split' && styles.legendSplit,
                )}
              >
                {panel.fields.map((f) => (
                  <span
                    key={f}
                    className={cx(
                      common.cardCaption,
                      styles.legendItem,
                      f === 'buyPackage249' && common.packageCaption,
                    )}
                  >
                    <span className={cx(common.badge, styles.legendBadge)}>
                      {GUIDE_REGIONS[f].code}
                    </span>
                    {t(GUIDE_REGIONS[f].labelKey)}
                  </span>
                ))}
              </figcaption>
              <PanelImage panel={panel} />
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
