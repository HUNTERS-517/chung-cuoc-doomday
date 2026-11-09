import type { LocalizedText } from '../../../i18n';

export const cautionMessages = {
  caution: {
    vi: 'Lưu ý',
    en: 'Caution',
    th: 'ข้อควรระวัง',
    id: 'Perhatian',
    zh: '注意',
  },
  cautionTitle: {
    vi: 'Buff ở vòng Chính thức',
    en: 'Official round buffs',
    th: 'บัฟในรอบทางการ',
    id: 'Buff babak Resmi',
    zh: '正式赛增益',
  },
  cautionIntro: {
    vi: 'Ở vòng Chính thức có 2 buff ảnh hưởng HP: tăng HP tối đa và tăng tốc độ hồi HP dự trữ. App chỉ tính chính xác khi cả 2 buff này đang KHÔNG hoạt động.',
    en: 'The official round has 2 buffs that affect HP: max HP up and HP backup recovery speed up. The app is only accurate while both buffs are NOT active.',
    th: 'รอบทางการมีบัฟ 2 อย่างที่ส่งผลต่อ HP: เพิ่ม HP สูงสุด และเพิ่มความเร็วฟื้นฟู HP สำรอง แอปจะคำนวณแม่นยำเฉพาะเมื่อบัฟทั้งสอง "ไม่" ทำงานอยู่',
    id: 'Babak Resmi memiliki 2 buff yang memengaruhi HP: HP maksimum naik dan kecepatan pemulihan HP cadangan naik. Aplikasi hanya akurat saat kedua buff TIDAK aktif.',
    zh: '正式赛有 2 个影响 HP 的增益：最大 HP 提升、备用 HP 恢复速度提升。只有当这两个增益都未生效时，计算才准确。',
  },
  cautionInactive: {
    vi: 'Buff chưa kích hoạt (icon xám) → tính chính xác',
    en: 'Buffs inactive (grey icons) → accurate',
    th: 'บัฟยังไม่ทำงาน (ไอคอนสีเทา) → แม่นยำ',
    id: 'Buff tidak aktif (ikon abu-abu) → akurat',
    zh: '增益未生效（灰色图标）→ 计算准确',
  },
  cautionInactiveNote: {
    vi: 'Kiểm tra 2 icon trong khung đỏ: icon xám nghĩa là buff đang tắt, số liệu bạn nhập là HP gốc.',
    en: 'Check the 2 icons in the red boxes: grey means the buff is off, so the numbers you enter are your base HP.',
    th: 'ดูไอคอน 2 อันในกรอบแดง: สีเทาหมายถึงบัฟปิดอยู่ ตัวเลขที่กรอกจึงเป็น HP พื้นฐาน',
    id: 'Periksa 2 ikon di kotak merah: abu-abu berarti buff mati, jadi angka yang dimasukkan adalah HP dasar.',
    zh: '查看红框中的 2 个图标：灰色表示增益关闭，此时输入的就是基础 HP。',
  },
  cautionActive: {
    vi: 'Buff đang hoạt động → sai số lớn',
    en: 'Buffs active → large error',
    th: 'บัฟกำลังทำงาน → คลาดเคลื่อนมาก',
    id: 'Buff aktif → selisih besar',
    zh: '增益生效中 → 误差很大',
  },
  cautionActiveNote: {
    vi: 'Buff chỉ có hiệu lực trong 2 giờ, nhưng app sẽ tính như thể buff kéo dài suốt sự kiện, nên kết quả bị lệch nhiều.',
    en: 'These buffs only last 2 hours, but the app would treat them as lasting the whole event, so the result drifts a lot.',
    th: 'บัฟมีผลแค่ 2 ชั่วโมง แต่แอปจะคำนวณเหมือนมีผลตลอดทั้งอีเวนต์ ผลลัพธ์จึงคลาดเคลื่อนมาก',
    id: 'Buff hanya berlaku 2 jam, tetapi aplikasi menghitungnya seolah berlaku sepanjang event, sehingga hasilnya meleset jauh.',
    zh: '增益只持续 2 小时，但应用会按整个活动期间都生效来计算，因此结果偏差很大。',
  },
  cautionRecoveryFormula: {
    vi: 'Tốc độ hồi HP × tỉ lệ buff tăng × 2 tiếng buff (phút)',
    en: 'HP recovery rate × buff increase × 2 h buff (minutes)',
    th: 'ความเร็วฟื้นฟู HP × อัตราบัฟที่เพิ่ม × บัฟ 2 ชม. (นาที)',
    id: 'Kecepatan pemulihan HP × kenaikan buff × buff 2 jam (menit)',
    zh: 'HP 恢复速度 × 增益提升比例 × 2 小时增益（分钟）',
  },
  cautionBottles: {
    vi: 'bình',
    en: 'batteries',
    th: 'ขวด',
    id: 'botol',
    zh: '瓶',
  },
  cautionTip: {
    vi: '👉 Hãy nhập số liệu khi cả 2 buff đã hết hiệu lực.',
    en: '👉 Enter your numbers after both buffs have expired.',
    th: '👉 กรอกตัวเลขหลังจากบัฟทั้งสองหมดเวลาแล้ว',
    id: '👉 Masukkan angka setelah kedua buff berakhir.',
    zh: '👉 请在两个增益都失效后再输入数据。',
  },
} as const satisfies Record<string, LocalizedText>;
