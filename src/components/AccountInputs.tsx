import type { NumericField } from '../domain/types';
import type { TranslationKey } from '../i18n';
import { useCalculator } from '../context/CalculatorContext';
import { useTranslation } from '../context/LocaleContext';
import { cx } from '../shared/cx';
import {
  ACCOUNT_GUIDE_FIELDS,
  CautionButton,
  GuideBadge,
  GuideHeading,
  useGuideFocusHint,
} from './Guide';
import shared from './shared.module.css';
import styles from './AccountInputs.module.css';

interface AccountInputsProps {
  onChange: (field: NumericField, value: string) => void;
  onBlur: (field: NumericField) => void;
}

const fields: Array<{ field: NumericField; label: TranslationKey }> = [
  { field: 'currentMerit', label: 'currentMerit' },
  { field: 'maxHpReset', label: 'maxHpReset' },
  { field: 'currentHp', label: 'currentHp' },
  { field: 'hpBackup', label: 'hpBackup' },
  { field: 'currentBottles', label: 'currentBottles' },
  { field: 'recoveryLimit', label: 'recoveryLimit' },
];

export function AccountInputs({ onChange, onBlur }: AccountInputsProps) {
  const { config } = useCalculator();
  const t = useTranslation();
  const hint = useGuideFocusHint();
  return (
    <section className={cx(shared.card, styles.accountCard)}>
      <div className={shared.sectionHeading}>
        <GuideHeading title={t('accountData')} fields={ACCOUNT_GUIDE_FIELDS}>
          <CautionButton />
        </GuideHeading>
        <span className={shared.sectionIndex}>01</span>
      </div>
      <div className={styles.accountGrid}>
        {fields.map(({ field, label }) => (
          <label className={shared.field} key={field} {...hint.bind(field)}>
            <span>
              {t(label)}
              <GuideBadge field={field} />
            </span>
            <input
              inputMode="decimal"
              value={config[field] as string}
              onChange={(event) => onChange(field, event.target.value)}
              onBlur={() => onBlur(field)}
              aria-label={t(label)}
              placeholder={t('inputHint')}
            />
          </label>
        ))}
      </div>
      {hint.popover}
    </section>
  );
}
