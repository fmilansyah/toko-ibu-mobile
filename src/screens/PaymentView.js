import React from 'react';
import { WebView } from 'react-native-webview';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  BackHandler,
  Linking,
} from 'react-native';
import { PAYMENT_LINK } from '../config/app';
import api from '../config/api';
import { STATUS_ORDER } from '../database/AppData';

const PaymentView = ({ route, navigation }) => {
  const { token, kd_order } = route.params;
  console.log(token)
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const receiveMessage = data => {
    if (data.nativeEvent.data === 'success') {
      const formData = new FormData();
      formData.append('kd_order', kd_order);
      formData.append('status_order', STATUS_ORDER.WAITING_FOR_CONFIRMATION);
      api
        .post('/updatestatusorder', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
          ToastAndroid.show('Pemesanan Berhasil', ToastAndroid.SHORT);
        })
        .catch(e => {
          ToastAndroid.show('Pembayaran Gagal', ToastAndroid.SHORT);
          navigation.goBack();
        });
    } else if (
      data.nativeEvent.data === 'pending' ||
      data.nativeEvent.data === 'close'
    ) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      ToastAndroid.show(
        'Harap segera selesaikan pembayaran',
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show('Pembayaran Gagal', ToastAndroid.SHORT);
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
        onNavigationStateChange={request => {
          const { url } = request;
          if (url.startsWith('https://gopay.co.id')) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
            ToastAndroid.show(
              'Harap segera selesaikan pembayaran',
              ToastAndroid.SHORT,
            );
            Linking.openURL(url);
          }
        }}
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
