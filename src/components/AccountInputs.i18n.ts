import type { LocalizedText } from '../i18n';

export const accountInputsMessages = {
  accountData: {
    vi: 'A. Dữ liệu account',
    en: 'A. Account data',
    th: 'A. ข้อมูลบัญชี',
    id: 'A. Data akun',
    zh: 'A. 账号数据',
  },
  inputHint: {
    vi: 'Nhập số không âm',
    en: 'Enter a non-negative number',
    th: 'กรอกตัวเลขที่ไม่ติดลบ',
    id: 'Masukkan angka nonnegatif',
    zh: '请输入非负数',
  },
} as const satisfies Record<string, LocalizedText>;
