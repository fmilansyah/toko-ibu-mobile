import React from 'react';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PAYMENT_LINK } from '../config/app';

const PaymentView = ({ route }) => {
  const { token } = route.params;
  const [isLoading, setLoading] = React.useState(true);

  console.log(PAYMENT_LINK + token)

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
