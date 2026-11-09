import type { LocalizedText } from '../../i18n';

export const targetProgressMessages = {
  targets: {
    vi: 'Các mốc mục tiêu',
    en: 'Target milestones',
    th: 'เป้าหมาย',
    id: 'Target pencapaian',
    zh: '目标里程碑',
  },
  target: { vi: 'Mốc', en: 'Target', th: 'เป้าหมาย', id: 'Target', zh: '目标' },
  missingHp: {
    vi: 'HP thiếu',
    en: 'HP missing',
    th: 'HP ที่ขาด',
    id: 'Kekurangan HP',
    zh: '缺少 HP',
  },
  missingBottles: {
    vi: 'Bình thiếu',
    en: 'Batteries missing',
    th: 'ขวดที่ขาด',
    id: 'Kekurangan botol',
    zh: '缺少药瓶',
  },
} as const satisfies Record<string, LocalizedText>;
