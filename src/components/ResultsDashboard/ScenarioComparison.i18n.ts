import type { LocalizedText } from '../../i18n';

export const scenarioComparisonMessages = {
  comparisons: {
    vi: 'So sánh kịch bản',
    en: 'Scenario comparison',
    th: 'เปรียบเทียบสถานการณ์',
    id: 'Perbandingan skenario',
    zh: '场景对比',
  },
  currentScenario: {
    vi: 'Đang áp dụng',
    en: 'In use',
    th: 'กำลังใช้งาน',
    id: 'Sedang digunakan',
    zh: '当前使用',
  },
  both: {
    vi: 'Mua gói 249 + mua Daily 90 × 5 bình',
    en: 'Package 249 + Daily 90 × 5 batteries',
    th: 'ซื้อแพ็กเกจ 249 + ซื้อ Daily 90 × 5 ขวด',
    id: 'Beli paket 249 + beli Daily 90 × 5 botol',
    zh: '购买 249 礼包 + 购买 Daily 90 × 5 瓶',
  },
  noPackage: {
    vi: 'Không nạp gói 249',
    en: 'No package 249',
    th: 'ไม่ซื้อแพ็กเกจ 249',
    id: 'Tidak beli paket 249',
    zh: '不购买 249 礼包',
  },
  noDaily: {
    vi: 'Không mua Daily bằng KC',
    en: 'No Diamond Daily',
    th: 'ไม่ซื้อ Daily ด้วยเพชร',
    id: 'Tidak beli Daily dengan Diamond',
    zh: '不购买钻石 Daily',
  },
  neither: {
    vi: 'Không mua gói 249 và không mua Daily 90 × 5 bình',
    en: 'No package 249 and no Daily 90 × 5 batteries',
    th: 'ไม่ซื้อแพ็กเกจ 249 และไม่ซื้อ Daily 90 × 5 ขวด',
    id: 'Tidak beli paket 249 dan tidak beli Daily 90 × 5 botol',
    zh: '不购买 249 礼包，也不购买 Daily 90 × 5 瓶',
  },
} as const satisfies Record<string, LocalizedText>;
