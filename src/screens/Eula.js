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
import { API_URL, PAYMENT_LINK } from '../config/app';
import api from '../config/api';
import { STATUS_ORDER } from '../database/AppData';

const Eula = () => {
  const [isLoading, setLoading] = React.useState(true);

  return (
    <View style={styles.wrapper}>
      <WebView
        source={{ uri: API_URL + '/eula' }}
        onLoad={() => setLoading(false)}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        domStorageEnabled={true}
        cacheEnabled={true}
        allowFileAccessFromFileURLs={true}
        allowFileAccess={true}
        cacheMode="LOAD_NO_CACHE"
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

export default Eula;
