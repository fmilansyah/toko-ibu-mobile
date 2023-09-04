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
import OrderListStyle from '../../styles/OrderList.style';
import globalStyle from '../../styles/global.style';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { rupiahFormatter } from '../../helpers/formatter';
import {
  COLOR_SETTINGS,
  STATUS_ORDER,
  USER_PICTURE_DEFAULT,
} from '../../database/AppData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../config/api';
import dayjs from 'dayjs';
import { Chip, TextInput as Input } from 'react-native-paper';
import AddItemStyle from '../../styles/AddItem.style';
import Loading from '../Loading';
import ItemListStyle from '../../styles/ItemList.style';
import { TextInput } from '../../components/Form';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function OrderList({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [statusOrder, setStatusOrder] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date(dayjs().format('YYYY-MM-DD')),
  );
  const [endDate, setEndDate] = useState(
    new Date(dayjs().format('YYYY-MM-DD')),
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOrders();
      setStartDate(new Date(dayjs().format('YYYY-MM-DD')));
      setEndDate(new Date(dayjs().format('YYYY-MM-DD')));
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getOrders();
  }, [statusOrder, startDate, endDate]);

  const getOrders = () => {
    const formData = new FormData();
    formData.append('status_order', statusOrder);
    formData.append(
      'start_date',
      startDate ? dayjs(startDate).format('YYYY-MM-DD') : '',
    );
    formData.append(
      'end_date',
      endDate ? dayjs(endDate).format('YYYY-MM-DD') : '',
    );
    setLoading(true);
    api
      .post('/getlistorder', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        setLoading(false);
        setOrders(data?.listOrder ?? []);
      });
  };

  const showStartDate = () => {
    DateTimePickerAndroid.open({
      value: startDate,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        setStartDate(currentDate);
      },
      mode: 'date',
      is24Hour: true,
    });
  };

  const showEndDate = () => {
    DateTimePickerAndroid.open({
      value: endDate,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        setEndDate(currentDate);
      },
      mode: 'date',
      is24Hour: true,
    });
  };

  return (
    <View style={[globalStyle.container, globalStyle.pRelative]}>
      <View style={globalStyle.headerContainer}>
        <View style={globalStyle.paddingContainer}>
          <Text style={globalStyle.appName}>Daftar Pesanan</Text>
        </View>
      </View>
      <View>
        <View style={ItemListStyle.filterContainer}>
          <TouchableOpacity onPress={() => showStartDate()} style={{ flex: 1 }}>
            <TextInput
              inputProps={{
                placeholder: 'Mulai Dari',
                value: dayjs(startDate).format('DD/MM/YYYY'),
                editable: false,
                left: (
                  <Input.Icon
                    icon="calendar"
                    color={isTextInputFocused =>
                      isTextInputFocused
                        ? COLOR_SETTINGS.PRIMARY
                        : COLOR_SETTINGS.DARKGRAY
                    }
                  />
                ),
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showEndDate()} style={{ flex: 1 }}>
            <TextInput
              inputProps={{
                placeholder: 'Sampai Dengan',
                value: dayjs(endDate).format('DD/MM/YYYY'),
                editable: false,
                left: (
                  <Input.Icon
                    icon="calendar"
                    color={isTextInputFocused =>
                      isTextInputFocused
                        ? COLOR_SETTINGS.PRIMARY
                        : COLOR_SETTINGS.DARKGRAY
                    }
                  />
                ),
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={OrderListStyle.filterContainer}>
            <Chip
              textStyle={{
                fontFamily:
                  statusOrder === 'ALL' ? 'Lora-Bold' : 'Lora-Regular',
              }}
              style={{ marginRight: 4 }}
              onPress={() => setStatusOrder('ALL')}>
              Semua
            </Chip>
            <Chip
              textStyle={{
                fontFamily:
                  statusOrder === STATUS_ORDER.WAITING_FOR_CONFIRMATION
                    ? 'Lora-Bold'
                    : 'Lora-Regular',
              }}
              style={{ marginRight: 4 }}
              onPress={() =>
                setStatusOrder(STATUS_ORDER.WAITING_FOR_CONFIRMATION)
              }>
              {STATUS_ORDER.WAITING_FOR_CONFIRMATION}
            </Chip>
            <Chip
              textStyle={{
                fontFamily:
                  statusOrder === STATUS_ORDER.PROCESS
                    ? 'Lora-Bold'
                    : 'Lora-Regular',
              }}
              style={{ marginRight: 4 }}
              onPress={() => setStatusOrder(STATUS_ORDER.PROCESS)}>
              {STATUS_ORDER.PROCESS}
            </Chip>
            <Chip
              textStyle={{
                fontFamily:
                  statusOrder === STATUS_ORDER.DELIVERY
                    ? 'Lora-Bold'
                    : 'Lora-Regular',
              }}
              style={{ marginRight: 4 }}
              onPress={() => setStatusOrder(STATUS_ORDER.DELIVERY)}>
              {STATUS_ORDER.DELIVERY}
            </Chip>
            <Chip
              textStyle={{
                fontFamily:
                  statusOrder === STATUS_ORDER.FINISHED
                    ? 'Lora-Bold'
                    : 'Lora-Regular',
              }}
              style={{ marginRight: 4 }}
              onPress={() => setStatusOrder(STATUS_ORDER.FINISHED)}>
              {STATUS_ORDER.FINISHED}
            </Chip>
            <Chip
              textStyle={{
                fontFamily:
                  statusOrder === STATUS_ORDER.CANCELLED
                    ? 'Lora-Bold'
                    : 'Lora-Regular',
              }}
              onPress={() => setStatusOrder(STATUS_ORDER.CANCELLED)}>
              {STATUS_ORDER.CANCELLED}
            </Chip>
          </View>
        </ScrollView>
      </View>

      <ScrollView>
        {loading ? (
          <View style={{ paddingVertical: 16 }}>
            <Loading />
          </View>
        ) : orders?.length < 1 ? (
          <View
            style={[AddItemStyle.fileInfoContainer, globalStyle.marginLayout]}>
            <Text style={AddItemStyle.fileInfo}>Belum Ada Pesanan</Text>
          </View>
        ) : (
          <View>
            {orders.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  navigation.navigate('OrderDetailAdmin', {
                    kd_order: item?.kd_order,
                  })
                }
                style={OrderListStyle.card}>
                <View style={OrderListStyle.headerCard}>
                  <View style={globalStyle.flex}>
                    <Text style={OrderListStyle.headerTitle}>
                      Pesanan Dari {item?.nama}
                    </Text>
                    <Text style={OrderListStyle.headerDate}>
                      {item?.tanggal_pembayaran
                        ? dayjs(
                            item?.tanggal_pembayaran,
                            'YYYY-MM-DD HH:mm:ss',
                          ).format('DD/MM/YYYY HH:mm:ss')
                        : '-'}
                    </Text>
                  </View>
                </View>
                <View style={OrderListStyle.bodyCard}>
                  <View style={OrderListStyle.productContainer}>
                    <View style={OrderListStyle.productImageContainer}>
                      <Image
                        source={{ uri: item?.detail_order[0]?.file }}
                        style={OrderListStyle.productImage}
                      />
                    </View>
                    <View style={OrderListStyle.productDetailContainer}>
                      <View>
                        <Text style={OrderListStyle.productName}>
                          {item?.detail_order[0]?.nama} -{' '}
                          {item?.detail_order[0]?.varian}
                        </Text>
                        <View style={OrderListStyle.productPriceContainer}>
                          <Text style={OrderListStyle.productPrice}>
                            {item?.detail_order[0]?.jumlah_barang}x{' '}
                            {rupiahFormatter(
                              item?.detail_order[0]?.total_harga,
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  {item?.detail_order.length > 1 && (
                    <Text style={OrderListStyle.productPrice}>
                      +{item?.detail_order.length - 1} produk lainnya
                    </Text>
                  )}
                </View>
                <View style={OrderListStyle.footerCard}>
                  <View style={globalStyle.flex}>
                    <Text style={OrderListStyle.footerTitle}>
                      Total Belanja
                    </Text>
                    <Text style={OrderListStyle.footerNominal}>
                      {rupiahFormatter(item?.total_akhir)}
                    </Text>
                  </View>
                  <View style={globalStyle.flex}>
                    <Text
                      style={
                        item?.status_order ===
                        STATUS_ORDER.WAITING_FOR_CONFIRMATION
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
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
