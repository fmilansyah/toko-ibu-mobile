import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {
  cantEmpty,
  confirmPasswordValidator,
  numberValidator,
} from '../helpers/validation';
import SignInStyle from '../styles/SignIn.style';
import { TextInput } from '../components/Form';
import globalStyle from '../styles/global.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });

  const handleLogin = () => {
    const nameError = cantEmpty(name.value);
    const phoneError = numberValidator(phone.value);
    const passwordError = cantEmpty(password.value);
    const confirmPasswordError = confirmPasswordValidator(
      confirmPassword.value,
      password.value,
    );
    if (nameError || phoneError || passwordError || confirmPasswordError) {
      setName({ ...name, error: nameError });
      setPhone({ ...phone, error: phoneError });
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
      return;
    }
    const formData = new FormData();
    formData.append('nama', name.value);
    formData.append('no_telepon', phone.value);
    formData.append('password', psassword.value);
    api
      .post('/daftaruser', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => updateUserData(data));
  };

  const updateUserData = async data => {
    await AsyncStorage.setItem('user_id', data?.data);
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
        <Text style={SignInStyle.title}>Buat Akun Baru</Text>

        <TextInput
          label="Nama Lengkap"
          returnKeyType="next"
          value={name.value}
          onChangeText={text => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="No. Handphone"
          returnKeyType="next"
          value={phone.value}
          onChangeText={text => setPhone({ value: text, error: '' })}
          error={!!phone.error}
          errorText={phone.error}
          autoCapitalize="none"
          keyboardType="numeric"
        />
        <TextInput
          label="Kata Sandi"
          returnKeyType="next"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <TextInput
          label="Konfirmasi Kata Sandi"
          returnKeyType="done"
          value={confirmPassword.value}
          onChangeText={text => setConfirmPassword({ value: text, error: '' })}
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry
        />

        <TouchableOpacity style={SignInStyle.submitBtn} onPress={handleLogin}>
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
