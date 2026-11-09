import type { LocalizedText } from '../../../i18n';

export const eventEstimationMessages = {
  projectedTitle: {
    vi: 'Dự kiến đến cuối event',
    en: 'Projected at event end',
    th: 'คาดการณ์เมื่อจบอีเวนต์',
    id: 'Proyeksi saat event berakhir',
    zh: '活动结束时预测',
  },
  details: {
    vi: 'Chi tiết tính toán',
    en: 'Calculation details',
    th: 'รายละเอียดการคำนวณ',
    id: 'Detail perhitungan',
    zh: '计算详情',
  },
  hpRecovered: {
    vi: 'Tổng HP hồi tới ngày kết thúc',
    en: 'Total HP recovered by event end',
    th: 'HP รวมที่ฟื้นฟูได้จนจบอีเวนต์',
    id: 'Total HP pulih hingga event berakhir',
    zh: '活动结束前恢复的总 HP',
  },
  hpReset: {
    vi: 'HP reset',
    en: 'HP reset',
    th: 'HP จากการรีเซ็ต',
    id: 'HP dari reset',
    zh: '重置 HP',
  },
  projectedBottles: {
    vi: 'Tổng bình dự kiến',
    en: 'Projected total batteries',
    th: 'จำนวนขวดรวมที่คาดการณ์',
    id: 'Proyeksi total botol',
    zh: '预计药瓶总数',
  },
  bottleHp: {
    vi: 'Tổng HP từ bình',
    en: 'Total HP from batteries',
    th: 'HP รวมจากขวด',
    id: 'Total HP dari botol',
    zh: '药瓶提供的总 HP',
  },
  projectedExtra: {
    vi: 'Tổng thêm dự kiến',
    en: 'Projected additional HP',
    th: 'HP ที่คาดว่าจะได้เพิ่ม',
    id: 'Perkiraan HP tambahan',
    zh: '预计新增 HP',
  },
  dischargeHp: {
    vi: 'HP cần xả',
    en: 'HP to discharge',
    th: 'HP ที่ต้องใช้',
    id: 'HP yang perlu digunakan',
    zh: '需要消耗的 HP',
  },
} as const satisfies Record<string, LocalizedText>;
