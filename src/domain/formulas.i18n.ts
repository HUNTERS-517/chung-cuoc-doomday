import type { LocalizedText } from '../i18n';

/** Text used inside formula explanations built by the domain calculations. */
export const formulaMessages = {
  timeLeft: {
    vi: 'Thời gian còn lại',
    en: 'Time remaining',
    th: 'เวลาที่เหลือ',
    id: 'Waktu tersisa',
    zh: '剩余时间',
  },
  fillTime: {
    vi: 'Hồi đầy dự trữ',
    en: 'Time to fill reserve',
    th: 'เวลาฟื้นฟูจนเต็ม',
    id: 'Waktu hingga cadangan penuh',
    zh: '储备回满时间',
  },
  dischargeTime: {
    vi: 'Thời gian cần xả',
    en: 'Time to discharge',
    th: 'เวลาที่ต้องใช้ HP',
    id: 'Waktu penggunaan',
    zh: '需要消耗的时间',
  },
  roundDown: {
    vi: 'Làm tròn xuống',
    en: 'Round down',
    th: 'ปัดเศษลง',
    id: 'Bulatkan ke bawah',
    zh: '向下取整',
  },
  dailySource: {
    vi: 'Hằng ngày',
    en: 'Daily',
    th: 'รายวัน',
    id: 'Harian',
    zh: '每日',
  },
  freeSource: {
    vi: 'miễn phí',
    en: 'free',
    th: 'ฟรี',
    id: 'gratis',
    zh: '免费',
  },
  scenarioTotalFormula: {
    vi: 'Chiến công + Máu hiện tại + HP dự trữ + HP từ bình + HP reset + Tổng HP hồi',
    en: 'Merit + Current HP + HP backup + HP from batteries + HP reset + Total HP recovered',
    th: 'แต้มผลงาน + HP ปัจจุบัน + HP สำรอง + HP จากขวด + HP จากการรีเซ็ต + HP รวมที่ฟื้นฟู',
    id: 'Merit + HP saat ini + Cadangan HP + HP dari botol + HP reset + Total HP pulih',
    zh: '战功 + 当前 HP + 储备 HP + 药瓶 HP + 重置 HP + 恢复的总 HP',
  },
  projectedExtraFormula: {
    vi: 'Tổng HP từ bình + HP reset + Tổng HP hồi tới ngày kết thúc',
    en: 'Total HP from batteries + HP reset + Total HP recovered by event end',
    th: 'HP รวมจากขวด + HP จากการรีเซ็ต + HP รวมที่ฟื้นฟูได้จนจบอีเวนต์',
    id: 'Total HP dari botol + HP dari reset + Total HP pulih hingga event berakhir',
    zh: '药瓶总 HP + 重置 HP + 活动结束前恢复的总 HP',
  },
  currentLevelFormula: {
    vi: 'Chiến công hiện có + Máu hiện tại + HP dự trữ + Tổng thêm dự kiến',
    en: 'Current Merit + Current HP + HP backup + Projected additional HP',
    th: 'แต้มผลงานปัจจุบัน + HP ปัจจุบัน + HP สำรอง + HP ที่คาดว่าจะได้เพิ่ม',
    id: 'Merit saat ini + HP saat ini + Cadangan HP + Perkiraan HP tambahan',
    zh: '当前战功 + 当前 HP + 储备 HP + 预计新增 HP',
  },
} as const satisfies Record<string, LocalizedText>;
