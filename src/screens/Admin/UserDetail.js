import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import UserDetailStyle from '../../styles/UserDetail.style';
import Feather from 'react-native-vector-icons/Feather';
import {
  COLOR_SETTINGS,
  STATUS_ACTIVE,
  USER_PICTURE_DEFAULT,
} from '../../database/AppData';
import globalStyle from '../../styles/global.style';
import api from '../../config/api';
import Loading from '../Loading';
import { ActivityIndicator, Divider } from 'react-native-paper';
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Account({ route, navigation }) {
  const { kd_user } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUser();
      getLoggedInUser();
    });

    return unsubscribe;
  }, [navigation]);

  const getUser = () => {
    const params = {
      kd_user: kd_user ?? '',
    };
    api.get('/detail-user', { params }).then(({ data }) => {
      setUser(data?.User ?? null);
      setLoading(false);
    });
  };

  const getLoggedInUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (userData !== null) {
        setLoggedInUser(JSON.parse(userData));
      }
    } catch (e) {
      setLoggedInUser(null);
    }
  };

  const confirmDelete = () => {
    Alert.alert('Hapus Akun', 'Apakah anda yakin?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      { text: 'Ya, Hapus', onPress: () => handleDelete() },
    ]);
  };

  const handleDelete = () => {
    const formData = new FormData();
    formData.append('kd_user', kd_user);
    formData.append('record_status', STATUS_ACTIVE.DELETE);
    setSaving(true);
    api
      .post('/ubahstatususer', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        setSaving(false);
        if (data.Error === 0) {
          navigation.goBack();
          ToastAndroid.show('Akun Berhasil Dihapus', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Gagal Menghapus Data', ToastAndroid.SHORT);
        }
      });
  };

  return (
    <View style={[globalStyle.container, globalStyle.pRelative]}>
      <View style={globalStyle.headerContainer}>
        <TouchableOpacity
          style={globalStyle.paddingContainer}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <View>
          <Text style={globalStyle.appName}>Informasi Akun</Text>
        </View>
      </View>

      <ScrollView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <View style={UserDetailStyle.userContainer}>
              <View style={UserDetailStyle.userPictureContainer}>
                <Image
                  source={{ uri: user?.foto_profil ?? USER_PICTURE_DEFAULT }}
                  style={UserDetailStyle.userPicture}
                />
              </View>
              <View style={UserDetailStyle.userDetailContainer}>
                <View>
                  <Text style={UserDetailStyle.userTitle}>{user?.nama}</Text>
                  <Text style={UserDetailStyle.userSubtitle}>
                    {user?.level}
                  </Text>
                </View>
              </View>
            </View>

            <View style={globalStyle.paddingHorizontal}>
              <Text style={UserDetailStyle.itemTitle}>No. Telepon</Text>
              <Text style={UserDetailStyle.itemContent}>
                {user?.no_telepon}
              </Text>
              <Divider />
            </View>
            <View style={globalStyle.paddingHorizontal}>
              <Text style={UserDetailStyle.itemTitle}>Email</Text>
              <Text style={UserDetailStyle.itemContent}>
                {user?.email ?? '-'}
              </Text>
              <Divider />
            </View>
            <View style={globalStyle.paddingHorizontal}>
              <Text style={UserDetailStyle.itemTitle}>Alamat</Text>
              <Text style={UserDetailStyle.itemContent}>
                {user?.alamat ?? '-'}
              </Text>
              <Divider />
            </View>
            <View style={globalStyle.paddingHorizontal}>
              <Text style={UserDetailStyle.itemTitle}>Kode Pos</Text>
              <Text style={UserDetailStyle.itemContent}>
                {user?.kode_pos ?? '-'}
              </Text>
              <Divider />
            </View>
            <View style={globalStyle.paddingHorizontal}>
              <Text style={UserDetailStyle.itemTitle}>Terdaftar Pada</Text>
              <Text style={UserDetailStyle.itemContent}>
                {user?.created_at
                  ? dayjs(user?.created_at, 'YYYY-MM-DD HH:mm:ss').format(
                      'DD/MM/YYYY HH:mm:ss',
                    )
                  : '-'}
              </Text>
            </View>
            {loggedInUser?.kd_user === user?.kd_user && (
              <View style={globalStyle.paddingHorizontal}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('AccountDetails')}
                  style={globalStyle.submitBtn}>
                  <Feather name="edit" style={globalStyle.submitBtnIcon} />
                  <Text style={globalStyle.submitBtnText}>
                    Ubah Informasi Akun
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {loggedInUser?.kd_user !== user?.kd_user && (
              <View style={globalStyle.paddingHorizontal}>
                <TouchableOpacity
                  onPress={() => confirmDelete()}
                  style={globalStyle.submitBtn}>
                  {saving ? (
                    <ActivityIndicator
                      size="small"
                      color={COLOR_SETTINGS.WHITE}
                      style={{
                        marginRight: 5,
                      }}
                    />
                  ) : (
                    <Feather name="trash-2" style={globalStyle.submitBtnIcon} />
                  )}
                  <Text style={globalStyle.submitBtnText}>Hapus Akun</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
