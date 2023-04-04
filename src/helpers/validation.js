import { Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';

export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;
  if (!email) {
    return 'Email tidak boleh kosong';
  }
  if (!re.test(email)) {
    return 'Email tidak valid';
  }
  return '';
}

export function passwordValidator(password) {
  if (!password) {
    return 'Kata sandi tidak boleh kosong';
  }
  return '';
}
