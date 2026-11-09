import { useCalculator } from '../../context/CalculatorContext';
import { useFormat, useTranslation } from '../../context/LocaleContext';
import { GuideBadge } from '../Guide';
import { splitMinutes, type SectionProps } from './shared';
import shared from '../shared.module.css';
import styles from './EndDateSection.module.css';

/** End-date input plus the countdown to the final day. */
export function EndDateSection({ onChange, bindHint }: SectionProps) {
  const { config, result } = useCalculator();
  const t = useTranslation();
  const format = useFormat();
  const remaining = splitMinutes(result.minutesRemaining);
  const [countdownBefore, countdownAfter] = t('timeUntilFinalDay20').split(
    '{time}',
  );

  return (
    <div className={styles.fieldStack}>
      <label className={shared.field} {...bindHint('endDate')}>
        <span className={styles.endDateHeading}>
          <span className={styles.endDateLabel}>
            {t('endDate')}
            <GuideBadge field="endDate" />
          </span>
          <small className={styles.endsAt}>{t('endsAt')}</small>
        </span>
        <input
          type="date"
          value={config.endDate}
          onChange={(event) => onChange({ endDate: event.target.value })}
        />
      </label>
      <div className={styles.timePanel}>
        <span>
          {countdownBefore}
          <span className={styles.finalDayTime}>{t('finalDay20')}</span>
          {countdownAfter}
        </span>
        <strong>
          {format(remaining.hours)} <small>{t('hours')}</small>{' '}
          {format(remaining.minutes)} <small>{t('minutes')}</small>{' '}
          <small>
            ({format(result.daysRemaining)} {t('days')})
          </small>
        </strong>
        <small>{t('finalHoursSafetyNote')}</small>
      </div>
    </div>
  );
}
