import React, { useState, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import SignInStyle from '../styles/SignIn.style';
import { TextInput, Validation } from '../components/Form';
import globalStyle from '../styles/global.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Snackbar } from 'react-native-paper';
import { USER_LEVEL } from '../database/AppData';
import { containsNumbers, containsUppercase } from '../helpers/validation';

export default function SignUp({ navigation }) {
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
  const [snackbarInfo, setSnackbarInfo] = useState({
    visible: false,
    message: null,
  });

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
    formData.append('level', USER_LEVEL.BUYER);
    api
      .post('/daftaruser', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        if (data.Error === 0) {
          handleLogin();
        } else {
          setSnackbarInfo({ visible: true, message: data?.Message });
        }
      })
      .catch(() => {
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

  const handleLogin = () => {
    const formData = new FormData();
    formData.append('no_telepon', phoneNumber);
    formData.append('password', password);
    api
      .post('/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => updateUserData(data));
  };

  const updateUserData = async data => {
    await AsyncStorage.setItem('user_data', JSON.stringify(data?.User));
    await navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  return (
    <View style={globalStyle.container}>
      <KeyboardAvoidingView style={SignInStyle.container} behavior="height">
        <Snackbar
          visible={snackbarInfo.visible}
          onDismiss={handleDismissSnackbar}>
          {snackbarInfo.message}
        </Snackbar>
        <TouchableOpacity
          style={SignInStyle.backBtn}
          onPress={() => navigation.goBack('Home')}>
          <MaterialCommunityIcons
            name="close"
            style={SignInStyle.backBtnIcon}
          />
        </TouchableOpacity>

        <Image
          source={require('../../assets/images/logo.jpg')}
          style={SignInStyle.logo}
        />
        <Text style={SignInStyle.title}>Buat Akun Baru</Text>

        <View style={{ width: '100%' }}>
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
        </View>

        <TouchableOpacity
          style={[
            SignInStyle.submitBtn,
            {
              marginTop: 16,
            },
          ]}
          onPress={handleSave}>
          <MaterialCommunityIcons
            name="login"
            style={SignInStyle.submitBtnIcon}
          />
          <Text style={SignInStyle.submitBtnText}>Buat Akun</Text>
        </TouchableOpacity>

        <View style={globalStyle.row}>
          <Text style={[globalStyle.descLink, SignInStyle.createAccount]}>
            Sudah punya akun?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={globalStyle.link}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
