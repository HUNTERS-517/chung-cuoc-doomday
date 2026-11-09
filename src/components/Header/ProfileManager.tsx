import { useState } from 'react';
import type { CalculatorConfig } from '../../domain/types';
import { useI18n } from '../../context/LocaleContext';
import { cx } from '../../shared/cx';
import { ProfileTab } from './ProfileTab';
import styles from './ProfileManager.module.css';

export type SaveStatus = 'saved' | 'unsaved' | 'error';

interface ProfileManagerProps {
  profiles: Pick<CalculatorConfig, 'id' | 'name'>[];
  activeId: string;
  saveStatus: SaveStatus;
  onSave: () => void;
  onRename: (id: string, name: string) => void;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}

interface RenameDraft {
  id: string;
  name: string;
}

/** Profile actions (save / rename / save status) plus the profile tab strip. */
export function ProfileManager({
  profiles,
  activeId,
  saveStatus,
  onSave,
  onRename,
  onSelect,
  onAdd,
  onDelete,
}: ProfileManagerProps) {
  const { t } = useI18n();
  const [renameDraft, setRenameDraft] = useState<RenameDraft | null>(null);
  const saveLabel = saveStatus === 'error' ? t('saveError') : t(saveStatus);

  const commitRename = () => {
    if (renameDraft) onRename(renameDraft.id, renameDraft.name);
    setRenameDraft(null);
  };

  return (
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
            if (profile) setRenameDraft({ id: profile.id, name: profile.name });
          }}
          title={t('renameProfile')}
        >
          {t('rename')}
        </button>
        <span
          className={cx(styles.saveStatus, styles[saveStatus])}
          aria-live="polite"
        >
          <span className={styles.saveDot} />
          {saveLabel}
        </span>
      </div>
      <div
        className={styles.configTabs}
        role="tablist"
        aria-label={t('profile')}
      >
        {profiles.map(({ id, name }, index) => (
          <ProfileTab
            key={id}
            id={id}
            name={name}
            index={index}
            isActive={id === activeId}
            draftName={renameDraft?.id === id ? renameDraft.name : null}
            canDelete={profiles.length > 1}
            onSelect={onSelect}
            onStartRename={(name) => setRenameDraft({ id, name })}
            onDraftChange={(name) => setRenameDraft({ id, name })}
            onCommitRename={commitRename}
            onCancelRename={() => setRenameDraft(null)}
            onDelete={onDelete}
          />
        ))}
        <button
          type="button"
          className={styles.configTabAdd}
          onClick={onAdd}
          aria-label={t('addProfile')}
          title={t('addProfile')}
        >
          +
        </button>
      </div>
    </div>
  );
}
