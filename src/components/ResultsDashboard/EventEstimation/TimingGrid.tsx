import type { ReactNode } from 'react';
import { useCalculator } from '../../../context/CalculatorContext';
import { useFormat, useTranslation } from '../../../context/LocaleContext';
import { FormulaTip } from '../FormulaTip';
import styles from './TimingGrid.module.css';

/** Time to fill, time to discharge and HP to discharge. */
export function TimingGrid() {
  const { result } = useCalculator();
  const t = useTranslation();
  const format = useFormat();
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
    <div className={styles.timingGrid}>
      <div data-tip-row>
        <span>
          {t('fillTime')} <FormulaTip result={result.hoursToFill} />
        </span>
        <strong>
          {format(result.hoursToFill.value)} <small>{t('hours')}</small>
        </strong>
      </div>
      <div data-tip-row>
        <span>
          {t('dischargeTime')} <FormulaTip result={result.dischargeHours} />
        </span>
        <strong>
          {formatDischarge(result.dischargeHours.value, t('hours'))}
        </strong>
      </div>
      <div className={styles.timingAccent} data-tip-row>
        <span>
          {t('dischargeHp')} <FormulaTip result={result.dischargeHp} />
        </span>
        <strong>{formatDischarge(result.dischargeHp.value, 'HP')}</strong>
      </div>
    </div>
  );
}
