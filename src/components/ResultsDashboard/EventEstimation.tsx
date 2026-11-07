import type { ReactNode } from 'react';
import { useCalculator } from '../../context/CalculatorContext';
import { useFormat, useTranslation } from '../../context/LocaleContext';
import { InfoTip } from '../InfoTip';
import { ScenarioComparison } from './ScenarioComparison';
import { cx } from '../../shared/cx';
import shared from '../shared.module.css';
import styles from './EventEstimation.module.css';

export function EventEstimation() {
  const { result } = useCalculator();
  const t = useTranslation();
  const format = useFormat();
  const formulaFormat = { formatNumber: format, label: t };
  // Âm nghĩa là không cần xả nữa — hiển thị 0, đơn vị với giá trị âm (in nghiêng, bỏ đậm) xếp hết vào ngoặc.
  const formatDischarge = (value: number | null, unit: string): ReactNode =>
    value !== null && value < 0 ? (
      <>
        {format(0)}{' '}
        <em>
          ({format(value)} {unit})
        </em>
      </>
    ) : (
      <>
        {format(value)} <small>{unit}</small>
      </>
    );

  return (
    <section className={cx(shared.card, styles.summaryCard)}>
      <div className={cx(shared.sectionHeading, shared.sectionHeadingLight)}>
        <h2>{t('projectedTitle')}</h2>
        <span className={shared.sectionIndex}>02</span>
      </div>
      <details
        className={cx(styles.calculationDetails, shared.resultAccordion)}
      >
        <summary className={shared.accordionHeading}>
          <h3>{t('details')}</h3>
        </summary>
        <div className={styles.detailList}>
          <div data-tip-row>
            <span>
              {t('projectedBottles')}{' '}
              <InfoTip
                label={result.totalBottles.formatFormula(formulaFormat)}
              />
            </span>
            <strong>{format(result.totalBottles.value)}</strong>
          </div>
          <div data-tip-row>
            <span>
              {t('bottleHp')}{' '}
              <InfoTip
                label={result.totalBottleHp.formatFormula(formulaFormat)}
              />
            </span>
            <strong>{format(result.totalBottleHp.value)}</strong>
          </div>
          <div data-tip-row>
            <span>
              {t('hpReset')}{' '}
              <InfoTip label={result.resetHp.formatFormula(formulaFormat)} />
            </span>
            <strong>{format(result.resetHp.value)}</strong>
          </div>
          <div data-tip-row>
            <span>
              {t('hpRecovered')}{' '}
              <InfoTip label={result.recoveryHp.formatFormula(formulaFormat)} />
            </span>
            <strong>{format(result.recoveryHp.value)}</strong>
          </div>
          <div data-tip-row>
            <span>
              {t('projectedExtra')}{' '}
              <InfoTip
                label={result.projectionBreakdown.projectedExtra.formatFormula(
                  formulaFormat,
                )}
              />
            </span>
            <strong>
              {format(result.projectionBreakdown.projectedExtra.value)}
            </strong>
          </div>
        </div>
      </details>
      <div className={styles.projectionGrid}>
        <div className={styles.projection} data-tip-row>
          <span>
            {t('currentLevel')}{' '}
            <InfoTip
              label={result.projectionBreakdown.currentLevel.formatFormula(
                formulaFormat,
              )}
            />
          </span>
          <div className={styles.projectionValue}>
            <strong>{format(result.projectedCurrent.value)}</strong>
            <small>HP</small>
          </div>
        </div>
        <div className={styles.projection} data-tip-row>
          <span>
            {t('guildMax')}{' '}
            <InfoTip
              label={result.projectionBreakdown.guildMax.formatFormula(
                formulaFormat,
              )}
            />
          </span>
          <div className={styles.projectionValue}>
            <strong>{format(result.projectedMax.value)}</strong>
            <small>HP</small>
          </div>
        </div>
      </div>
      <ScenarioComparison />
      <div className={styles.timingGrid}>
        <div data-tip-row>
          <span>
            {t('fillTime')}{' '}
            <InfoTip label={result.hoursToFill.formatFormula(formulaFormat)} />
          </span>
          <strong>
            {format(result.hoursToFill.value)} <small>{t('hours')}</small>
          </strong>
        </div>
        <div data-tip-row>
          <span>
            {t('dischargeTime')}{' '}
            <InfoTip
              label={result.dischargeHours.formatFormula(formulaFormat)}
            />
          </span>
          <strong>
            {formatDischarge(result.dischargeHours.value, t('hours'))}
          </strong>
        </div>
        <div className={styles.timingAccent} data-tip-row>
          <span>
            {t('dischargeHp')}{' '}
            <InfoTip label={result.dischargeHp.formatFormula(formulaFormat)} />
          </span>
          <strong>{formatDischarge(result.dischargeHp.value, 'HP')}</strong>
        </div>
      </div>
    </section>
  );
}
