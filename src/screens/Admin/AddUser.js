import React, { useState, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import globalStyle from '../../styles/global.style';
import ChangePasswordStyle from '../../styles/ChangePassword.style';
import { RadioButtonGroup, TextInput, Validation } from '../../components/Form';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { containsNumbers, containsUppercase } from '../../helpers/validation';
import api from '../../config/api';
import {
  COLOR_SETTINGS,
  USER_LEVEL,
  UserLeveList,
} from '../../database/AppData';

export default function AddUser({ navigation }) {
  const [validation, setValidation] = useState({
    name: [],
    phoneNumber: [],
    password: [],
    confirmPassword: [],
  });
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [level, setLevel] = useState(USER_LEVEL.CASHIER);
  const [snackbarInfo, setSnackbarInfo] = useState({
    visible: false,
    message: null,
  });
  const [saving, setSaving] = useState(false);

  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSave = () => {
    for (const key in validation) {
      if (validation[key].length > 0) {
        setSnackbarInfo({ visible: true, message: 'Harap Periksa Kembali' });
        return;
      }
    }
    const formData = new FormData();
    formData.append('nama', name);
    formData.append('no_telepon', phoneNumber);
    formData.append('password', password);
    formData.append('level', level);
    setSaving(true);
    api
      .post('/daftaruser', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        setSaving(false);
        if (data.Error === 0) {
          navigation.goBack();
          ToastAndroid.show('Data Berhasil Disimpan', ToastAndroid.SHORT);
        } else {
          setSnackbarInfo({ visible: true, message: data?.Message });
        }
      })
      .catch(() => {
        setSaving(false);
        setSnackbarInfo({ visible: true, message: 'Gagal Menyimpan Data' });
      });
  };

  const handleChangeName = text => {
    setName(text);

    // validation rules
    const nameValidation = [];
    if (text === null || text === '') {
      nameValidation.push({
        title: 'Nama lengkap harap diisi',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      name: nameValidation,
    });
  };

  const handleChangePhoneNumber = text => {
    setPhoneNumber(text);

    // validation rules
    const phoneNumberValidation = [];
    if (text === null || text === '') {
      phoneNumberValidation.push({
        title: 'No. Telepon harap diisi',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      phoneNumber: phoneNumberValidation,
    });
  };

  const handleChangePassword = text => {
    setPassword(text);

    // validation rules
    const passwordValidation = [];
    if (text === null || text === '') {
      passwordValidation.push({
        title: 'Kata sandi harap diisi',
        icon: 'error',
      });
    }
    if (text.length < 8) {
      passwordValidation.push({
        title: 'Minimal 8-Karakter',
        icon: 'info',
      });
    }
    if (!containsNumbers(text)) {
      passwordValidation.push({
        title: 'Harus terdapat min. 1 digit angka',
        icon: 'info',
      });
    }
    if (!containsUppercase(text)) {
      passwordValidation.push({
        title: 'Harus terdapat min. 1 huruf besar',
        icon: 'info',
      });
    }
    setValidation({
      ...validation,
      password: passwordValidation,
    });
  };

  const handleChangeConfirmPassword = text => {
    setConfirmPassword(text);

    // validation rules
    const confirmPasswordValidation = [];
    if (text === null || text === '') {
      confirmPasswordValidation.push({
        title: 'Konfirmasi kata sandi harap diisi',
        icon: 'error',
      });
    }
    if (text !== password) {
      confirmPasswordValidation.push({
        title: 'Konfirmasi kata sandi tidak sesuai',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      confirmPassword: confirmPasswordValidation,
    });
  };

  const handleDismissSnackbar = () => {
    setSnackbarInfo({
      visible: false,
      message: null,
    });
  };

  return (
    <View style={[globalStyle.container, globalStyle.pRelative]}>
      <Snackbar
        visible={snackbarInfo.visible}
        onDismiss={handleDismissSnackbar}>
        {snackbarInfo.message}
      </Snackbar>
      <View style={globalStyle.headerContainer}>
        <TouchableOpacity
          style={globalStyle.paddingContainer}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <View>
          <Text style={globalStyle.appName}>Buat Akun</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyle.paddingHorizontal}>
          <Text style={ChangePasswordStyle.title}>Buat Akun Baru</Text>
          <Text style={ChangePasswordStyle.subTitle}>
            Informasi lebih detail seperti email, alamat, foto, dll. Dapat diisi
            mandiri oleh setiap akun
          </Text>

          <View style={ChangePasswordStyle.form}>
            <View style={globalStyle.formGroup}>
              <TextInput
                label="Nama Lengkap"
                inputProps={{
                  value: name,
                  onChangeText: handleChangeName,
                  autoCapitalize: 'words',
                  autoCorrect: false,
                  returnKeyType: 'next',
                  onSubmitEditing: () => {
                    phoneNumberRef.current.focus();
                  },
                }}
              />
            </View>
            {validation.name.length > 0 && (
              <View style={globalStyle.formGroup}>
                <Validation data={validation.name} />
              </View>
            )}
            <View style={globalStyle.formGroup}>
              <TextInput
                ref={phoneNumberRef}
                label="No. Telepon"
                inputProps={{
                  value: phoneNumber,
                  onChangeText: handleChangePhoneNumber,
                  keyboardType: 'phone-pad',
                  returnKeyType: 'next',
                  onSubmitEditing: () => {
                    passwordRef.current.focus();
                  },
                }}
              />
            </View>
            {validation.phoneNumber.length > 0 && (
              <View style={globalStyle.formGroup}>
                <Validation data={validation.phoneNumber} />
              </View>
            )}
            <View style={globalStyle.formGroup}>
              <TextInput
                ref={passwordRef}
                label="Kata Sandi"
                isPassword={true}
                inputProps={{
                  value: password,
                  onChangeText: handleChangePassword,
                  autoCapitalize: 'none',
                  autoCorrect: false,
                  returnKeyType: 'next',
                  onSubmitEditing: () => {
                    confirmPasswordRef.current.focus();
                    handleChangeConfirmPassword(confirmPassword);
                  },
                }}
              />
            </View>
            {validation.password.length > 0 && (
              <View style={globalStyle.formGroup}>
                <Validation data={validation.password} />
              </View>
            )}
            <View style={globalStyle.formGroup}>
              <TextInput
                ref={confirmPasswordRef}
                label="Konfirmasi Kata Sandi"
                isPassword={true}
                inputProps={{
                  value: confirmPassword,
                  onChangeText: handleChangeConfirmPassword,
                  autoCapitalize: 'none',
                  autoCorrect: false,
                  returnKeyType: 'done',
                }}
              />
            </View>
            {validation.confirmPassword.length > 0 && (
              <View style={globalStyle.formGroup}>
                <Validation data={validation.confirmPassword} />
              </View>
            )}
            <View style={globalStyle.formGroup}>
              <RadioButtonGroup
                label="Hak Akses"
                value={level}
                options={UserLeveList}
                onChange={setLevel}
              />
            </View>
            <View style={globalStyle.formGroup}>
              <TouchableOpacity
                style={globalStyle.submitBtn}
                onPress={() => handleSave()}>
                {saving ? (
                  <ActivityIndicator
                    size="small"
                    color={COLOR_SETTINGS.WHITE}
                    style={{
                      marginRight: 5,
                    }}
                  />
                ) : (
                  <Feather name="save" style={globalStyle.submitBtnIcon} />
                )}
                <Text style={globalStyle.submitBtnText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
