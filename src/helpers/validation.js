import { Platform } from 'react-native';

export const isIos = Platform.OS === 'ios';

export function numberValidator(value) {
  const rgx = /^\d+$/;
  const isEmpty = cantEmpty(value);
  if (isEmpty) {
    return isEmpty;
  }
  if (!rgx.test(value)) {
    return 'Hanya diperbolehkan angka';
  }
  return '';
}

export function cantEmpty(value) {
  if (!value) {
    return 'Tidak boleh kosong';
  }
  return '';
}

export function emailValidator(email) {
  const rgx = /\S+@\S+\.\S+/;
  const isEmpty = cantEmpty(email);
  if (isEmpty) {
    return isEmpty;
  }
  if (!rgx.test(email)) {
    return 'Email tidak valid';
  }
  return '';
}

export function confirmPasswordValidator(confirmPassword, password) {
  const isEmpty = cantEmpty(confirmPassword);
  if (isEmpty) {
    return isEmpty;
  }
  if (confirmPassword !== password) {
    return 'Kata sandi tidak cocok';
  }
  return '';
}

export function containsNumbers(str = '') {
  return /\d/.test(str);
}

export function containsUppercase(str = '') {
  return /[A-Z]/.test(str);
}

export function validEmail(str = '') {
  const rgx = /\S+@\S+\.\S+/;
  return rgx.test(str);
}
