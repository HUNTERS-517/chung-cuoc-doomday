import { GUIDE_REGIONS } from './guideData';
import type { GuideField } from './guideData';
import { cx } from '../../shared/cx';
import common from './shared/guideCommon.module.css';

/** Small code badge ("A1") shown next to a field label. */
export function GuideBadge({ field }: { field: GuideField }) {
  return (
    <span className={cx(common.badge, common.badgeInline)}>
      {GUIDE_REGIONS[field].code}
    </span>
  );
}
