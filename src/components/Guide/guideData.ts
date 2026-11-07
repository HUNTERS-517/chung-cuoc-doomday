import regions from '../../assets/guide-regions.json';
import type { CalculatorConfig } from '../../domain/types';
import type { TranslationKey } from '../../i18n';

export type GuideField = keyof typeof regions.fields & keyof CalculatorConfig;
type Rect = [x: number, y: number, w: number, h: number];

export interface GuideRegion {
  field: GuideField;
  code: string;
  /** Localized field label, used as the focus-popover caption. */
  labelKey: TranslationKey;
  /** Section image with every box of the section (guide dialog). */
  src: string;
  /** Image with only this field's box (focus hint crop). */
  focusSrc: string;
  imageName: string;
  imageSize: [number, number];
  box: Rect;
  crop?: Rect;
  /** Optional hint shown under the field's caption in the guide dialog. */
  noteKey?: TranslationKey;
}

const LABEL_KEYS: Record<GuideField, TranslationKey> = {
  currentMerit: 'currentMerit',
  maxHpReset: 'maxHpReset',
  currentHp: 'currentHp',
  hpBackup: 'hpBackup',
  currentBottles: 'currentBottles',
  recoveryLimit: 'recoveryLimit',
  endDate: 'endDate',
  guildLevel: 'currentGuildLevel',
  recoveryRate: 'hpRecoveryRate',
  buyPackage249: 'package249',
  buyDailyDiamonds: 'dailyDiamonds',
};

const notedImages = import.meta.glob<string>('../../assets/*_noted*.webp', {
  eager: true,
  import: 'default',
});

function notedUrl(notedImage: string): string {
  const key = `../../assets/${notedImage}`;
  const url = notedImages[key];
  if (!url) throw new Error(`Missing guide image ${key}`);
  return url;
}

export const GUIDE_REGIONS = Object.fromEntries(
  Object.entries(regions.fields).map(([field, r]) => {
    const region: GuideRegion = {
      field: field as GuideField,
      code: r.code,
      labelKey: LABEL_KEYS[field as GuideField],
      src: notedUrl(r.notedImage),
      focusSrc: notedUrl(r.focusImage),
      imageName: r.image,
      imageSize: regions.imageSizes[
        r.image as keyof typeof regions.imageSizes
      ] as [number, number],
      box: r.box as Rect,
      crop: 'crop' in r ? (r.crop as Rect) : undefined,
      noteKey: 'noteKey' in r ? (r.noteKey as TranslationKey) : undefined,
    };
    return [field, region];
  }),
) as Record<GuideField, GuideRegion>;

export const ACCOUNT_GUIDE_FIELDS: GuideField[] = [
  'currentMerit',
  'maxHpReset',
  'currentHp',
  'hpBackup',
  'currentBottles',
  'recoveryLimit',
];

export const PARAMETER_GUIDE_FIELDS: GuideField[] = [
  'endDate',
  'guildLevel',
  'recoveryRate',
  'buyPackage249',
  'buyDailyDiamonds',
];

/** One annotated image (optionally cropped) plus the fields it explains. */
export interface GuidePanel {
  src: string;
  imageSize: [number, number];
  fields: GuideField[];
  /** Match left/right captions to the corresponding marks on the image. */
  legendLayout?: 'split';
  crop?: Rect;
  /** Optional explanatory note shown above the panel. */
  noteKey?: TranslationKey;
}

/**
 * Guide-dialog columns for a set of fields. Uses the section's `panels`
 * layout from guide-regions.json when present; otherwise one column per
 * distinct annotated image, in field order.
 */
export function panelsFor(fields: GuideField[]): GuidePanel[][] {
  const panel = (
    panelFields: GuideField[],
    crop?: Rect,
    noteKey?: TranslationKey,
    legendLayout?: GuidePanel['legendLayout'],
  ): GuidePanel => {
    const { src, imageSize } = GUIDE_REGIONS[panelFields[0]];
    return { src, imageSize, fields: panelFields, crop, noteKey, legendLayout };
  };
  const section = GUIDE_REGIONS[fields[0]].code[0];
  const layout = (
    regions.panels as Partial<
      Record<
        string,
        {
          fields: string[];
          crop?: number[];
          noteKey?: string;
          legendLayout?: GuidePanel['legendLayout'];
        }[][]
      >
    >
  )[section];
  if (layout) {
    return layout.map((column) =>
      column.map((p) =>
        panel(
          p.fields as GuideField[],
          p.crop as Rect,
          p.noteKey as TranslationKey | undefined,
          p.legendLayout,
        ),
      ),
    );
  }
  const bySrc = new Map<string, GuideField[]>();
  for (const field of fields) {
    const { src } = GUIDE_REGIONS[field];
    bySrc.set(src, [...(bySrc.get(src) ?? []), field]);
  }
  return [...bySrc.values()].map((imageFields) => [panel(imageFields)]);
}
