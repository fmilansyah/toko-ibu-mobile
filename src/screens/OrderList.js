import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import OrderListStyle from '../styles/OrderList.style';
import globalStyle from '../styles/global.style';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { rupiahFormatter } from '../helpers/formatter';
import { STATUS_ORDER, USER_PICTURE_DEFAULT } from '../database/AppData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';
import dayjs from 'dayjs';
import Loading from './Loading';

export default function OrderList({ navigation }) {
  const [user, setUser] = useState(null);
  const [userOrder, setUserOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (user !== null) {
      getUserOrder();
    }
  }, [user]);

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
    try {
      await AsyncStorage.removeItem('user_data');
      await navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (e) {
      ToastAndroid.show('Gagal Keluar', ToastAndroid.SHORT);
    }
  };

  const getUserOrder = () => {
    const formData = new FormData();
    formData.append('kd_user', user?.kd_user);
    setLoading(true);
    api
      .post('/getuserorder', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        setLoading(false);
        setUserOrder(data?.listOrder ?? [])
      });
  };

  const handleCart = () => {
    if (user?.biteship_area_id) {
      navigation.navigate('MyCart');
    } else {
      ToastAndroid.show(
        'Harap lengkapi data diri terlebih dahulu',
        ToastAndroid.SHORT,
      );
      navigation.navigate('AccountDetails');
    }
  };

  return (
    <View style={OrderListStyle.container}>
      <View style={OrderListStyle.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <View>
          <Text style={OrderListStyle.appName}>Akun Saya</Text>
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
              <Text style={OrderListStyle.userSubtitle}>
                {user?.no_telepon}
              </Text>
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
            onPress={() => navigation.navigate('AccountDetails')}>
            <Text style={OrderListStyle.menuItem}>
              <Feather name="settings" style={OrderListStyle.menuIcon} />{' '}
              Pengaturan Akun
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCart()}>
            <Text style={OrderListStyle.menuItem}>
              <Feather name="shopping-cart" style={OrderListStyle.menuIcon} />{' '}
              Keranjang Belanja
            </Text>
          </TouchableOpacity>
        </View>

        <View style={OrderListStyle.sectionTitleContainer}>
          <Text style={OrderListStyle.sectionTitle}>Riwayat Transaksi</Text>
        </View>
        {loading ? (
          <View style={{ paddingVertical: 16 }}>
            <Loading />
          </View>
        ) : (
          <View>
            {userOrder.map((item, i) => (
          <View key={i} style={OrderListStyle.card}>
            <View style={OrderListStyle.headerCard}>
              <View style={globalStyle.flex}>
                <Text style={OrderListStyle.headerTitle}>Belanja</Text>
                <Text style={OrderListStyle.headerDate}>
                  {item?.created_at
                    ? dayjs(item?.created_at, 'YYYY-MM-DD HH:mm:ss').format(
                        'DD/MM/YYYY HH:mm:ss',
                      )
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={OrderListStyle.bodyCard}>
              <TouchableOpacity
                style={OrderListStyle.productContainer}
                onPress={() =>
                  navigation.navigate('OrderDetail', {
                    kd_order: item?.kd_order,
                  })
                }>
                <View style={OrderListStyle.productImageContainer}>
                  <Image
                    source={{ uri: item?.barang?.file }}
                    style={OrderListStyle.productImage}
                  />
                </View>
                <View style={OrderListStyle.productDetailContainer}>
                  <View>
                    <Text style={OrderListStyle.productName}>
                      {item?.barang?.nama} - {item?.barang?.varian}
                    </Text>
                    <View style={OrderListStyle.productPriceContainer}>
                      <Text style={OrderListStyle.productPrice}>
                        {item?.barang?.jumlah_barang}x{' '}
                        {rupiahFormatter(item?.barang?.harga)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              {item?.jumlah_produk > 1 && (
                <Text style={OrderListStyle.productPrice}>
                  +{item?.jumlah_produk - 1} produk lainnya
                </Text>
              )}
            </View>
            <View style={OrderListStyle.footerCard}>
              <View style={globalStyle.flex}>
                <Text style={OrderListStyle.footerTitle}>Total Belanja</Text>
                <Text style={OrderListStyle.footerNominal}>
                  {rupiahFormatter(item?.total_akhir)}
                </Text>
              </View>
              <View style={globalStyle.flex}>
                <Text
                  style={
                    item?.status_order === STATUS_ORDER.WAITING_FOR_CONFIRMATION
                      ? OrderListStyle.warningLabel
                      : item?.status_order === STATUS_ORDER.PROCESS
                      ? OrderListStyle.infoLabel
                      : item?.status_order === STATUS_ORDER.DELIVERY
                      ? OrderListStyle.limeLabel
                      : item?.status_order === STATUS_ORDER.FINISHED
                      ? OrderListStyle.successLabel
                      : OrderListStyle.errorLabel
                  }>
                  {item?.status_order}
                </Text>
              </View>
            </View>
          </View>
        ))}
            </View>
        )}
      </ScrollView>
    </View>
  );
}
