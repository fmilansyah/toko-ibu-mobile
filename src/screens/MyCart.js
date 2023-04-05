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

const MyCart = ({ navigation }) => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from local DB by ID
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      Items.forEach(data => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
  };

  //get total price of all items in the cart
  const getTotal = productData => {
    let newTotal = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].productPrice;
      newTotal += productPrice;
    }
    setTotal(newTotal);
  };

  //remove data from Cart

  const removeItemFromCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] === id) {
          array.splice(index, 1);
        }

        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        getDataFromDB();
      }
    }
  };

  //checkout

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }

    ToastAndroid.show('Items will be Deliverd SOON!', ToastAndroid.SHORT);

    navigation.navigate('Home');
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
            {product
              ? product.map((data, index) => (
                  <ProductCartItem key={index} data={data} />
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
              {rupiahFormatter(200000)}
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
              {rupiahFormatter(210000)}
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
