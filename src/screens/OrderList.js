import React from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import OrderListStyle from '../styles/OrderList.style';
import globalStyle from '../styles/global.style';
import Feather from 'react-native-vector-icons/Feather';

export default function OrderList({ navigation }) {
  return (
    <View style={OrderListStyle.container}>
      <View style={OrderListStyle.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={OrderListStyle.appName}>Pesanan Saya</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={OrderListStyle.card}>
          <View style={OrderListStyle.headerCard}>
            <Text>Test</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
