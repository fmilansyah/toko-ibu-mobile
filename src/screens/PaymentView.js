import React from 'react';
import { WebView } from 'react-native-webview';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  BackHandler,
} from 'react-native';
import { PAYMENT_LINK } from '../config/app';
import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentView = ({ route, navigation }) => {
  const { token, order } = route.params;
  const [isLoading, setLoading] = React.useState(true);
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    getUser();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const getUser = async () => {
    let newUserData = await AsyncStorage.getItem('user_data');
    if (newUserData !== null) {
      const user = JSON.parse(newUserData);
      setUserData(user);
    }
  };

  const receiveMessage = data => {
    if (
      data.nativeEvent.data === 'success' ||
      data.nativeEvent.data === 'pending' ||
      data.nativeEvent.data === 'close'
    ) {
      const formData = new FormData();
      formData.append('kd_user', userData?.kd_user);
      formData.append('orders', order);
      formData.append('jenis_order', 'keranjang');
      formData.append('jasa_pengiriman', 'JNE');
      formData.append('jenis_pengiriman', 'Regular');
      if (data.nativeEvent.data === 'pending') {
        formData.append('midtrans_token', token);
      }
      api
        .post('/orderbarang', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
          ToastAndroid.show('Pemesanan Berhasil', ToastAndroid.SHORT);
        })
        .catch(() => {
          ToastAndroid.show('Pemesanan Gagal', ToastAndroid.SHORT);
          navigation.goBack();
        });
    } else {
      ToastAndroid.show('Pemesanan Gagal', ToastAndroid.SHORT);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.wrapper}>
      <WebView
        source={{ uri: PAYMENT_LINK + token }}
        onLoad={() => setLoading(false)}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        domStorageEnabled={true}
        cacheEnabled={true}
        allowFileAccessFromFileURLs={true}
        allowFileAccess={true}
        cacheMode="LOAD_NO_CACHE"
        onMessage={receiveMessage}
      />
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    right: 0,
    left: 0,
  },
});

export default PaymentView;
