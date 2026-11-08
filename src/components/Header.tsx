import { useState } from 'react';
import type { CalculatorConfig, Locale } from '../domain/types';
import { useI18n } from '../context/LocaleContext';
import { cx } from '../shared/cx';
import { appIcon } from '../shared/appIcon';
import styles from './Header.module.css';

const brandIcon = `${import.meta.env.BASE_URL}${appIcon(import.meta.env.DEV)}`;

const localeLabels: Record<Locale, string> = {
  vi: 'VN',
  en: 'EN',
  th: 'TH',
  id: 'ID',
  zh: '中文',
};
const locales = Object.keys(localeLabels) as Locale[];

interface HeaderProps {
  profiles: Pick<CalculatorConfig, 'id' | 'name'>[];
  activeId: string;
  saveStatus: 'saved' | 'unsaved' | 'error';
  onSave: () => void;
  onRename: (id: string, name: string) => void;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}

export function Header({
  profiles,
  activeId,
  saveStatus,
  onSave,
  onRename,
  onSelect,
  onAdd,
  onDelete,
}: HeaderProps) {
  const { locale, changeLocale, t } = useI18n();
  const [renameDraft, setRenameDraft] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const saveLabel = saveStatus === 'error' ? t('saveError') : t(saveStatus);
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarBrand}>
        <img className={styles.brandMark} src={brandIcon} alt="" />

        <div>
          <h1>{t('appTitle')}</h1>
          {/* Easter egg: Dev's in-game ID, shown as a tiny watermark via CSS attr() */}
          <p data-dev-ingame-id="51921435" className={styles.devSignature}>
            From <strong>HUNTERS [S517]</strong> with ❤️
          </p>
        </div>
      </div>

      <div className={styles.topbarControls}>
        <div className={styles.configArea}>
          <div className={styles.configActions}>
            <span className={styles.controlLabel}>{t('profile')}</span>
            <button
              type="button"
              className={cx(
                styles.configSave,
                styles.saveButton,
                saveStatus !== 'saved' && styles.saveButtonPending,
              )}
              onClick={onSave}
              title={t('saveProfile')}
              aria-label={t('saveProfile')}
            >
              {t('save')}
            </button>
            <button
              type="button"
              className={styles.configSave}
              disabled={renameDraft !== null}
              onClick={() => {
                const profile = profiles.find(({ id }) => id === activeId);
                if (profile)
                  setRenameDraft({ id: profile.id, name: profile.name });
              }}
              title={t('renameProfile')}
            >
              {t('rename')}
            </button>
          </div>
          <div
            className={styles.configTabs}
            role="tablist"
            aria-label={t('profile')}
          >
            {profiles.map(({ id, name }, index) => (
              <div
                key={id}
                className={styles.configTabGroup}
                role="presentation"
              >
                {renameDraft?.id === id ? (
                  <span
                    className={cx(
                      styles.configTab,
                      styles.isActive,
                      styles.configNameEditor,
                    )}
                  >
                    <span
                      className={styles.configNameMeasure}
                      aria-hidden="true"
                    >
                      {renameDraft.name || ' '}
                    </span>
                    <input
                      className={styles.configNameInput}
                      aria-label={t('profileName')}
                      autoFocus
                      maxLength={60}
                      value={renameDraft.name}
                      onFocus={(event) => {
                        const input = event.currentTarget;
                        input.setSelectionRange(
                          input.value.length,
                          input.value.length,
                        );
                      }}
                      onChange={(event) =>
                        setRenameDraft({ id, name: event.target.value })
                      }
                      onBlur={() => {
                        onRename(id, renameDraft.name);
                        setRenameDraft(null);
                      }}
                      onKeyDown={(event) => {
                        if (event.nativeEvent.isComposing) return;
                        if (event.key === 'Enter') {
                          event.preventDefault();
                          event.currentTarget.blur();
                        } else if (event.key === 'Escape') {
                          event.preventDefault();
                          setRenameDraft(null);
                        }
                      }}
                    />
                  </span>
                ) : (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={id === activeId}
                    className={cx(
                      styles.configTab,
                      id === activeId && styles.isActive,
                    )}
                    onClick={() => {
                      if (id === activeId) {
                        setRenameDraft({ id, name });
                      } else {
                        onSelect(id);
                      }
                    }}
                    title={
                      name || (id === activeId ? t('selected') : undefined)
                    }
                  >
                    {name || index + 1}
                  </button>
                )}
                {profiles.length > 1 && (
                  <button
                    type="button"
                    className={styles.configDelete}
                    onClick={() => onDelete(id)}
                    aria-label={`${t('deleteProfile')}: ${name || index + 1}`}
                    title={t('deleteProfile')}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                    >
                      <path
                        d="m3 3 6 6m0-6-6 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className={cx(styles.configTab, styles.configTabAdd)}
              onClick={onAdd}
              aria-label={t('addProfile')}
              title={t('addProfile')}
            >
              +
            </button>
          </div>
        </div>

        <div className={styles.headerMeta}>
          <span
            className={cx(styles.saveStatus, styles[saveStatus])}
            aria-live="polite"
          >
            <span className={styles.saveDot} />
            {saveLabel}
          </span>
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
      </div>
    </header>
  );
}
