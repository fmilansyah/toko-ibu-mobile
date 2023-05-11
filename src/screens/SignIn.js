import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import { numberValidator, cantEmpty } from '../helpers/validation';
import SignInStyle from '../styles/SignIn.style';
import { TextInput } from '../components/Form';
import globalStyle from '../styles/global.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_LEVEL } from '../database/AppData';

export default function SignIn({ navigation }) {
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const handleLogin = () => {
    // const phoneError = numberValidator(phone.value);
    // const passwordError = cantEmpty(password.value);
    // if (phoneError || passwordError) {
    //   setPhone({ ...phone, error: phoneError });
    //   setPassword({ ...password, error: passwordError });
    //   return;
    // }
    const formData = new FormData();
    formData.append('no_telepon', '');
    formData.append('password', '');
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
    if (data?.level !== USER_LEVEL.BUYER) {
      ToastAndroid.show('Silakan Buka Kembali Aplikasi', ToastAndroid.LONG);
      BackHandler.exitApp();
    }
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
        <Text style={SignInStyle.title}>Masuk Ke Akun Anda</Text>

        <TextInput
          label="No. Telepon"
          returnKeyType="next"
          value={phone.value}
          onChangeText={text => setPhone({ value: text, error: '' })}
          error={!!phone.error}
          errorText={phone.error}
          keyboardType="numeric"
        />
        <TextInput
          label="Kata Sandi"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

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
