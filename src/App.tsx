import { useMemo, useState } from 'react';
import { AccountInputs } from './components/AccountInputs';
import { Header } from './components/Header';
import { ParameterPanel } from './components/ParameterPanel';
import { ResultsDashboard } from './components/ResultsDashboard';
import { useCalculatorProfiles } from './hooks/useCalculatorProfiles';
import { useCalculatorInputHandlers } from './hooks/useCalculatorInputHandlers';
import { calculate } from './domain/calculator';
import { useNow } from './hooks/useNow';
import { useTranslation } from './context/LocaleContext';
import { CalculatorProvider } from './context/CalculatorContext';
import { cx } from './shared/cx';
import styles from './App.module.css';

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  const {
    profiles,
    activeId,
    activeConfig,
    saveStatus,
    updateActive,
    saveCurrentProfile,
    selectProfile,
    addProfile,
    renameProfile,
    deleteProfile,
  } = useCalculatorProfiles();
  const {
    handleNumericChange,
    handleParameterChange,
    normalizeField,
    showBackupNotice,
    dismissBackupNotice,
  } = useCalculatorInputHandlers(activeConfig, updateActive);

  const now = useNow();
  const t = useTranslation();
  const result = useMemo(
    () => calculate(activeConfig, now),
    [activeConfig, now],
  );

  return (
    <CalculatorProvider config={activeConfig} result={result}>
      <div className={styles.appShell}>
        <Header
          profiles={profiles}
          activeId={activeId}
          saveStatus={saveStatus}
          onRename={renameProfile}
          onSave={saveCurrentProfile}
          onSelect={selectProfile}
          onAdd={addProfile}
          onDelete={deleteProfile}
        />
        <main className={cx(styles.workspace, collapsed && styles.isCollapsed)}>
          <ParameterPanel
            collapsed={collapsed}
            onToggle={() => setCollapsed((value) => !value)}
            onChange={handleParameterChange}
            onGuildBlur={() => normalizeField('guildLevel')}
          />
          <div className={styles.mainColumn}>
            <AccountInputs
              onChange={handleNumericChange}
              onBlur={normalizeField}
            />
            <ResultsDashboard />
          </div>
        </main>

        {showBackupNotice && (
          <div
            className={styles.modalBackdrop}
            role="presentation"
            onMouseDown={dismissBackupNotice}
          >
            <div
              className={styles.modal}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="backup-title"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <span className={styles.modalIcon}>!</span>
              <h2 id="backup-title">{t('backupAdjustedTitle')}</h2>
              <p>{t('backupAdjustedBody')}</p>
              <button type="button" autoFocus onClick={dismissBackupNotice}>
                {t('close')}
              </button>
            </div>
          </div>
        )}
      </div>
    </CalculatorProvider>
  );
}
