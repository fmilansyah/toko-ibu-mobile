import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyle from '../styles/global.style';
import ChangePasswordStyle from '../styles/ChangePassword.style';
import { TextInput, Validation } from '../components/Form';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { containsNumbers, containsUppercase } from '../helpers/validation';
import api from '../config/api';
import { COLOR_SETTINGS } from '../database/AppData';

export default function ChangePassword({ navigation }) {
  const [user, setUser] = useState(null);
  const [validation, setValidation] = useState({
    oldPassword: [],
    newPassword: [],
    confirmNewPassword: [],
  });
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [snackbarInfo, setSnackbarInfo] = useState({
    visible: false,
    message: null,
  });
  const [saving, setSaving] = useState(false);

  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (userData !== null) {
        setUser(JSON.parse(userData));
      }
    } catch (e) {
      setUser(null);
    }
  };

  const handleSave = () => {
    for (const key in validation) {
      if (validation[key].length > 0) {
        setSnackbarInfo({ visible: true, message: 'Harap Periksa Kembali' });
        return;
      }
    }
    const formData = new FormData();
    formData.append('kd_user', user?.kd_user);
    formData.append('old_password', oldPassword);
    formData.append('new_password', newPassword);
    setSaving(true);
    api
      .post('/change-user-password', formData, {
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

  const handleChangeOldPassword = text => {
    setOldPassword(text);

    // validation rules
    const oldPasswordValidation = [];
    if (text === null || text === '') {
      oldPasswordValidation.push({
        title: 'Kata sandi lama harap diisi',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      oldPassword: oldPasswordValidation,
    });
  };

  const handleChangeNewPassword = text => {
    setNewPassword(text);

    // validation rules
    const newPasswordValidation = [];
    if (text === null || text === '') {
      newPasswordValidation.push({
        title: 'Kata sandi baru harap diisi',
        icon: 'error',
      });
    }
    if (text.length < 8) {
      newPasswordValidation.push({
        title: 'Minimal 8-Karakter',
        icon: 'info',
      });
    }
    if (!containsNumbers(text)) {
      newPasswordValidation.push({
        title: 'Harus terdapat min. 1 digit angka',
        icon: 'info',
      });
    }
    if (!containsUppercase(text)) {
      newPasswordValidation.push({
        title: 'Harus terdapat min. 1 huruf besar',
        icon: 'info',
      });
    }
    setValidation({
      ...validation,
      newPassword: newPasswordValidation,
    });
  };

  const handleChangeConfirmNewPassword = text => {
    setConfirmNewPassword(text);

    // validation rules
    const confirmNewPasswordValidation = [];
    if (text === null || text === '') {
      confirmNewPasswordValidation.push({
        title: 'Konfirmasi kata sandi baru harap diisi',
        icon: 'error',
      });
    }
    if (text !== newPassword) {
      confirmNewPasswordValidation.push({
        title: 'Konfirmasi kata sandi tidak sesuai',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      confirmNewPassword: confirmNewPasswordValidation,
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
          <Text style={globalStyle.appName}>Ubah Kata Sandi</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyle.paddingHorizontal}>
          <Text style={ChangePasswordStyle.title}>Buat Kata Sandi Baru</Text>
          <Text style={ChangePasswordStyle.subTitle}>
            Kata sandi baru kamu harus berbeda dengan kata sandi sebelumnya
          </Text>

          <View style={ChangePasswordStyle.form}>
            <View style={globalStyle.formGroup}>
              <TextInput
                label="Kata Sandi Lama"
                isPassword={true}
                inputProps={{
                  value: oldPassword,
                  onChangeText: handleChangeOldPassword,
                  autoCapitalize: 'none',
                  autoCorrect: false,
                  returnKeyType: 'next',
                  onSubmitEditing: () => newPasswordRef.current.focus(),
                }}
              />
            </View>
            {validation.oldPassword.length > 0 && (
              <View style={globalStyle.formGroup}>
                <Validation data={validation.oldPassword} />
              </View>
            )}
            <View style={globalStyle.formGroup}>
              <TextInput
                ref={newPasswordRef}
                label="Kata Sandi Baru"
                isPassword={true}
                inputProps={{
                  value: newPassword,
                  onChangeText: handleChangeNewPassword,
                  autoCapitalize: 'none',
                  autoCorrect: false,
                  returnKeyType: 'next',
                  onSubmitEditing: () => {
                    confirmNewPasswordRef.current.focus();
                    handleChangeConfirmNewPassword(confirmNewPassword);
                  },
                }}
              />
            </View>
            {validation.newPassword.length > 0 && (
              <View style={globalStyle.formGroup}>
                <Validation data={validation.newPassword} />
              </View>
            )}
            <View style={globalStyle.formGroup}>
              <TextInput
                ref={confirmNewPasswordRef}
                label="Konfirmasi Kata Sandi Baru"
                isPassword={true}
                inputProps={{
                  value: confirmNewPassword,
                  onChangeText: handleChangeConfirmNewPassword,
                  autoCapitalize: 'none',
                  autoCorrect: false,
                  returnKeyType: 'done',
                  onSubmitEditing: () => handleSave(),
                }}
              />
            </View>
            {validation.confirmNewPassword.length > 0 && (
              <View style={globalStyle.formGroup}>
                <Validation data={validation.confirmNewPassword} />
              </View>
            )}
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
