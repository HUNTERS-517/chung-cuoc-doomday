import { RECOVERY_RATE_OPTIONS } from '../../domain/defaultFormValue';
import type { CalculatorConfig } from '../../domain/types';
import { useCalculator } from '../../context/CalculatorContext';
import { useTranslation } from '../../context/LocaleContext';
import { cx } from '../../shared/cx';
import {
  GuideBadge,
  GuideHeading,
  PARAMETER_GUIDE_FIELDS,
  useGuideFocusHint,
} from '../Guide';
import { EndDateSection } from './EndDateSection';
import { GuildLevelSection } from './GuildLevelSection';
import { PurchaseRules } from './PurchaseRules';
import { FinalWindowPanel } from './FinalWindowPanel';
import shared from '../shared.module.css';
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
  const { config } = useCalculator();
  const t = useTranslation();
  const hint = useGuideFocusHint();

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

      <EndDateSection onChange={onChange} bindHint={hint.bind} />
      <GuildLevelSection
        onChange={onChange}
        bindHint={hint.bind}
        onGuildBlur={onGuildBlur}
      />

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

      <PurchaseRules onChange={onChange} bindHint={hint.bind} />
      <FinalWindowPanel />
      {hint.popover}
    </aside>
  );
}
