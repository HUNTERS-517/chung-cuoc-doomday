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

const notedImages = import.meta.glob<string>('../../assets/*_noted*.png', {
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

/** Distinct annotated images used by a set of fields, in field order. */
export function imagesFor(fields: GuideField[]) {
  const bySrc = new Map<string, GuideField[]>();
  for (const field of fields) {
    const { src } = GUIDE_REGIONS[field];
    bySrc.set(src, [...(bySrc.get(src) ?? []), field]);
  }
  return [...bySrc].map(([src, imageFields]) => ({ src, fields: imageFields }));
}
