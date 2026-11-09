import type { ResultWithFormula } from '../../../domain/resultWithFormula';
import type { TranslationKey } from '../../../i18n';
import { useCalculator } from '../../../context/CalculatorContext';
import { useFormat, useTranslation } from '../../../context/LocaleContext';
import { cx } from '../../../shared/cx';
import { FormulaTip } from '../FormulaTip';
import shared from '../../shared.module.css';
import styles from './CalculationDetails.module.css';

/** Collapsible breakdown of the intermediate values behind the projection. */
export function CalculationDetails() {
  const { result } = useCalculator();
  const t = useTranslation();
  const format = useFormat();
  const rows: [TranslationKey, ResultWithFormula][] = [
    ['projectedBottles', result.totalBottles],
    ['bottleHp', result.totalBottleHp],
    ['hpReset', result.resetHp],
    ['hpRecovered', result.recoveryHp],
    ['projectedExtra', result.projectionBreakdown.projectedExtra],
  ];

  return (
    <details className={cx(styles.calculationDetails, shared.resultAccordion)}>
      <summary className={shared.accordionHeading}>
        <h3>{t('details')}</h3>
      </summary>
      <div className={styles.detailList}>
        {rows.map(([labelKey, row]) => (
          <div key={labelKey} data-tip-row>
            <span>
              {t(labelKey)} <FormulaTip result={row} />
            </span>
            <strong>{format(row.value)}</strong>
          </div>
        ))}
      </div>
    </details>
  );
}
