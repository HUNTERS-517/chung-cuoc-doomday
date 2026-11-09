import { useCalculator } from '../../context/CalculatorContext';
import { useFormat, useTranslation } from '../../context/LocaleContext';
import { GuideBadge } from '../Guide';
import type { SectionProps } from './shared';
import shared from '../shared.module.css';
import styles from './GuildLevelSection.module.css';

interface GuildLevelSectionProps extends SectionProps {
  onGuildBlur: () => void;
}

/** Current / max guild level inputs and the extra resources gained at max level. */
export function GuildLevelSection({
  onChange,
  bindHint,
  onGuildBlur,
}: GuildLevelSectionProps) {
  const { config, result } = useCalculator();
  const t = useTranslation();
  const format = useFormat();

  return (
    <>
      <div className={styles.fieldGrid}>
        <label className={shared.field} {...bindHint('guildLevel')}>
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
            <option value={27}>{t('qualifierRound')} (27)</option>
            <option value={40}>{t('officialRound')} (40)</option>
          </select>
        </label>
      </div>

      <div className={styles.statBlock}>
        <div className={styles.statRow}>
          <span>{t('extraBottlesAtMax')}</span>
          <strong>{format(result.extraMaxBottles)}</strong>
        </div>
        <div className={styles.statRow}>
          <span>{t('extraHpAtMax')}</span>
          <strong>{format(result.extraMaxHp.value)}</strong>
        </div>
      </div>
    </>
  );
}
