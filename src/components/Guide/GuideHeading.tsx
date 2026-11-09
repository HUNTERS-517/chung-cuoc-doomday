import type { ReactNode } from 'react';
import type { GuideField } from './guideData';
import { GuideButton } from './GuideButton/GuideButton';
import styles from './GuideHeading.module.css';

/** Section `<h2>` with the guide button right next to it. */
export function GuideHeading({
  title,
  fields,
  compact,
  children,
}: {
  title: string;
  fields: GuideField[];
  compact?: boolean;
  /** Extra buttons rendered right after the guide button. */
  children?: ReactNode;
}) {
  const match = /^([A-Z])\.\s*(.*)$/.exec(title);
  return (
    <div className={styles.group}>
      <h2 className={styles.title}>
        {match ? (
          <>
            <span className={styles.letter}>{match[1]}</span>
            {match[2]}
          </>
        ) : (
          title
        )}
      </h2>
      <GuideButton fields={fields} title={title} compact={compact} />
      {children}
    </div>
  );
}
