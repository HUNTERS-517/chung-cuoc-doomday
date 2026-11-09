import { useI18n } from '../../context/LocaleContext';
import { cx } from '../../shared/cx';
import styles from './ProfileTab.module.css';

interface ProfileTabProps {
  id: string;
  name: string;
  index: number;
  isActive: boolean;
  /** Current draft while this tab is being renamed, otherwise `null`. */
  draftName: string | null;
  canDelete: boolean;
  onSelect: (id: string) => void;
  onStartRename: (name: string) => void;
  onDraftChange: (name: string) => void;
  onCommitRename: () => void;
  onCancelRename: () => void;
  onDelete: (id: string) => void;
}

/** One profile tab: a selectable tab, or an inline name editor while renaming, plus a hover delete button. */
export function ProfileTab({
  id,
  name,
  index,
  isActive,
  draftName,
  canDelete,
  onSelect,
  onStartRename,
  onDraftChange,
  onCommitRename,
  onCancelRename,
  onDelete,
}: ProfileTabProps) {
  const { t } = useI18n();
  const label = name || index + 1;

  return (
    <div className={styles.configTabGroup} role="presentation">
      {draftName !== null ? (
        <span
          className={cx(
            styles.configTab,
            styles.isActive,
            styles.configNameEditor,
          )}
        >
          <span className={styles.configNameMeasure} aria-hidden="true">
            {draftName || ' '}
          </span>
          <input
            className={styles.configNameInput}
            aria-label={t('profileName')}
            autoFocus
            maxLength={60}
            value={draftName}
            onFocus={(event) => {
              const input = event.currentTarget;
              input.setSelectionRange(input.value.length, input.value.length);
            }}
            onChange={(event) => onDraftChange(event.target.value)}
            onBlur={onCommitRename}
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing) return;
              if (event.key === 'Enter') {
                event.preventDefault();
                event.currentTarget.blur();
              } else if (event.key === 'Escape') {
                event.preventDefault();
                onCancelRename();
              }
            }}
          />
        </span>
      ) : (
        <button
          type="button"
          role="tab"
          aria-selected={isActive}
          className={cx(styles.configTab, isActive && styles.isActive)}
          onClick={() => (isActive ? onStartRename(name) : onSelect(id))}
          title={name || (isActive ? t('selected') : undefined)}
        >
          {label}
        </button>
      )}
      {canDelete && (
        <button
          type="button"
          className={styles.configDelete}
          onClick={() => onDelete(id)}
          aria-label={`${t('deleteProfile')}: ${label}`}
          title={t('deleteProfile')}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
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
  );
}
