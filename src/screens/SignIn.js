import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { emailValidator, passwordValidator } from '../helpers/validation';
import SignInStyle from '../styles/SignIn.style';
import { TextInput } from '../components/Form';
import globalStyle from '../styles/global.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const handleLogin = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
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
        <Text style={SignInStyle.title}>Masuk Ke Akun Anda</Text>

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
          <TouchableOpacity>
            <Text style={globalStyle.link}>Buat Akun</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
