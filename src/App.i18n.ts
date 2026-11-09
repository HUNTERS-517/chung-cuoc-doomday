import type { LocalizedText } from './i18n';

export const appMessages = {
  backupAdjustedTitle: {
    vi: 'Đã điều chỉnh HP dự trữ',
    en: 'HP backup adjusted',
    th: 'ปรับ HP สำรองแล้ว',
    id: 'Cadangan HP disesuaikan',
    zh: '已调整储备 HP',
  },
  backupAdjustedBody: {
    vi: 'HP dự trữ không thể lớn hơn giới hạn. Giá trị đã được đưa về đúng giới hạn.',
    en: 'HP backup cannot exceed its limit. The value was reduced to match the limit.',
    th: 'HP สำรองต้องไม่เกินขีดจำกัด ระบบได้ลดค่าให้เท่ากับขีดจำกัดแล้ว',
    id: 'Cadangan HP tidak boleh melebihi batas. Nilainya telah diturunkan agar sesuai dengan batas.',
    zh: '储备 HP 不能超过上限，数值已降低至上限。',
  },
} as const satisfies Record<string, LocalizedText>;
