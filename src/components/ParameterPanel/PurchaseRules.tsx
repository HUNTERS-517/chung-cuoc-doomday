import { HP_PER_BOTTLE } from '../../domain/calculations/bottleResources';
import { useCalculator } from '../../context/CalculatorContext';
import { useFormat, useTranslation } from '../../context/LocaleContext';
import { cx } from '../../shared/cx';
import { GuideBadge } from '../Guide';
import type { SectionProps } from './shared';
import styles from './PurchaseRules.module.css';

/** Bottle rules, purchase notes and the package / daily-diamond checkboxes. */
export function PurchaseRules({ onChange, bindHint }: SectionProps) {
  const { config } = useCalculator();
  const t = useTranslation();
  const format = useFormat();

  return (
    <div className={styles.ruleBlock}>
      <p className={styles.miniHeading}>{t('otherRules')}</p>
      <p className={styles.ruleCallout}>{t('bottleRate')}</p>
      <div className={styles.ruleNotes}>
        <span>{t('dailyHint')}</span>
        <span>{t('packageHint')}</span>
        <span>200 × 3 × 500 = {format(200 * 3 * HP_PER_BOTTLE)} HP</span>
      </div>
      <label
        className={cx(styles.checkRow, styles.packageOption)}
        {...bindHint('buyPackage249')}
      >
        <input
          type="checkbox"
          checked={config.buyPackage249}
          onChange={(event) =>
            onChange({ buyPackage249: event.target.checked })
          }
        />
        <span className={styles.packageLabel}>
          {t('package249')}
          <GuideBadge field="buyPackage249" />
        </span>
      </label>
      <label className={styles.checkRow} {...bindHint('buyDailyDiamonds')}>
        <input
          type="checkbox"
          checked={config.buyDailyDiamonds}
          onChange={(event) =>
            onChange({ buyDailyDiamonds: event.target.checked })
          }
        />
        <span>
          {t('dailyDiamonds')}
          <GuideBadge field="buyDailyDiamonds" />
        </span>
      </label>
    </div>
  );
}
