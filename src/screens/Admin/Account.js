import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  ToastAndroid,
  Alert,
  BackHandler,
} from 'react-native';
import OrderListStyle from '../../styles/OrderList.style';
import Feather from 'react-native-vector-icons/Feather';
import { USER_LEVEL, USER_PICTURE_DEFAULT } from '../../database/AppData';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Context } from '../../../App';

export default function Account({ navigation }) {
  const { setData } = useContext(Context);
  
  const [user, setUser] = useState(null);

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

  const confirmLogout = () => {
    Alert.alert('Keluar', 'Apakah anda yakin?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      { text: 'Keluar', onPress: () => handleLogout() },
    ]);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user_data');
    await setData(JSON.stringify(data?.User));
  };

  // const handleLogout = async () => {
  //   try {
  //     await AsyncStorage.removeItem('user_data');
  //     await ToastAndroid.show(
  //       'Silakan Buka Kembali Aplikasi',
  //       ToastAndroid.LONG,
  //     );
  //     await BackHandler.exitApp();
  //   } catch (e) {
  //     ToastAndroid.show('Gagal Keluar', ToastAndroid.SHORT);
  //   }
  // };

  return (
    <View style={OrderListStyle.container}>
      <View style={OrderListStyle.headerContainer}>
        <View>
          <Text style={OrderListStyle.appNameNoSpace}>Akun Saya</Text>
        </View>
      </View>

      <ScrollView>
        <View style={OrderListStyle.userContainer}>
          <View style={OrderListStyle.userPictureContainer}>
            <Image
              source={{ uri: user?.foto_profil ?? USER_PICTURE_DEFAULT }}
              style={OrderListStyle.userPicture}
            />
          </View>
          <View style={OrderListStyle.userDetailContainer}>
            <View>
              <Text style={OrderListStyle.userTitle}>{user?.nama}</Text>
              <Text style={OrderListStyle.userSubtitle}>{user?.level}</Text>
              <TouchableOpacity onPress={() => confirmLogout()}>
                <Text style={OrderListStyle.logout}>KELUAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={OrderListStyle.sectionTitleContainer}>
          <Text style={OrderListStyle.sectionTitle}>Menu</Text>
        </View>
        <View style={OrderListStyle.menuContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserDetail', {
                kd_user: user?.kd_user,
              })
            }>
            <Text style={OrderListStyle.menuItem}>
              <Feather name="user" style={OrderListStyle.menuIcon} />
              Informasi Akun
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AccountDetails')}>
            <Text style={OrderListStyle.menuItem}>
              <Feather name="settings" style={OrderListStyle.menuIcon} /> Ubah
              Informasi Akun
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={OrderListStyle.menuItem}>
              <Feather name="lock" style={OrderListStyle.menuIcon} />{' '}
              Ganti Kata Sandi
            </Text>
          </TouchableOpacity>
          {user?.level === USER_LEVEL.OWNER && (
            <TouchableOpacity onPress={() => navigation.navigate('UserList')}>
              <Text style={OrderListStyle.menuItem}>
                <Feather name="users" style={OrderListStyle.menuIcon} /> Daftar
                Akun
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
