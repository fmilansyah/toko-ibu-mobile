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
import { validEmail } from '../helpers/validation';

export default function ForgotPassword({ navigation }) {
  const [validation, setValidation] = useState({
    email: [],
  });
  const [snackbarInfo, setSnackbarInfo] = useState({
    visible: false,
    message: null,
  });

  const [email, setEmail] = useState(null);

  const handleSubmit = () => {
    for (const key in validation) {
      if (validation[key].length > 0) {
        setSnackbarInfo({ visible: true, message: 'Harap Periksa Kembali' });
        return;
      }
    }
    const formData = new FormData();
    formData.append('email', email);
    api
      .post('/requestresetpassword', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) =>
        setSnackbarInfo({ visible: true, message: data?.Message }),
      )
      .catch(() =>
        setSnackbarInfo({ visible: true, message: 'Gagal Memeriksa Email' }),
      );
  };

  const handleChangeEmail = text => {
    setEmail(text);

    // validation rules
    const emailValidation = [];
    if (text === null || text === '') {
      emailValidation.push({
        title: 'Email harap diisi',
        icon: 'error',
      });
    }
    if (!validEmail(text)) {
      emailValidation.push({
        title: 'Email tidak valid',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      email: emailValidation,
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
        <Text style={SignInStyle.title}>Lupa Kata Sandi</Text>

        <View style={{ width: '100%', marginBottom: 8 }}>
          <View style={globalStyle.formGroup}>
            <TextInput
              label="Email"
              inputProps={{
                value: email,
                onChangeText: handleChangeEmail,
                keyboardType: 'email-address',
                autoCapitalize: 'none',
                returnKeyType: 'done',
                onSubmitEditing: () => {
                  handleSubmit();
                },
              }}
            />
          </View>
          {validation.email.length > 0 && (
            <View style={globalStyle.formGroup}>
              <Validation data={validation.email} />
            </View>
          )}
        </View>

        <TouchableOpacity style={SignInStyle.submitBtn} onPress={handleSubmit}>
          <MaterialCommunityIcons
            name="login"
            style={SignInStyle.submitBtnIcon}
          />
          <Text style={SignInStyle.submitBtnText}>Kirim</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}
