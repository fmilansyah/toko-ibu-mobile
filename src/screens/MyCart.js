import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Items } from '../database/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyCartStyle from '../styles/MyCart.style';
import globalStyle from '../styles/global.style';
import Feather from 'react-native-vector-icons/Feather';
import { ProductCartItem } from '../components/Product';
import { rupiahFormatter } from '../helpers/formatter';
import { Divider } from '../components/Basic';
import api from '../config/api';

const MyCart = ({ navigation }) => {
  const [carts, setCarts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
      calcTotal();
  }, [carts]);

  const getDataFromDB = async () => {
    let userId = await AsyncStorage.getItem('user_id');
    if (userId !== null) {
      const formData = new FormData();
      formData.append('kd_user', userId);
      api
        .post('/getdatakeranjang', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) =>
          setCarts(
            data?.Keranjang
              ?? [],
          ),
        );
    }
  };

  const removeItemFromCart = async id => {
    const formData = new FormData();
    formData.append('kd_keranjang', id);
    await api.post('/hapuskeranjang', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    await getDataFromDB();
  };

  const checkOut = async () => {
    ToastAndroid.show('Items will be Deliverd SOON!', ToastAndroid.SHORT);

    navigation.navigate('Home');
  };

  const calcTotal = () => {
    const newSubTotal = carts.reduce(
      (a, b) => a + (parseInt(b.harga_total) || 0),
      0,
    );
    const newGrandTotal = carts.reduce(
      (a, b) => a + (parseInt(b.harga_total) || 0),
      0,
    );
    setSubTotal(newSubTotal);
    setGrandTotal(newGrandTotal);
  };

  const updateCart = async (kd_detail_barang, qty) => {
    let userId = await AsyncStorage.getItem('user_id');
    const formData = new FormData();
    formData.append('kd_user', userId);
    formData.append('kd_detail_barang', kd_detail_barang);
    formData.append('jumlah_barang', qty);
    await api.post('/tambahkeranjang', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    await getDataFromDB();
  };

  return (
    <View style={MyCartStyle.container}>
      <View style={MyCartStyle.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={MyCartStyle.appName}>Keranjang</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={MyCartStyle.sectionContainer}>
          <Text style={MyCartStyle.sectionTitle}>Daftar Barang</Text>
          <View>
            {carts
              ? carts.map((data, index) => (
                  <ProductCartItem
                    key={index}
                    data={data}
                    onDelete={removeItemFromCart}
                    onUpdateQty={updateCart}
                  />
                ))
              : null}
          </View>
        </View>
        <View style={MyCartStyle.sectionContainer}>
          <Text style={MyCartStyle.sectionTitle}>Pengiriman</Text>
          <View style={MyCartStyle.boxContainer}>
            <View style={MyCartStyle.boxContent}>
              <View style={MyCartStyle.boxIconContainer}>
                <MaterialCommunityIcons
                  name="truck-delivery-outline"
                  style={MyCartStyle.boxIcon}
                />
              </View>
              <View>
                <Text style={MyCartStyle.boxTitle}>JNE Regular</Text>
                <Text style={MyCartStyle.boxDesc} numberOfLines={1}>
                  Jalan Layungsari 3 No. 12, Bogor Selatan, Kota Bogor, Jawa
                  Barat
                </Text>
              </View>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              style={MyCartStyle.expandIcon}
            />
          </View>
        </View>
        <View style={MyCartStyle.sectionContainer}>
          <Text style={MyCartStyle.sectionTitle}>Metode Pembayaran</Text>
          <View style={MyCartStyle.boxContainer}>
            <View style={MyCartStyle.boxContent}>
              <View style={MyCartStyle.boxIconContainer}>
                <MaterialCommunityIcons
                  name="credit-card-multiple-outline"
                  style={MyCartStyle.boxIcon}
                />
              </View>
              <View>
                <Text style={MyCartStyle.boxTitle}>Transfer Bank</Text>
                <Text style={MyCartStyle.boxDesc} numberOfLines={1}>
                  Bank Mandiri
                </Text>
              </View>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              style={MyCartStyle.expandIcon}
            />
          </View>
        </View>
        <View style={MyCartStyle.sectionContainer}>
          <Text style={MyCartStyle.sectionTitle}>Ringkasan Pembelian</Text>
          <View style={MyCartStyle.summaryItem}>
            <Text style={MyCartStyle.summaryTitle}>Subtotal</Text>
            <Text style={MyCartStyle.summaryTotal}>
              {rupiahFormatter(subTotal)}
            </Text>
          </View>
          <View style={MyCartStyle.summaryItem}>
            <Text style={MyCartStyle.summaryTitle}>Ongkos Kirim</Text>
            <Text style={MyCartStyle.summaryTotal}>
              {rupiahFormatter(10000)}
            </Text>
          </View>
          <Divider />
          <View style={MyCartStyle.summaryItem}>
            <Text style={MyCartStyle.summaryTitle}>Total</Text>
            <Text
              style={[
                MyCartStyle.summaryTotal,
                {
                  fontSize: 14,
                },
              ]}>
              {rupiahFormatter(grandTotal)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={MyCartStyle.payBtnContainer}>
        <TouchableOpacity
          onPress={() => (total > 0 ? checkOut() : null)}
          style={MyCartStyle.payBtn}>
          <Feather name="credit-card" style={MyCartStyle.payBtnIcon} />
          <Text style={MyCartStyle.payBtnLabel}>BAYAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyCart;
