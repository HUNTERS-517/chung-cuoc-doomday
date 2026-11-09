import { useTranslation } from '../../../context/LocaleContext';
import { panelsFor } from '../guideData';
import type { GuideField } from '../guideData';
import { GuideDialog } from '../shared/GuideDialog';
import { CompactCards } from './CompactCards';
import { PanelGrid } from './PanelGrid';

/**
 * "Guide" button that opens a dialog with the annotated screenshots.
 * `compact` shows one card per field using the same crop as the focus hint
 * (good when each field lives on its own screenshot), stacked in the
 * columns given by the section's `panels` layout.
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
  const columns = panelsFor(fields);

  return (
    <GuideDialog
      label={t('guide')}
      title={title}
      heading={
        <>
          {t('guide')} · {title}
        </>
      }
      intro={t('guideIntro')}
      size={compact ? 'compact' : 'fit'}
    >
      {compact ? (
        <CompactCards columns={columns} />
      ) : (
        <PanelGrid columns={columns} />
      )}
    </GuideDialog>
  );
}
