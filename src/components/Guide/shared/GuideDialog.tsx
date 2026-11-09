import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from '../../../context/LocaleContext';
import { cx } from '../../../shared/cx';
import styles from './GuideDialog.module.css';

/**
 * Pill button that opens a modal dialog with a header, close button and
 * intro line. Clicking the backdrop closes it.
 */
export function GuideDialog({
  label,
  title,
  heading,
  headingClassName,
  intro,
  size,
  tone = 'default',
  children,
}: {
  /** Trigger button content. */
  label: ReactNode;
  /** Accessible name of the dialog. */
  title: string;
  heading: ReactNode;
  headingClassName?: string;
  intro: ReactNode;
  size: 'fit' | 'compact' | 'caution';
  tone?: 'default' | 'caution';
  children: ReactNode;
}) {
  const t = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        className={cx(
          styles.trigger,
          tone === 'caution' && styles.triggerCaution,
        )}
        onClick={() => dialogRef.current?.showModal()}
      >
        {label}
      </button>
      <dialog
        ref={dialogRef}
        className={cx(styles.dialog, styles[size])}
        aria-label={title}
        onClick={(event) => {
          // Clicking the backdrop (the dialog element itself) closes it.
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className={styles.header}>
          <h3 className={headingClassName}>{heading}</h3>
          <button
            type="button"
            className={styles.closeButton}
            onClick={close}
            aria-label={t('close')}
          >
            ×
          </button>
        </div>
        <p className={styles.intro}>{intro}</p>
        {children}
      </dialog>
    </>
  );
}
