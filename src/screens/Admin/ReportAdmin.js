import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
  Button,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import globalStyle, { borderRadius } from '../../styles/global.style';
import { TextInput } from '../../components/Form';
import {
  Divider,
  FAB,
  TextInput as Input,
  SegmentedButtons,
} from 'react-native-paper';
import api from '../../config/api';
import {
  COLOR_SETTINGS,
  USER_LEVEL,
  USER_PICTURE_DEFAULT,
} from '../../database/AppData';
import ItemListStyle from '../../styles/ItemList.style';
import { rupiahFormatter } from '../../helpers/formatter';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import RNFetchBlob from 'rn-fetch-blob';
import { API_URL } from '../../config/app';
import AddItemStyle from '../../styles/AddItem.style';
import Loading from '../Loading';

export default function ReportAdmin({ navigation }) {
  const [report, setReport] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(dayjs().format('YYYY-MM-DD')),
  );
  const [endDate, setEndDate] = useState(
    new Date(dayjs().format('YYYY-MM-DD')),
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getReport();
      setStartDate(new Date(dayjs().format('YYYY-MM-DD')));
      setEndDate(new Date(dayjs().format('YYYY-MM-DD')));
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getReport();
  }, [startDate, endDate]);

  const getReport = () => {
    const params = {
      start_date: startDate ? dayjs(startDate).format('YYYY-MM-DD') : '',
      end_date: endDate ? dayjs(endDate).format('YYYY-MM-DD') : '',
    };
    setLoading(true);
    api.get('/reportorder', { params }).then(({ data }) => {
      setLoading(false);
      setReport(data?.Order ?? []);
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

  const handleDownload = async () => {
    const params = {
      start_date: startDate ? dayjs(startDate).format('YYYY-MM-DD') : '',
      end_date: endDate ? dayjs(endDate).format('YYYY-MM-DD') : '',
    };
    const url =
      API_URL +
      '/pdf/report.php?start_date=' +
      params.start_date +
      '&end_date=' +
      params.end_date;
    Linking.openURL(url);
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
          <Text style={globalStyle.appName}>Laporan</Text>
        </View>
      </View>
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
      <ScrollView>
        {loading ? (
          <View style={{ paddingVertical: 16 }}>
            <Loading />
          </View>
        ) : report.length < 1 ? (
          <View
            style={[AddItemStyle.fileInfoContainer, globalStyle.marginLayout]}>
            <Text style={AddItemStyle.fileInfo}>
              Tidak Ada Transaksi Pada Periode Ini
            </Text>
          </View>
        ) : (
          <View>
            {report.map((item, index) => (
              <View key={index}>
                <View style={ItemListStyle.userContainer}>
                  <View style={ItemListStyle.userPictureContainer}>
                    <Image
                      source={{ uri: item?.file ?? USER_PICTURE_DEFAULT }}
                      style={ItemListStyle.userPicture}
                    />
                  </View>
                  <View style={ItemListStyle.userDetailContainer}>
                    <View>
                      <Text style={ItemListStyle.userTitle}>
                        {item?.nama} - {item?.varian}
                      </Text>
                      <Text style={ItemListStyle.userLevel}>
                        Harga : {rupiahFormatter(item?.harga)}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 16,
                        }}>
                        <View>
                          <Text style={ItemListStyle.userSubtitle}>
                            Terjual : {item?.total_qty} pcs
                          </Text>
                        </View>
                        <View>
                          <Text style={ItemListStyle.userSubtitle}>
                            Total : {rupiahFormatter(item?.total_harga)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                {report.length !== index + 1 && (
                  <View style={globalStyle.paddingContainer}>
                    <Divider />
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <FAB
        icon="download"
        style={globalStyle.fab}
        onPress={() => handleDownload()}
        theme={{ colors: { onPrimaryContainer: COLOR_SETTINGS.PRIMARY } }}
      />
    </View>
  );
}
