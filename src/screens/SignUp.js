import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
} from '../helpers/validation';
import SignInStyle from '../styles/SignIn.style';
import { TextInput } from '../components/Form';
import globalStyle from '../styles/global.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });

  const handleLogin = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = confirmPasswordValidator(
      confirmPassword.value,
      password.value,
    );
    if (emailError || passwordError || confirmPasswordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
      return;
    }
    navigation.reset({
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
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
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
