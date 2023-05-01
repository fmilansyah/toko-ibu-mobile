import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import AccountDetailsStyle from '../styles/AccountDetails.style';
import globalStyle from '../styles/global.style';
import Feather from 'react-native-vector-icons/Feather';
import { TextInput } from '../components/Form';
import { Button } from 'react-native-paper';
import DocumentPicker, { types } from 'react-native-document-picker';
import {
  cantEmpty,
  emailValidator,
  numberValidator,
} from '../helpers/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';

export default function AccountDetails({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [address, setAddress] = useState({ value: '', error: '' });
  const [postalCode, setPostalCode] = useState({ value: '', error: '' });
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (userData !== null) {
        const newUser = JSON.parse(userData);
        setName({ value: newUser?.nama, error: '' });
        setPhone({ value: newUser?.no_telepon, error: '' });
        setEmail({ value: newUser?.email, error: '' });
        setAddress({ value: newUser?.alamat, error: '' });
        setPostalCode({ value: newUser?.kode_pos, error: '' });
        setUser(newUser);
      }
    } catch (e) {
      setUser(null);
    }
  };

  const handleSave = async () => {
    const nameError = cantEmpty(name.value);
    const phoneError = numberValidator(phone.value);
    const emailError = emailValidator(email.value);
    const addressError = cantEmpty(address.value);
    const postalCodeError = cantEmpty(postalCode.value);
    if (
      nameError ||
      phoneError ||
      emailError ||
      addressError ||
      postalCodeError
    ) {
      setName({ ...name, error: nameError });
      setPhone({ ...phone, error: phoneError });
      setEmail({ ...email, error: emailError });
      setAddress({ ...email, error: addressError });
      setPostalCode({ ...email, error: postalCodeError });
      return;
    }

    const formData = new FormData();
    formData.append('kd_user', user?.kd_user);
    formData.append('nama', name.value);
    formData.append('no_telepon', phone.value);
    formData.append('email', email.value);
    formData.append('alamat', address.value);
    formData.append('kode_pos', postalCode.value);
    if (photo !== null) {
      formData.append('image', {
        ...photo[0],
      });
    }
    api
      .post('/ubahuser', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        ToastAndroid.show('Data Berhasil Disimpan', ToastAndroid.SHORT);
        updateUserData(data);
      })
      .catch(() =>
        ToastAndroid.show('Gagal Menyimpan Data', ToastAndroid.SHORT),
      );
  };

  const updateUserData = async data => {
    await AsyncStorage.setItem('user_data', JSON.stringify(data?.User));
    await navigation.goBack();
  };

  return (
    <View style={AccountDetailsStyle.container}>
      <View style={AccountDetailsStyle.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <View>
          <Text style={AccountDetailsStyle.appName}>Pengaturan Akun</Text>
        </View>
      </View>

      <ScrollView>
        <View style={globalStyle.paddingContainer}>
          <TextInput
            label="Nama Lengkap"
            returnKeyType="next"
            value={name.value}
            onChangeText={text => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
          />
          <TextInput
            label="No. Telepon"
            returnKeyType="next"
            value={phone.value}
            onChangeText={text => setPhone({ value: text, error: '' })}
            error={!!phone.error}
            errorText={phone.error}
            keyboardType="phone-pad"
          />
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={text => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            keyboardType="email-address"
          />
          <TextInput
            label="Alamat"
            returnKeyType="next"
            value={address.value}
            onChangeText={text => setAddress({ value: text, error: '' })}
            error={!!address.error}
            errorText={address.error}
          />
          <TextInput
            label="Kode Pos"
            returnKeyType="next"
            value={postalCode.value}
            onChangeText={text => setPostalCode({ value: text, error: '' })}
            error={!!postalCode.error}
            errorText={postalCode.error}
            keyboardType="numeric"
          />
          <Button
            icon="camera"
            mode="contained"
            onPress={() => {
              DocumentPicker.pick({
                type: types.images,
              }).then(setPhoto);
            }}>
            {photo !== null ? photo[0]?.name : 'Pilih Foto Profil'}
          </Button>
          <View style={AccountDetailsStyle.btnSaveContainer}>
            <TouchableOpacity
              onPress={() => handleSave()}
              style={AccountDetailsStyle.btnSave}>
              <Feather name="save" style={AccountDetailsStyle.btnSaveIcon} />
              <Text style={AccountDetailsStyle.btnSaveLabel}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
