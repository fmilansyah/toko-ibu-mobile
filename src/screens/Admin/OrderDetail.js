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
import Feather from 'react-native-vector-icons/Feather';
import { STATUS_ORDER } from '../../database/AppData';
import globalStyle from '../../styles/global.style';
import api from '../../config/api';
import Loading from '../Loading';
import { Divider, Modal, Portal, Provider } from 'react-native-paper';
import dayjs from 'dayjs';
import { rupiahFormatter } from '../../helpers/formatter';
import OrderListStyle from '../../styles/OrderList.style';
import AddItemStyle from '../../styles/AddItem.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInput } from '../../components/Form';

export default function OrderDetail({ route, navigation }) {
  const { kd_order } = route.params;
  const [order, setOrder] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);
  const [shipmentNumber, setShipmentNumber] = useState(null);
  const [trackingVisible, setTrackingVisible] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOrder();
    });

    return unsubscribe;
  }, [navigation]);

  const getOrder = () => {
    const formData = new FormData();
    formData.append('kd_order', kd_order);
    api
      .post('/getdetailorder', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        setOrder(data?.Order ?? null);
        setShippingCost(
          data?.Order?.detail_order?.reduce(
            (prev, next) => prev + next.jumlah_barang * next.berat_satuan,
            0,
          ) / 1000,
        );
        setLoading(false);
        if (data?.Order?.no_resi) {
          getTrackingOrder(
            data?.Order?.no_resi,
            data?.Order?.kode_jasa_pengiriman,
          );
        }
      });
  };

  const getTrackingOrder = (waybillId, courierCode) => {
    const params = {
      waybill_id: waybillId,
      courier: courierCode,
    };
    api.get('/biteshiptracking', { params }).then(({ data }) => {
      if (data?.data) {
        setTrackingOrder(data?.data);
      }
    });
  };

  const confirmOrder = () => {
    Alert.alert('Proses Pesanan', 'Apakah anda yakin?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      { text: 'Ya', onPress: () => handleUpdateStatus(STATUS_ORDER.PROCESS) },
    ]);
  };

  const cancelOrder = () => {
    Alert.alert('Batalkan Pesanan', 'Apakah anda yakin?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      { text: 'Ya', onPress: () => handleUpdateStatus(STATUS_ORDER.CANCELLED) },
    ]);
  };

  const showDeliveryModal = () => {
    setDeliveryModalVisible(true);
  };

  const closeDeliveryModal = () => {
    setDeliveryModalVisible(false);
    setShipmentNumber(null);
  };

  const handleUpdateStatus = status => {
    const formData = new FormData();
    formData.append('kd_order', kd_order);
    formData.append('status_order', status);
    api
      .post('/updatestatusorder', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {
        setLoading(true);
        getOrder();
      });
  };

  const handleDelivery = () => {
    if (shipmentNumber) {
      const formData = new FormData();
      formData.append('kd_order', kd_order);
      formData.append('no_resi', shipmentNumber ?? '');
      api
        .post('/kirimbarang', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(() => {
          setLoading(true);
          getOrder();
          closeDeliveryModal();
        });
    } else {
      ToastAndroid.show('No. Resi Belum Diisi', ToastAndroid.SHORT);
    }
  };

  const trackOrder = () => {
    setTrackingVisible(true);
  };

  const handleCloseTrackOrder = () => {
    setTrackingVisible(false);
  };

  const renderDelivery = () => {
    return (
      <View>
        <View style={AddItemStyle.modalHeader}>
          <View>
            <Text style={AddItemStyle.modalTitle}>Kirim Pesanan</Text>
          </View>
          <TouchableOpacity onPress={() => closeDeliveryModal()}>
            <MaterialCommunityIcons
              name="close-thick"
              style={AddItemStyle.modalCloseIcon}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          label="No. Resi"
          inputProps={{
            value: shipmentNumber,
            onChangeText: setShipmentNumber,
            autoCorrect: false,
            returnKeyType: 'done',
            onSubmitEditing: () => {
              handleDelivery();
            },
          }}
        />
        <TouchableOpacity
          onPress={() => handleDelivery()}
          style={globalStyle.submitBtn}>
          <Feather name="save" style={globalStyle.submitBtnIcon} />
          <Text style={globalStyle.submitBtnText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTracking = () => {
    return (
      <View>
        <View style={AddItemStyle.modalHeader}>
          <View>
            <Text style={AddItemStyle.modalTitle}>Lacak Pengiriman</Text>
          </View>
          <TouchableOpacity onPress={() => handleCloseTrackOrder()}>
            <MaterialCommunityIcons
              name="close-thick"
              style={AddItemStyle.modalCloseIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {trackingOrder?.length < 1 ? (
            <View style={AddItemStyle.fileInfoContainer}>
              <Text style={AddItemStyle.fileInfo}>
                Belum Ada Update Pengiriman
              </Text>
            </View>
          ) : (
            <View>
              {trackingOrder.map((data, index) => (
                <View key={index}>
                  <View style={AddItemStyle.categoryItem}>
                    <Text
                      style={[
                        AddItemStyle.categoryName,
                        { fontFamily: 'Lora-Bold' },
                      ]}>
                      {data?.note}
                    </Text>
                    <Text style={AddItemStyle.categoryName}>
                      {data?.updated_at
                        ? dayjs(
                            data?.updated_at,
                            'YYYY-MM-DDTHH:mm:ssZ',
                          ).format('DD/MM/YYYY HH:mm:ss')
                        : '-'}
                    </Text>
                  </View>
                  {trackingOrder.length - 1 !== index && <Divider />}
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
          visible={deliveryModalVisible}
          onDismiss={() => closeDeliveryModal()}
          contentContainerStyle={AddItemStyle.modalContainer}>
          {renderDelivery()}
        </Modal>
        <Modal
          visible={trackingVisible}
          onDismiss={() => handleCloseTrackOrder()}
          contentContainerStyle={AddItemStyle.modalContainer}>
          {renderTracking()}
        </Modal>
      </Portal>
      <View style={[globalStyle.container, globalStyle.pRelative]}>
        <View style={globalStyle.headerContainer}>
          <TouchableOpacity
            style={globalStyle.paddingContainer}
            onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" style={globalStyle.iconBtn} />
          </TouchableOpacity>
          <View>
            <Text style={globalStyle.appName}>Informasi Pesanan</Text>
          </View>
        </View>

        <ScrollView>
          {loading ? (
            <Loading />
          ) : (
            <View style={globalStyle.paddingHorizontal}>
              <Text
                style={[
                  order?.status_order === STATUS_ORDER.WAITING_FOR_CONFIRMATION
                    ? OrderListStyle.warningLabel
                    : order?.status_order === STATUS_ORDER.PROCESS
                    ? OrderListStyle.infoLabel
                    : order?.status_order === STATUS_ORDER.DELIVERY
                    ? OrderListStyle.limeLabel
                    : order?.status_order === STATUS_ORDER.FINISHED
                    ? OrderListStyle.successLabel
                    : OrderListStyle.errorLabel,
                  {
                    alignSelf: 'flex-start',
                    marginBottom: 8,
                  },
                ]}>
                {order?.status_order}
              </Text>
              <Divider />
              <View style={OrderListStyle.labelColumn}>
                <View>
                  <Text style={OrderListStyle.labelText}>Nama Pembeli</Text>
                </View>
                <View>
                  <Text style={OrderListStyle.valueText}>
                    {order?.nama_user}
                  </Text>
                </View>
              </View>
              <View style={OrderListStyle.labelColumn}>
                <View>
                  <Text style={OrderListStyle.labelText}>Tgl. Pembelian</Text>
                </View>
                <View>
                  <Text style={OrderListStyle.valueText}>
                    {order?.tanggal_pembayaran
                      ? dayjs(
                          order?.tanggal_pembayaran,
                          'YYYY-MM-DD HH:mm:ss',
                        ).format('DD/MM/YYYY HH:mm:ss')
                      : '-'}
                  </Text>
                </View>
              </View>
              <Divider />
              <View style={OrderListStyle.sectionContainerDetail}>
                <Text style={OrderListStyle.sectionTitleDetail}>
                  Detail Produk
                </Text>
                {order?.detail_order.map((item, index) => (
                  <View key={index} style={OrderListStyle.productContainer}>
                    <View style={OrderListStyle.productImageContainer}>
                      <Image
                        source={{ uri: item?.file }}
                        style={OrderListStyle.productImage}
                      />
                    </View>
                    <View style={OrderListStyle.productDetailContainer}>
                      <View>
                        <Text style={OrderListStyle.productName}>
                          {item?.nama_barang} - {item?.varian}
                        </Text>
                        <View style={OrderListStyle.productPriceContainer}>
                          <Text style={OrderListStyle.productPrice}>
                            {item?.jumlah_barang}x{' '}
                            {rupiahFormatter(item?.harga)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              <Divider />
              <View style={OrderListStyle.sectionContainerDetail}>
                <Text style={OrderListStyle.sectionTitleDetail}>
                  Detail Produk
                </Text>
                <View style={OrderListStyle.labelColumn}>
                  <View>
                    <Text style={OrderListStyle.labelText}>Kurir</Text>
                  </View>
                  <View>
                    <Text style={OrderListStyle.valueText}>
                      {order?.jasa_pengiriman} - {order?.jenis_pengiriman}
                    </Text>
                  </View>
                </View>
                <View style={OrderListStyle.labelColumn}>
                  <View>
                    <Text style={OrderListStyle.labelText}>No. Resi</Text>
                  </View>
                  <View>
                    <Text style={OrderListStyle.valueText}>
                      {order?.no_resi ?? 'Belum Ada No. Resi'}
                    </Text>
                  </View>
                </View>
                <View style={OrderListStyle.labelColumn}>
                  <View>
                    <Text style={OrderListStyle.labelText}>
                      No. Tlp Pembeli
                    </Text>
                  </View>
                  <View>
                    <Text style={OrderListStyle.valueText}>
                      {order?.no_telepon ?? '-'}
                    </Text>
                  </View>
                </View>
                <View style={OrderListStyle.labelColumn}>
                  <View>
                    <Text style={OrderListStyle.labelText}>Alamat Pembeli</Text>
                  </View>
                  <View>
                    <Text style={OrderListStyle.valueText}>
                      {order?.alamat ?? '-'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={OrderListStyle.sectionContainerDetail}>
                <Text style={OrderListStyle.sectionTitleDetail}>
                  Rincian Pembayaran
                </Text>
                <View style={OrderListStyle.labelColumn}>
                  <View>
                    <Text style={OrderListStyle.labelText}>
                      Total Barang ({order?.detail_order?.length} barang)
                    </Text>
                  </View>
                  <View>
                    <Text style={OrderListStyle.valueText}>
                      {rupiahFormatter(order?.total_akhir)}
                    </Text>
                  </View>
                </View>
                <View style={OrderListStyle.labelColumn}>
                  <View>
                    <Text style={OrderListStyle.labelText}>
                      Total Ongkos Kirim ({shippingCost} kg)
                    </Text>
                  </View>
                  <View>
                    <Text style={OrderListStyle.valueText}>
                      {rupiahFormatter(order?.ongkir)}
                    </Text>
                  </View>
                </View>
                <View style={OrderListStyle.labelColumn}>
                  <View>
                    <Text style={OrderListStyle.labelText}>
                      Ongkos kirim diteruskan ke kurir
                    </Text>
                  </View>
                  <View>
                    <Text style={OrderListStyle.valueText}>
                      {order?.ongkir
                        ? '-' + rupiahFormatter(order?.ongkir)
                        : '-'}
                    </Text>
                  </View>
                </View>
                <View style={OrderListStyle.labelColumn}>
                  <View>
                    <Text style={OrderListStyle.valueText}>
                      Total Penjualan
                    </Text>
                  </View>
                  <View>
                    <Text style={OrderListStyle.valueText}>
                      {rupiahFormatter(order?.total_akhir)}
                    </Text>
                  </View>
                </View>
              </View>
              {order?.status_order === STATUS_ORDER.DELIVERY && (
                <TouchableOpacity
                  onPress={() => trackOrder()}
                  style={globalStyle.submitBtn}>
                  <Text style={globalStyle.submitBtnText}>
                    Lacak Pengiriman
                  </Text>
                </TouchableOpacity>
              )}
              {(order?.status_order === STATUS_ORDER.WAITING_FOR_CONFIRMATION ||
                order?.status_order === STATUS_ORDER.PROCESS) && (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      order?.status_order ===
                      STATUS_ORDER.WAITING_FOR_CONFIRMATION
                        ? confirmOrder()
                        : showDeliveryModal()
                    }
                    style={globalStyle.submitBtn}>
                    <Text style={globalStyle.submitBtnText}>
                      {order?.status_order ===
                      STATUS_ORDER.WAITING_FOR_CONFIRMATION
                        ? 'Proses Pesanan'
                        : 'Kirim Pesanan'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => cancelOrder()}
                    style={[
                      globalStyle.submitBtn,
                      {
                        marginTop: 0,
                      },
                    ]}>
                    <Text style={globalStyle.submitBtnText}>
                      Batalkan Pesanan
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </Provider>
  );
}
