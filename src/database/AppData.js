export const APP_NAME = 'Toko Ibu';
export const APP_DESCRIPTION =
  'Ipsum pariatur do pariatur nostrud quis est sit Lorem in enim reprehenderit ea.';
export const COLOR_SETTINGS = {
  PRIMARY: '#9a0000',
  WHITE: '#fff',
  BLACK: '#212b2a',
  GRAY: '#a9a9a9',
  DARKGRAY: '#606770',
  GREEN: '#00AC76',
  RED: '#C04345',
  BG_LIGHT: '#F0F0F3',
  BG_GREEN: 'rgb(214, 255, 222)',
  BG_ORANGE: '#fff7e6',
  ORANGE: '#d46b08',
  BG_BLUE: '#e6f4ff',
  BLUE: '#1677ff',
  BG_LIME: '#fcffe6',
  LIME: '#7cb305',
  BG_RED: '#fff2f0',
};
export const USER_PICTURE_DEFAULT =
  'https://img.freepik.com/free-photo/cute-woman-hold-hands-gesture-empty-spec-business-woman-concept-pink-background-3d-rendering_56104-1468.jpg?w=740&t=st=1685270243~exp=1685270843~hmac=4ec37e0e8f5ad0abcda82edbca3aab945c11b4a467321e2c0b90bf58b3852617';
export const USER_LEVEL = {
  BUYER: 'Pembeli',
  CASHIER: 'Kasir',
  OWNER: 'Pemilik Toko',
};
export const UserLeveList = [
  { value: USER_LEVEL.CASHIER, label: USER_LEVEL.CASHIER },
  { value: USER_LEVEL.OWNER, label: USER_LEVEL.OWNER },
];
export const STATUS_ACTIVE = {
  ACTIVE: 'A',
  DELETE: 'D',
};
export const STATUS_ORDER = {
  WAITING_FOR_PAYMENT: 'Menunggu Pembayaran',
  WAITING_FOR_CONFIRMATION: 'Menunggu Konfirmasi',
  PROCESS: 'Diproses',
  DELIVERY: 'Dikirim',
  FINISHED: 'Selesai',
  CANCELLED: 'Batal',
  READY_TO_PICK_UP: 'Siap Diambil',
};
export const ALLOWED_COURIER = [
  'jne',
  'tiki',
  'ninja',
  'sicepat',
  'jnt',
  'pos',
  'anteraja',
];
export const WA_NUMBER = '62816841846'
export const PICK_UP_CODE = 'ADT'