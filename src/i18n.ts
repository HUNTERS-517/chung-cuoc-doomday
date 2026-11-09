import type { Locale } from './domain/types';
import { formulaMessages } from './domain/formulas.i18n';
import { appMessages } from './App.i18n';
import { headerMessages } from './components/Header.i18n';
import { parameterPanelMessages } from './components/ParameterPanel.i18n';
import { accountInputsMessages } from './components/AccountInputs.i18n';
import { guideMessages } from './components/Guide/Guide.i18n';
import { cautionMessages } from './components/Guide/CautionButton/CautionButton.i18n';
import { eventEstimationMessages } from './components/ResultsDashboard/EventEstimation.i18n';
import { scenarioComparisonMessages } from './components/ResultsDashboard/ScenarioComparison.i18n';
import { targetProgressMessages } from './components/ResultsDashboard/TargetProgress.i18n';

export type LocalizedText = Record<Locale, string>;

/**
 * Messages shared by several components, the guide data or the domain
 * (units and input-field labels).
 * Component-specific messages live next to their component in `*.i18n.ts`.
 */
const commonMessages = {
  appTitle: {
    vi: 'Tính HP sự kiện chung cuộc',
    en: 'Doomday Event HP Calculator',
    th: 'เครื่องคำนวณ HP อีเวนต์ Doomday',
    id: 'Kalkulator HP Event Doomday',
    zh: 'Doomday 活动 HP 计算器',
  },
  cancel: {
    vi: 'Hủy',
    en: 'Cancel',
    th: 'ยกเลิก',
    id: 'Batal',
    zh: '取消',
  },
  endDate: {
    vi: 'Ngày kết thúc',
    en: 'End date',
    th: 'วันที่สิ้นสุด',
    id: 'Tanggal berakhir',
    zh: '结束日期',
  },
  days: { vi: 'ngày', en: 'days', th: 'วัน', id: 'hari', zh: '天' },
  hours: { vi: 'giờ', en: 'hours', th: 'ชั่วโมง', id: 'jam', zh: '小时' },
  minutes: { vi: 'phút', en: 'minutes', th: 'นาที', id: 'menit', zh: '分钟' },
  currentGuildLevel: {
    vi: 'Lv bang hiện tại',
    en: 'Current guild level',
    th: 'เลเวลกิลด์ปัจจุบัน',
    id: 'Level guild saat ini',
    zh: '当前公会等级',
  },
  hpRecoveryRate: {
    vi: 'Hồi HP / phút',
    en: 'HP recovery / minute',
    th: 'ฟื้นฟู HP / นาที',
    id: 'Pemulihan HP / menit',
    zh: 'HP 恢复 / 分钟',
  },
  package249: {
    vi: 'Nạp gói 249',
    en: 'Purchase package 249',
    th: 'ซื้อแพ็กเกจ 249',
    id: 'Beli paket 249',
    zh: '购买 249 礼包',
  },
  dailyDiamonds: {
    vi: 'Mua đủ 5 lượt Daily bằng KC',
    en: 'Buy all 5 Diamond Daily offers',
    th: 'ซื้อ Daily ด้วยเพชรครบ 5 ครั้ง',
    id: 'Beli semua 5 Daily dengan Diamond',
    zh: '购买全部 5 次钻石 Daily',
  },
  currentMerit: {
    vi: 'Chiến công hiện có',
    en: 'Current Merit',
    th: 'แต้มผลงานปัจจุบัน',
    id: 'Merit saat ini',
    zh: '当前战功',
  },
  maxHpReset: {
    vi: 'Max HP reset / ngày',
    en: 'Max HP reset / day',
    th: 'HP สูงสุดที่รีเซ็ต / วัน',
    id: 'Reset HP maksimum / hari',
    zh: '每日重置 HP 上限',
  },
  currentHp: {
    vi: 'Máu hiện tại',
    en: 'Current HP',
    th: 'HP ปัจจุบัน',
    id: 'HP saat ini',
    zh: '当前 HP',
  },
  hpBackup: {
    vi: 'HP dự trữ',
    en: 'HP backup',
    th: 'HP สำรอง',
    id: 'Cadangan HP',
    zh: '储备 HP',
  },
  currentBottles: {
    vi: 'Số bình hiện tại',
    en: 'Current batteries',
    th: 'จำนวนขวดปัจจุบัน',
    id: 'Jumlah botol saat ini',
    zh: '当前药瓶数',
  },
  recoveryLimit: {
    vi: 'Giới hạn dự trữ HP',
    en: 'HP recovery limit',
    th: 'ขีดจำกัด HP สำรอง',
    id: 'Batas cadangan HP',
    zh: '储备 HP 上限',
  },
  currentLevel: {
    vi: 'Lv bang hiện tại',
    en: 'Current guild level',
    th: 'เลเวลกิลด์ปัจจุบัน',
    id: 'Level guild saat ini',
    zh: '当前公会等级',
  },
  guildMax: {
    vi: 'Bang max level',
    en: 'Guild max level',
    th: 'กิลด์เลเวลสูงสุด',
    id: 'Level guild maksimum',
    zh: '公会满级',
  },
  snapshotTip: {
    vi: 'Số bình hiện tại là snapshot đã gồm mọi nguồn từng nhận. Dự báo chỉ cộng phần tương lai.',
    en: 'Current batteries are a snapshot containing all sources already received. The projection only adds future sources.',
    th: 'จำนวนขวดปัจจุบันเป็นยอดรวมจากทุกแหล่งที่ได้รับแล้ว การคาดการณ์จะเพิ่มเฉพาะส่วนในอนาคต',
    id: 'Jumlah botol saat ini adalah total dari semua sumber yang sudah diterima. Proyeksi hanya menambahkan sumber mendatang.',
    zh: '当前药瓶数是已领取所有来源的总数。预测只会增加未来可获得的部分。',
  },
  close: {
    vi: 'Đã hiểu',
    en: 'Got it',
    th: 'เข้าใจแล้ว',
    id: 'Mengerti',
    zh: '知道了',
  },
  invalid: { vi: '—', en: '—', th: '—', id: '—', zh: '—' },
  bottles: { vi: 'bình', en: 'batteries', th: 'ขวด', id: 'botol', zh: '瓶' },
  hp: { vi: 'HP', en: 'HP', th: 'HP', id: 'HP', zh: 'HP' },
} as const satisfies Record<string, LocalizedText>;

export const messageSources = [
  commonMessages,
  formulaMessages,
  appMessages,
  headerMessages,
  parameterPanelMessages,
  accountInputsMessages,
  guideMessages,
  cautionMessages,
  eventEstimationMessages,
  scenarioComparisonMessages,
  targetProgressMessages,
] as const;

export const messages = {
  ...commonMessages,
  ...formulaMessages,
  ...appMessages,
  ...headerMessages,
  ...parameterPanelMessages,
  ...accountInputsMessages,
  ...guideMessages,
  ...cautionMessages,
  ...eventEstimationMessages,
  ...scenarioComparisonMessages,
  ...targetProgressMessages,
};

export type TranslationKey = keyof typeof messages;

export function translator(locale: Locale) {
  return (key: TranslationKey) => messages[key][locale];
}
