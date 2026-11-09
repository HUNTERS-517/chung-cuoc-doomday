import type { LocalizedText } from '../../i18n';

export const guideMessages = {
  guide: {
    vi: 'Hướng dẫn',
    en: 'Guide',
    th: 'คำแนะนำ',
    id: 'Panduan',
    zh: '指南',
  },
  guideIntro: {
    vi: 'Mỗi ô đỏ trên ảnh game có mã (A1, B2…) trùng với mã cạnh ô nhập trên web — điền số trong ô đỏ vào ô có cùng mã.',
    en: 'Each red box in the game screenshots has a code (A1, B2…) matching the badge next to an input here — enter that number into the input with the same code.',
    th: 'กรอบสีแดงในภาพเกมแต่ละกรอบมีรหัส (A1, B2…) ตรงกับป้ายข้างช่องกรอก — ให้กรอกตัวเลขในกรอบแดงลงในช่องที่มีรหัสเดียวกัน',
    id: 'Setiap kotak merah di tangkapan layar game memiliki kode (A1, B2…) yang sama dengan label di samping kolom input — isi angka di kotak merah ke kolom berkode sama.',
    zh: '游戏截图中每个红框都有编号（A1、B2…），与此处输入框旁的编号对应——将红框中的数字填入相同编号的输入框。',
  },
  guideCheckboxNote: {
    vi: '☑ 2 ô tick ở "Quy tắc nguồn bình"\n• Đã mua thì tick',
    en: '☑ 2 checkboxes under "Battery sources"\n• Tick if bought',
    th: '☑ ช่องติ๊ก 2 ช่องใน "แหล่งที่มาของขวด"\n• ซื้อแล้วให้ติ๊ก',
    id: '☑ 2 kotak centang di "Sumber botol"\n• Centang jika sudah beli',
    zh: '☑“药瓶来源”下的 2 个勾选框\n• 已购买则勾选',
  },
  guideGuildLevelNote: {
    vi: 'Lấy level trong hình trừ đi 1 (vd: 28 − 1 = 27)',
    en: 'Take the level shown minus 1 (e.g. 28 − 1 = 27)',
    th: 'ใช้เลเวลในภาพลบ 1 (เช่น 28 − 1 = 27)',
    id: 'Ambil level di gambar dikurangi 1 (mis. 28 − 1 = 27)',
    zh: '取图中等级减 1（例：28 − 1 = 27）',
  },
} as const satisfies Record<string, LocalizedText>;
