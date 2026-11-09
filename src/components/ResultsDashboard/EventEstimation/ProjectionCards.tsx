import type { ResultWithFormula } from '../../../domain/resultWithFormula';
import type { TranslationKey } from '../../../i18n';
import { useCalculator } from '../../../context/CalculatorContext';
import { useFormat, useTranslation } from '../../../context/LocaleContext';
import { FormulaTip } from '../FormulaTip';
import styles from './ProjectionCards.module.css';

/** The two headline projections: HP at the current level and at guild max. */
export function ProjectionCards() {
  const { result } = useCalculator();
  const t = useTranslation();
  const format = useFormat();
  // The tip explains the breakdown; the big number is the projected total.
  const cards: [TranslationKey, ResultWithFormula, number | null][] = [
    [
      'currentLevel',
      result.projectionBreakdown.currentLevel,
      result.projectedCurrent.value,
    ],
    [
      'guildMax',
      result.projectionBreakdown.guildMax,
      result.projectedMax.value,
    ],
  ];

  return (
    <div className={styles.projectionGrid}>
      {cards.map(([labelKey, breakdown, value]) => (
        <div key={labelKey} className={styles.projection} data-tip-row>
          <span>
            {t(labelKey)} <FormulaTip result={breakdown} />
          </span>
          <div className={styles.projectionValue}>
            <strong>{format(value)}</strong>
            <small>HP</small>
          </div>
        </div>
      ))}
    </div>
  );
}
