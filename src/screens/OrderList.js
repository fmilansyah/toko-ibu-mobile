import React from 'react';
import { Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import OrderListStyle from '../styles/OrderList.style';
import globalStyle from '../styles/global.style';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { rupiahFormatter } from '../helpers/formatter';
import { Items } from '../database/Database';

export default function OrderList({ navigation }) {
  const data = Items[0];
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
            <View style={globalStyle.flex}>
              <Text style={OrderListStyle.headerTitle}>Belanja</Text>
              <Text style={OrderListStyle.headerDate}>03 Apr 2023</Text>
            </View>
            <View style={globalStyle.flex}>
              <TouchableOpacity>
                <Entypo
                  name="dots-three-vertical"
                  style={OrderListStyle.moreBtn}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={OrderListStyle.bodyCard}>
            <TouchableOpacity style={OrderListStyle.productContainer}>
              <View style={OrderListStyle.productImageContainer}>
                <Image
                  source={{ uri: data?.productImage }}
                  style={OrderListStyle.productImage}
                />
              </View>
              <View style={OrderListStyle.productDetailContainer}>
                <View>
                  <Text style={OrderListStyle.productName}>
                    {data?.productName}
                  </Text>
                  <View style={OrderListStyle.productPriceContainer}>
                    <Text style={OrderListStyle.productPrice}>
                      2x {rupiahFormatter(data?.productPrice)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <Text style={OrderListStyle.productPrice}>+3 produk lainnya</Text>
          </View>
          <View style={OrderListStyle.footerCard}>
            <View style={globalStyle.flex}>
              <Text style={OrderListStyle.footerTitle}>Total Belanja</Text>
              <Text style={OrderListStyle.footerNominal}>
                {rupiahFormatter(120000)}
              </Text>
            </View>
            <View style={globalStyle.flex}>
              <Text style={OrderListStyle.successLabel}>Selesai</Text>
            </View>
          </View>
        </View>

        <View style={OrderListStyle.card}>
          <View style={OrderListStyle.headerCard}>
            <View style={globalStyle.flex}>
              <Text style={OrderListStyle.headerTitle}>Belanja</Text>
              <Text style={OrderListStyle.headerDate}>03 Mei 2023</Text>
            </View>
            <View style={globalStyle.flex}>
              <TouchableOpacity>
                <Entypo
                  name="dots-three-vertical"
                  style={OrderListStyle.moreBtn}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={OrderListStyle.bodyCard}>
            <TouchableOpacity style={OrderListStyle.productContainer}>
              <View style={OrderListStyle.productImageContainer}>
                <Image
                  source={{ uri: data?.productImage }}
                  style={OrderListStyle.productImage}
                />
              </View>
              <View style={OrderListStyle.productDetailContainer}>
                <View>
                  <Text style={OrderListStyle.productName}>
                    {data?.productName}
                  </Text>
                  <View style={OrderListStyle.productPriceContainer}>
                    <Text style={OrderListStyle.productPrice}>
                      2x {rupiahFormatter(data?.productPrice)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={OrderListStyle.footerCard}>
            <View style={globalStyle.flex}>
              <Text style={OrderListStyle.footerTitle}>Total Belanja</Text>
              <Text style={OrderListStyle.footerNominal}>
                {rupiahFormatter(120000)}
              </Text>
            </View>
            <View style={globalStyle.flex}>
              <Text style={OrderListStyle.warningLabel}>Dikirim</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
