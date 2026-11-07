import { HP_PER_BOTTLE } from '../domain/calculations/bottleResources';
import { MINUTES_PER_HOUR } from '../domain/resultWithFormula';
import { RECOVERY_RATE_OPTIONS } from '../domain/defaultFormValue';
import type { CalculatorConfig } from '../domain/types';
import { useCalculator } from '../context/CalculatorContext';
import { useFormat, useTranslation } from '../context/LocaleContext';
import { cx } from '../shared/cx';
import { GuideBadge, GuideHeading, useGuideFocusHint } from './Guide/Guide';
import { PARAMETER_GUIDE_FIELDS } from './Guide/guideData';
import shared from './shared.module.css';
import styles from './ParameterPanel.module.css';

interface ParameterPanelProps {
  collapsed: boolean;
  onToggle: () => void;
  onChange: (patch: Partial<CalculatorConfig>) => void;
  onGuildBlur: () => void;
}

export function ParameterPanel({
  collapsed,
  onToggle,
  onChange,
  onGuildBlur,
}: ParameterPanelProps) {
  const { config, result } = useCalculator();
  const t = useTranslation();
  const format = useFormat();
  const hint = useGuideFocusHint();
  const finalWindowHours =
    result.finalWindowMinutes === null
      ? null
      : Math.floor(result.finalWindowMinutes / MINUTES_PER_HOUR);
  const finalWindowMinutePart =
    result.finalWindowMinutes === null
      ? null
      : result.finalWindowMinutes % MINUTES_PER_HOUR;
  const finalWindowHp = result.finalWindowRecoveryHp.value;
  const remainingHours =
    result.minutesRemaining === null
      ? null
      : Math.floor(result.minutesRemaining / MINUTES_PER_HOUR);
  const remainingMinutes =
    result.minutesRemaining === null
      ? null
      : result.minutesRemaining % MINUTES_PER_HOUR;
  if (collapsed) {
    return (
      <button type="button" className={styles.expandButton} onClick={onToggle}>
        <span>→</span>
        {t('expand')}
      </button>
    );
  }

  return (
    <aside className={cx(shared.card, styles.panel)}>
      <div className={shared.sectionHeading}>
        <GuideHeading
          title={t('parameters')}
          fields={PARAMETER_GUIDE_FIELDS}
          compact
        />
        <button type="button" className={styles.textButton} onClick={onToggle}>
          {t('collapse')} ←
        </button>
      </div>

      <div className={styles.fieldStack}>
        <label className={shared.field} {...hint.bind('endDate')}>
          <span>
            {t('endDate')}
            <GuideBadge field="endDate" />
          </span>
          <input
            type="date"
            value={config.endDate}
            onChange={(event) => onChange({ endDate: event.target.value })}
          />
          <small>{t('endsAt')}</small>
        </label>
        <div className={styles.timePanel}>
          <span>{t('timeUntilFinalDay20')}</span>
          <strong>
            {format(remainingHours)} <small>{t('hours')}</small>{' '}
            {format(remainingMinutes)} <small>{t('minutes')}</small>{' '}
            <small>
              ({format(result.daysRemaining)} {t('days')})
            </small>
          </strong>
        </div>
      </div>

      <div className={styles.fieldGrid}>
        <label className={shared.field} {...hint.bind('guildLevel')}>
          <span>
            {t('currentGuildLevel')}
            <GuideBadge field="guildLevel" />
          </span>
          <input
            inputMode="decimal"
            value={config.guildLevel}
            onChange={(event) => onChange({ guildLevel: event.target.value })}
            onBlur={onGuildBlur}
          />
        </label>
        <label className={shared.field}>
          <span>{t('maxGuildLevel')}</span>
          <select
            value={config.maxGuildLevel}
            onChange={(event) =>
              onChange({ maxGuildLevel: Number(event.target.value) as 27 | 40 })
            }
          >
            <option value={27}>27</option>
            <option value={40}>40</option>
          </select>
        </label>
      </div>

      <label className={shared.field} {...hint.bind('recoveryRate')}>
        <span>
          {t('hpRecoveryRate')}
          <GuideBadge field="recoveryRate" />
        </span>
        <select
          value={config.recoveryRate}
          onChange={(event) =>
            onChange({ recoveryRate: Number(event.target.value) })
          }
        >
          {RECOVERY_RATE_OPTIONS.map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.statRow}>
        <span>{t('extraBottlesAtMax')}</span>
        <strong>{format(result.extraMaxBottles)}</strong>
      </div>

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
          {...hint.bind('buyPackage249')}
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
        <label className={styles.checkRow} {...hint.bind('buyDailyDiamonds')}>
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

      <div className={styles.finalHoursPanel}>
        <span className={styles.finalHoursTitle}>{t('finalWindowTitle')}</span>
        <span>
          {format(finalWindowHours)} {t('hours')}{' '}
          {format(finalWindowMinutePart)} {t('minutes')} {t('finalTimeLeft')}
        </span>
        <strong>
          {format(finalWindowHp)} HP ≈{' '}
          {format(
            finalWindowHp === null ? null : finalWindowHp / HP_PER_BOTTLE,
          )}{' '}
          {t('bottles')}
        </strong>
        <small>
          ({format(finalWindowHours)} {t('hours')} × {MINUTES_PER_HOUR}{' '}
          {t('minutesShort')} + {format(finalWindowMinutePart)}{' '}
          {t('minutesShort')}) × {format(config.recoveryRate)} HP/
          {t('minutesShort')}
        </small>
      </div>
      {hint.popover}
    </aside>
  );
}
