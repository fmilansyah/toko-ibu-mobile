import React, { useState, useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  ToastAndroid,
  BackHandler,
} from 'react-native';

import SignInStyle from '../styles/SignIn.style';
import { TextInput, Validation } from '../components/Form';
import globalStyle from '../styles/global.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_LEVEL } from '../database/AppData';
import { Snackbar } from 'react-native-paper';

import { Context } from '../../App';

export default function SignIn({ navigation }) {
  const { setData } = useContext(Context);

  const [validation, setValidation] = useState({
    phoneNumber: [],
    password: [],
  });
  const [snackbarInfo, setSnackbarInfo] = useState({
    visible: false,
    message: null,
  });

  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);

  const passwordRef = React.createRef();

  const handleLogin = () => {
    for (const key in validation) {
      if (validation[key].length > 0) {
        setSnackbarInfo({ visible: true, message: 'Harap Periksa Kembali' });
        return;
      }
    }
    const formData = new FormData();
    formData.append('no_telepon', phoneNumber);
    formData.append('password', password);
    api
      .post('/login', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => afterLogin(data))
      .catch(() =>
        ToastAndroid.show(
          'No. Telepon atau Kata Sandi Tidak Cocok',
          ToastAndroid.SHORT,
        ),
      );
  };

  const afterLogin = data => {
    updateUserData(data);
    // if (data?.User?.level !== USER_LEVEL.BUYER) {
    //   ToastAndroid.show('Silakan Buka Kembali Aplikasi', ToastAndroid.LONG);
    //   BackHandler.exitApp();
    // }
  };

  const updateUserData = async data => {
    // await AsyncStorage.setItem('user_data', JSON.stringify(data?.User));
    // await navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Home' }],
    // });
    await AsyncStorage.setItem('user_data', JSON.stringify(data?.User));
    await setData(JSON.stringify(data?.User));

    if (data?.User?.level === USER_LEVEL.CASHIER) {
      await navigation.reset({
        index: 0,
        routes: [{ name: 'Pesanan' }],
      });
    } else if (data?.User?.level === USER_LEVEL.OWNER) {
      await navigation.reset({
        index: 0,
        routes: [{ name: 'Produk' }],
      });
    } else {
      await navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
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
    setValidation({
      ...validation,
      password: passwordValidation,
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

  const handleDismissSnackbar = () => {
    setSnackbarInfo({
      visible: false,
      message: null,
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
          source={require('../../assets/images/logo.png')}
          style={SignInStyle.logo}
        />
        <Text style={SignInStyle.title}>Masuk Ke Akun Anda</Text>

        <View style={{ width: '100%' }}>
          <View style={globalStyle.formGroup}>
            <TextInput
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
                returnKeyType: 'done',
                onSubmitEditing: () => {
                  handleLogin();
                },
              }}
            />
          </View>
          {validation.password.length > 0 && (
            <View style={globalStyle.formGroup}>
              <Validation data={validation.password} />
            </View>
          )}
        </View>

        <View style={SignInStyle.forgotPassword}>
          <TouchableOpacity>
            <Text style={globalStyle.link}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={SignInStyle.submitBtn} onPress={handleLogin}>
          <MaterialCommunityIcons
            name="login"
            style={SignInStyle.submitBtnIcon}
          />
          <Text style={SignInStyle.submitBtnText}>Masuk</Text>
        </TouchableOpacity>

        <View style={globalStyle.row}>
          <Text style={[globalStyle.descLink, SignInStyle.createAccount]}>
            Belum punya akun?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={globalStyle.link}>Buat Akun</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
