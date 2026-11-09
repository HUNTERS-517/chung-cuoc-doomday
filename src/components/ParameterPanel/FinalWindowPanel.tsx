import { HP_PER_BOTTLE } from '../../domain/calculations/bottleResources';
import { MINUTES_PER_HOUR } from '../../domain/resultWithFormula';
import { useCalculator } from '../../context/CalculatorContext';
import { useFormat, useTranslation } from '../../context/LocaleContext';
import { splitMinutes } from './shared';
import styles from './FinalWindowPanel.module.css';

/** HP recovered during the final window, with the formula behind it. */
export function FinalWindowPanel() {
  const { config, result } = useCalculator();
  const t = useTranslation();
  const format = useFormat();
  const { hours, minutes } = splitMinutes(result.finalWindowMinutes);
  const hp = result.finalWindowRecoveryHp.value;

  return (
    <div className={styles.finalHoursPanel}>
      <span className={styles.finalHoursTitle}>{t('finalWindowTitle')}</span>
      <span>
        {format(hours)} {t('hours')} {format(minutes)} {t('minutes')}{' '}
        {t('finalTimeLeft')}
      </span>
      <strong>
        {format(hp)} HP ≈ {format(hp === null ? null : hp / HP_PER_BOTTLE)}{' '}
        {t('bottles')}
      </strong>
      <small>
        ({format(hours)} {t('hours')} × {MINUTES_PER_HOUR} {t('minutesShort')} +{' '}
        {format(minutes)} {t('minutesShort')}) × {format(config.recoveryRate)}{' '}
        HP/
        {t('minutesShort')}
      </small>
    </div>
  );
}
