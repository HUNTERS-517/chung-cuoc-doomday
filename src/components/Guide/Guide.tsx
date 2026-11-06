import { useCallback, useEffect, useRef, useState } from 'react';
import type { FocusEvent, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from '../../context/LocaleContext';
import { GUIDE_REGIONS, imagesFor } from './guideData';
import type { GuideField } from './guideData';
import { cx } from '../../shared/cx';
import styles from './Guide.module.css';

/** Small red code badge ("A1") shown next to a field label. */
export function GuideBadge({ field }: { field: GuideField }) {
  return (
    <span className={cx(styles.badge, styles.badgeInline)}>
      {GUIDE_REGIONS[field].code}
    </span>
  );
}

/**
 * "Guide" button that opens a dialog with the annotated screenshots.
 * `compact` shows one card per field using the same crop as the focus hint
 * (good when each field lives on its own screenshot).
 */
export function GuideButton({
  fields,
  title,
  compact = false,
}: {
  fields: GuideField[];
  title: string;
  compact?: boolean;
}) {
  const t = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const images = imagesFor(fields);

  return (
    <>
      <button
        type="button"
        className={styles.guideButton}
        onClick={() => dialogRef.current?.showModal()}
      >
        {t('guide')}
      </button>
      <dialog
        ref={dialogRef}
        className={cx(styles.dialog, compact && styles.dialogCompact)}
        aria-label={title}
        onClick={(event) => {
          // Clicking the backdrop (the dialog element itself) closes it.
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className={styles.dialogHeader}>
          <h3>
            {t('guide')} · {title}
          </h3>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => dialogRef.current?.close()}
            aria-label={t('close')}
          >
            ×
          </button>
        </div>
        <p className={styles.dialogIntro}>{t('guideIntro')}</p>
        {compact ? (
          <div className={styles.cardGrid}>
            {fields.map((field) => (
              <figure key={field} className={styles.card}>
                <figcaption className={styles.cardCaption}>
                  <span className={styles.badge}>
                    {GUIDE_REGIONS[field].code}
                  </span>
                  {t(GUIDE_REGIONS[field].labelKey)}
                </figcaption>
                <GuideCrop
                  field={field}
                  maxScale={1}
                  maxWidth={COMPACT_CROP_WIDTH}
                />
              </figure>
            ))}
          </div>
        ) : (
          <div className={styles.imageGrid}>
            {images.map(({ src, fields: imageFields }) => (
              <figure key={src} className={styles.figure}>
                <img
                  src={src}
                  alt={imageFields.map((f) => GUIDE_REGIONS[f].code).join(', ')}
                  loading="lazy"
                />
                <figcaption>
                  {imageFields.map((f) => (
                    <span key={f} className={styles.badge}>
                      {GUIDE_REGIONS[f].code}
                    </span>
                  ))}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </dialog>
    </>
  );
}

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
    <div className={styles.headingGroup}>
      <h2 className={styles.headingTitle}>
        {match ? (
          <>
            <span className={styles.headingLetter}>{match[1]}</span>
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

const CROP_PADDING = 48;
const MAX_CROP_WIDTH = 300;
const MAX_CROP_HEIGHT = 200;
const MAX_SCALE = 2;
const COMPACT_CROP_WIDTH = 280;

function GuideCrop({
  field,
  maxScale = MAX_SCALE,
  maxWidth = MAX_CROP_WIDTH,
}: {
  field: GuideField;
  maxScale?: number;
  maxWidth?: number;
}) {
  const r = GUIDE_REGIONS[field];
  const [iw, ih] = r.imageSize;
  const [bx, by, bw, bh] = r.box;
  const [cx, cy, cw, ch] = r.crop ?? [
    Math.max(0, bx - CROP_PADDING),
    Math.max(0, by - CROP_PADDING),
    Math.min(iw, bx + bw + CROP_PADDING) - Math.max(0, bx - CROP_PADDING),
    Math.min(ih, by + bh + CROP_PADDING) - Math.max(0, by - CROP_PADDING),
  ];
  const fitWidth = Math.min(maxWidth, window.innerWidth - 40);
  const scale = Math.min(maxScale, fitWidth / cw, MAX_CROP_HEIGHT / ch);
  return (
    <span
      className={styles.crop}
      style={{ width: cw * scale, height: ch * scale }}
    >
      <img
        src={r.focusSrc}
        alt=""
        style={{ width: iw * scale, left: -cx * scale, top: -cy * scale }}
      />
    </span>
  );
}

/**
 * Shows a cropped screenshot of the matching in-game area while a field is
 * focused. Spread `bind(field)` on the field's wrapper; render `popover`.
 */
export function useGuideFocusHint() {
  const t = useTranslation();
  const [active, setActive] = useState<{
    field: GuideField;
    target: HTMLElement;
  } | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reposition = () => setTick((n) => n + 1);
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [active]);

  const bind = useCallback(
    (field: GuideField) => ({
      onFocus: (event: FocusEvent<HTMLElement>) =>
        setActive({ field, target: event.target as HTMLElement }),
      onBlur: () => setActive(null),
    }),
    [],
  );

  let popover = null;
  if (active) {
    const rect = active.target.getBoundingClientRect();
    const r = GUIDE_REGIONS[active.field];
    const width = Math.min(MAX_CROP_WIDTH + 20, window.innerWidth - 24);
    const below = window.innerHeight - rect.bottom > MAX_CROP_HEIGHT + 60;
    popover = createPortal(
      <span
        className={styles.focusPopover}
        role="tooltip"
        style={{
          maxWidth: width,
          left: Math.max(
            12,
            Math.min(rect.left, window.innerWidth - width - 12),
          ),
          top: below ? rect.bottom + 8 : rect.top - 8,
          transform: below ? undefined : 'translateY(-100%)',
        }}
      >
        <span className={styles.focusCaption}>
          <span className={styles.badge}>{r.code}</span>
          {t(r.labelKey)}
        </span>
        <GuideCrop field={active.field} />
      </span>,
      document.body,
    );
  }

  return { bind, popover };
}
