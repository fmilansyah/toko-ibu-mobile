import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [shippingCost, setShippingCost] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    calcTotal();
  }, [carts, shippingCost]);

  const getDataFromDB = async () => {
    let newUserData = await AsyncStorage.getItem('user_data');
    if (newUserData !== null) {
      const user = JSON.parse(newUserData);
      setUserData(user);
      const formData = new FormData();
      formData.append('kd_user', user?.kd_user);
      api
        .post('/getdatakeranjang', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) => setCarts(data?.Keranjang ?? []));
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

  const checkOut = () => {
    const orders = carts.map(item => ({
      kd_detail_barang: item?.kd_detail_barang,
      jumlah_barang: item?.jumlah_barang,
      harga_total: item?.harga_total,
    }));
    const formData = new FormData();
    formData.append('kd_user', userData?.kd_user);
    formData.append('total', grandTotal);
    api
      .post('/midtrans-createtoken', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) =>
        navigation.navigate('PaymentView', {
          token: data?.data?.token,
          order: JSON.stringify(orders),
        }),
      )
      .catch(e => {
        ToastAndroid.show('Pemesanan Gagal', ToastAndroid.SHORT);
      });
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
    setGrandTotal(newGrandTotal + shippingCost);
  };

  const updateCart = async (kd_detail_barang, qty) => {
    const formData = new FormData();
    formData.append('kd_user', userData?.kd_user);
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
        <View>
          <Text style={MyCartStyle.appName}>Keranjang</Text>
        </View>
      </View>
      <ScrollView>
        <View style={MyCartStyle.sectionContainer}>
          <Text style={MyCartStyle.sectionTitle}>Daftar Produk</Text>
          <View>
            {carts && carts.length > 0 ? (
              carts.map((data, index) => (
                <ProductCartItem
                  key={index}
                  data={data}
                  onDelete={removeItemFromCart}
                  onUpdateQty={updateCart}
                />
              ))
            ) : (
              <Text>Keranjang Kosong</Text>
            )}
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
        {/* <View style={MyCartStyle.sectionContainer}>
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
        </View> */}
        <View style={MyCartStyle.sectionContainer}>
          <Text style={MyCartStyle.sectionTitle}>Ringkasan Pembelian</Text>
          <View style={MyCartStyle.summaryItem}>
            <Text style={MyCartStyle.summaryTitle}>
              Subtotal ({carts.length} produk)
            </Text>
            <Text style={MyCartStyle.summaryTotal}>
              {rupiahFormatter(subTotal)}
            </Text>
          </View>
          <View style={MyCartStyle.summaryItem}>
            <Text style={MyCartStyle.summaryTitle}>Biaya Kirim</Text>
            <Text style={MyCartStyle.summaryTotal}>
              {rupiahFormatter(shippingCost)}
            </Text>
          </View>
          <Divider />
          <View style={MyCartStyle.summaryItem}>
            <Text style={MyCartStyle.summaryTitle}>Total</Text>
            <Text
              style={[
                MyCartStyle.summaryTotal,
                {
                  fontFamily: 'Lora-Bold',
                },
              ]}>
              {rupiahFormatter(grandTotal)}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={MyCartStyle.payBtnContainer}>
        <TouchableOpacity
          onPress={() => (grandTotal > 0 ? checkOut() : null)}
          style={MyCartStyle.payBtn}>
          <Feather name="credit-card" style={MyCartStyle.payBtnIcon} />
          <Text style={MyCartStyle.payBtnLabel}>BAYAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyCart;
