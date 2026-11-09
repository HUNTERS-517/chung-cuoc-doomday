import type { Locale } from '../../domain/types';
import { useI18n } from '../../context/LocaleContext';
import styles from './LanguageSwitcher.module.css';

const localeLabels: Record<Locale, string> = {
  vi: 'VN',
  en: 'EN',
  th: 'TH',
  id: 'ID',
  zh: '中文',
};
const locales = Object.keys(localeLabels) as Locale[];

/** Language switcher: segmented buttons on desktop, a select on mobile. */
export function LanguageSwitcher() {
  const { locale, changeLocale, t } = useI18n();
  return (
    <div className={styles.languageArea}>
      <div className={styles.languageSwitch} aria-label={t('language')}>
        {locales.map((code) => (
          <button
            key={code}
            type="button"
            className={locale === code ? styles.isActive : ''}
            onClick={() => changeLocale(code)}
          >
            {localeLabels[code]}
          </button>
        ))}
      </div>
      <select
        className={styles.languageSelect}
        value={locale}
        onChange={(e) => changeLocale(e.target.value as Locale)}
        aria-label={t('language')}
      >
        {locales.map((code) => (
          <option key={code} value={code}>
            {localeLabels[code]}
          </option>
        ))}
      </select>
    </div>
  );
}
