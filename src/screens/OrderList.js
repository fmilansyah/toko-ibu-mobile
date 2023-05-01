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
import { Items } from '../database/Database';
import { USER_PICTURE_DEFAULT } from '../database/AppData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderList({ navigation }) {
  const [user, setUser] = useState(null);
  const data = Items[0];

  useEffect(() => {
    getUserData();
  }, []);

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
          <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
            <Text style={OrderListStyle.menuItem}>
              <Feather name="shopping-cart" style={OrderListStyle.menuIcon} />{' '}
              Keranjang Belanja
            </Text>
          </TouchableOpacity>
        </View>

        <View style={OrderListStyle.sectionTitleContainer}>
          <Text style={OrderListStyle.sectionTitle}>Riwayat Transaksi</Text>
        </View>
        <View style={OrderListStyle.card}>
          <View style={OrderListStyle.headerCard}>
            <View style={globalStyle.flex}>
              <Text style={OrderListStyle.headerTitle}>Belanja</Text>
              <Text style={OrderListStyle.headerDate}>03 Apr 2023</Text>
            </View>
            <View style={globalStyle.flex}>
              <TouchableOpacity>
                <Entypo
                  name="dots-three-vertical"
                  style={OrderListStyle.moreBtn}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={OrderListStyle.bodyCard}>
            <TouchableOpacity style={OrderListStyle.productContainer}>
              <View style={OrderListStyle.productImageContainer}>
                <Image
                  source={{ uri: data?.productImage }}
                  style={OrderListStyle.productImage}
                />
              </View>
              <View style={OrderListStyle.productDetailContainer}>
                <View>
                  <Text style={OrderListStyle.productName}>
                    {data?.productName}
                  </Text>
                  <View style={OrderListStyle.productPriceContainer}>
                    <Text style={OrderListStyle.productPrice}>
                      2x {rupiahFormatter(data?.productPrice)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <Text style={OrderListStyle.productPrice}>+3 produk lainnya</Text>
          </View>
          <View style={OrderListStyle.footerCard}>
            <View style={globalStyle.flex}>
              <Text style={OrderListStyle.footerTitle}>Total Belanja</Text>
              <Text style={OrderListStyle.footerNominal}>
                {rupiahFormatter(120000)}
              </Text>
            </View>
            <View style={globalStyle.flex}>
              <Text style={OrderListStyle.successLabel}>Selesai</Text>
            </View>
          </View>
        </View>

        <View style={OrderListStyle.card}>
          <View style={OrderListStyle.headerCard}>
            <View style={globalStyle.flex}>
              <Text style={OrderListStyle.headerTitle}>Belanja</Text>
              <Text style={OrderListStyle.headerDate}>03 Mei 2023</Text>
            </View>
            <View style={globalStyle.flex}>
              <TouchableOpacity>
                <Entypo
                  name="dots-three-vertical"
                  style={OrderListStyle.moreBtn}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={OrderListStyle.bodyCard}>
            <TouchableOpacity style={OrderListStyle.productContainer}>
              <View style={OrderListStyle.productImageContainer}>
                <Image
                  source={{ uri: data?.productImage }}
                  style={OrderListStyle.productImage}
                />
              </View>
              <View style={OrderListStyle.productDetailContainer}>
                <View>
                  <Text style={OrderListStyle.productName}>
                    {data?.productName}
                  </Text>
                  <View style={OrderListStyle.productPriceContainer}>
                    <Text style={OrderListStyle.productPrice}>
                      2x {rupiahFormatter(data?.productPrice)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={OrderListStyle.footerCard}>
            <View style={globalStyle.flex}>
              <Text style={OrderListStyle.footerTitle}>Total Belanja</Text>
              <Text style={OrderListStyle.footerNominal}>
                {rupiahFormatter(120000)}
              </Text>
            </View>
            <View style={globalStyle.flex}>
              <Text style={OrderListStyle.warningLabel}>Dikirim</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
