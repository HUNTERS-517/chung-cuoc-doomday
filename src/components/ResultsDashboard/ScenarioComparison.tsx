import { useCalculator } from '../../context/CalculatorContext';
import { useFormat, useTranslation } from '../../context/LocaleContext';
import { cx } from '../../shared/cx';
import { FormulaTip } from './FormulaTip';
import shared from '../shared.module.css';
import styles from './ScenarioComparison.module.css';

const scenarioKeys = ['both', 'noPackage', 'noDaily', 'neither'] as const;

export function ScenarioComparison() {
  const { result } = useCalculator();
  const t = useTranslation();
  const format = useFormat();
  const selectedScenario = result.selectedScenario;

  return (
    <details className={cx(styles.comparisonDetails, shared.resultAccordion)}>
      <summary className={shared.accordionHeading}>
        <h3>{t('comparisons')}</h3>
      </summary>
      <div className={styles.comparisonContent}>
        <div className={styles.comparisonHeading}>
          <span aria-hidden="true" />
          <span>{t('currentLevel')}</span>
          <span>
            {t('guildMax')} <FormulaTip result={result.extraMaxHp} />
          </span>
        </div>
        <div className={styles.comparisonTable}>
          {scenarioKeys.map((key) => (
            <div
              className={cx(
                styles.comparisonRow,
                key === selectedScenario && styles.isCurrent,
              )}
              key={key}
              data-tip-row
            >
              <span>
                {t(key)} <FormulaTip result={result.scenarios[key].current} />{' '}
                {key === selectedScenario && <em>{t('currentScenario')}</em>}
              </span>
              <strong>
                <small className={styles.mobileLabel}>
                  {t('currentLevel')}
                </small>
                {format(result.scenarios[key].current.value)}
              </strong>
              <strong>
                <small className={styles.mobileLabel}>{t('guildMax')}</small>
                {format(result.scenarios[key].max.value)}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}
