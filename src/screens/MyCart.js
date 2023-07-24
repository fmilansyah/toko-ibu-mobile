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
import { Modal, Portal, Provider } from 'react-native-paper';
import AddItemStyle from '../styles/AddItem.style';
import { ALLOWED_COURIER } from '../database/AppData';
import Loading from './Loading';

const MyCart = ({ navigation }) => {
  const [carts, setCarts] = useState([]);
  const [subTotal, setSubTotal] = useState(0); // Total Produk
  const [shippingCost, setShippingCost] = useState(0); // Ongkir
  const [grandTotal, setGrandTotal] = useState(0); // Total Produk + Ongkir
  const [userData, setUserData] = useState(null);
  const [courierName, setCourierName] = useState(null);
  const [courierCode, setCourierCode] = useState(null); // Untuk tracking pengiriman
  const [courierService, setCourierService] = useState(null);

  const [shippingVisible, setShippingVisible] = useState(false);
  const [courierList, setCourierList] = useState([]);

  const [shippingDetailVisible, setShippingDetailVisible] = useState(false);
  const [courierListDetail, setCourierListDetail] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCartsAndUser();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    calcTotal();
  }, [carts, shippingCost]);

  const getCartsAndUser = async () => {
    let newUserData = await AsyncStorage.getItem('user_data');
    if (newUserData !== null) {
      resetShipping();

      const user = JSON.parse(newUserData);
      setUserData(user);

      const formData = new FormData();
      formData.append('kd_user', user?.kd_user);
      setLoading(true);
      api
        .post('/getdatakeranjang', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) => {
          setLoading(false);
          setCarts(data?.Keranjang ?? []);
        });
    }
  };

  const removeItemFromCart = async kd_detail_barang => {
    const formData = new FormData();
    formData.append('kd_user', userData?.kd_user);
    formData.append('kd_detail_barang', kd_detail_barang);
    await api.post('/hapuskeranjang', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    await getCartsAndUser();
  };

  const checkOut = () => {
    if (courierCode) {
      const orders = carts.map(item => ({
        kd_detail_barang: item?.kd_detail_barang,
        jumlah_barang: item?.jumlah_barang,
        harga_total: item?.harga_total,
      }));
      const formData = new FormData();
      formData.append('kd_user', userData?.kd_user);
      formData.append('orders', JSON.stringify(orders));
      formData.append('jenis_order', 'keranjang');
      formData.append('jasa_pengiriman', courierName);
      formData.append('jenis_pengiriman', courierService);
      formData.append('ongkir', shippingCost);
      formData.append('kode_jasa_pengiriman', courierCode);
      api
        .post('/orderbarang', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) =>
          navigation.navigate('PaymentView', {
            token: data?.token,
            kd_order: data?.kd_order,
          }),
        )
        .catch(e => {
          ToastAndroid.show('Pemesanan Gagal', ToastAndroid.SHORT);
        });
    } else {
      ToastAndroid.show(
        'Harap pilih pengiriman terlebih dahulu',
        ToastAndroid.SHORT,
      );
    }
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
    await getCartsAndUser();
  };

  const getCourier = () => {
    api.get('/biteshipcouriers').then(({ data }) => {
      const newCourierList = data?.data.filter((obj, index) => {
        return (
          index ===
            data?.data.findIndex(o => obj.courier_code === o.courier_code) &&
          ALLOWED_COURIER.includes(obj.courier_code)
        );
      });
      setCourierList(newCourierList);
    });
  };

  const resetShipping = () => {
    setCourierName(null);
    setCourierCode(null);
    setCourierService(null);
    setShippingCost(0);
  };

  const handleOpenShipping = () => {
    resetShipping();
    setShippingVisible(true);
    getCourier();
  };

  const handleCloseShipping = () => {
    setShippingVisible(false);
    setCourierList([]);
  };

  const handleOpenShippingDetail = courier => {
    setCourierName(courier?.courier_name);
    setCourierCode(courier?.courier_code);
    handleCloseShipping();
    setShippingDetailVisible(true);
    const items = carts.map(item => ({
      name: item?.nama + ' - ' + item?.varian,
      value: item?.harga_total,
      quantity: item?.jumlah_barang,
      weight: item?.berat_satuan,
    }));
    const formData = new FormData();
    formData.append('destination_area_id', userData?.biteship_area_id);
    formData.append('couriers', courier?.courier_code);
    formData.append('items', JSON.stringify(items));
    api
      .post('/biteshiprates', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => setCourierListDetail(data?.data))
      .catch(e => console.log(e));
  };

  const handleCloseShippingDetail = () => {
    setShippingDetailVisible(false);
    setCourierListDetail([]);
  };

  const handleChooseShippingDetail = data => {
    setCourierService(data?.courier_service_name);
    setShippingCost(data?.price);
    handleCloseShippingDetail();
  };

  const renderShipping = () => {
    return (
      <View>
        <View style={AddItemStyle.modalHeader}>
          <View>
            <Text style={AddItemStyle.modalTitle}>Pilih Kurir</Text>
          </View>
          <TouchableOpacity onPress={() => handleCloseShipping()}>
            <MaterialCommunityIcons
              name="close-thick"
              style={AddItemStyle.modalCloseIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {courierList?.length < 1 ? (
            <View style={AddItemStyle.fileInfoContainer}>
              <Text style={AddItemStyle.fileInfo}>Data Kurir Tidak Ada</Text>
            </View>
          ) : (
            <View>
              {courierList.map((data, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={AddItemStyle.categoryItem}
                    onPress={() => {
                      handleOpenShippingDetail(data);
                    }}>
                    <Text style={AddItemStyle.categoryName}>
                      {data?.courier_name}
                    </Text>
                  </TouchableOpacity>
                  {courierList.length - 1 !== index && <Divider />}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  const renderShippingDetail = () => {
    return (
      <View>
        <View style={AddItemStyle.modalHeader}>
          <View>
            <Text style={AddItemStyle.modalTitle}>{courierName}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleCloseShippingDetail();
              resetShipping();
            }}>
            <MaterialCommunityIcons
              name="close-thick"
              style={AddItemStyle.modalCloseIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {courierListDetail?.length < 1 ? (
            <View style={AddItemStyle.fileInfoContainer}>
              <Text style={AddItemStyle.fileInfo}>
                Data Jenis Pengiriman Tidak Ada
              </Text>
            </View>
          ) : (
            <View>
              {courierListDetail.map((data, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={AddItemStyle.categoryItem}
                    onPress={() => {
                      handleChooseShippingDetail(data);
                    }}>
                    <Text style={AddItemStyle.categoryName}>
                      {data?.courier_service_name}
                    </Text>
                    <Text style={AddItemStyle.categoryName}>
                      {rupiahFormatter(data?.price)}
                    </Text>
                  </TouchableOpacity>
                  {courierList.length - 1 !== index && <Divider />}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={shippingVisible}
          onDismiss={() => {
            handleCloseShipping();
          }}
          contentContainerStyle={AddItemStyle.modalContainer}>
          {renderShipping()}
        </Modal>
        <Modal
          visible={shippingDetailVisible}
          onDismiss={() => {
            handleCloseShippingDetail();
            resetShipping();
          }}
          contentContainerStyle={AddItemStyle.modalContainer}>
          {renderShippingDetail()}
        </Modal>
      </Portal>
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
              {loading ? (
                <Loading />
              ) : carts && carts.length > 0 ? (
                carts.map((data, index) => (
                  <ProductCartItem
                    key={index}
                    data={data}
                    onDelete={removeItemFromCart}
                    onUpdateQty={updateCart}
                  />
                ))
              ) : (
                <View style={AddItemStyle.fileInfoContainer}>
                  <Text style={AddItemStyle.fileInfo}>
                    Keranjang Masih Kosong
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={MyCartStyle.sectionContainer}>
            <Text style={MyCartStyle.sectionTitle}>Pengiriman</Text>
            <TouchableOpacity
              onPress={() => handleOpenShipping()}
              style={MyCartStyle.boxContainer}>
              <View style={MyCartStyle.boxContent}>
                <View style={MyCartStyle.boxIconContainer}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    style={MyCartStyle.boxIcon}
                  />
                </View>
                {courierName ? (
                  <View>
                    <Text style={MyCartStyle.boxTitle}>{courierName}</Text>
                    <Text style={MyCartStyle.boxDesc} numberOfLines={1}>
                      {courierService}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={MyCartStyle.boxTitle}>Belum Pilih Kurir</Text>
                  </View>
                )}
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={MyCartStyle.expandIcon}
              />
            </TouchableOpacity>
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
              <Text style={MyCartStyle.summaryTitle}>
                Biaya Kirim (
                {carts.reduce(
                  (a, b) =>
                    a +
                    (parseInt(b.berat_satuan) * parseInt(b.jumlah_barang) || 0),
                  0,
                ) / 1000}{' '}
                kg)
              </Text>
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
    </Provider>
  );
};

export default MyCart;
