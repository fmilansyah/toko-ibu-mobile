import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AccountDetailsStyle from '../styles/AccountDetails.style';
import globalStyle from '../styles/global.style';
import Feather from 'react-native-vector-icons/Feather';

export default function ProductByCategory({ navigation }) {
  return (
    <View style={AccountDetailsStyle.container}>
      <View style={AccountDetailsStyle.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <View>
          <Text style={AccountDetailsStyle.appName}>Pengaturan Akun</Text>
        </View>
      </View>
    </View>
  );
}
