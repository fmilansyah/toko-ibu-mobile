import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
// import { COLOR_SETTINGS } from '../../database/AppData';
import ProductItemStyle from '../../styles/ProductItem.style';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { marginContainer } from '../../styles/global.style';
import { rupiahFormatter } from '../../helpers/formatter';
import { useNavigation } from '@react-navigation/native';
import { nominalDiscount } from '../../helpers/math';

const ProductCard = ({ data, isLastItem = false }) => {
  const navigation = useNavigation();
  return (
    <React.Fragment>
      <TouchableOpacity
        style={[
          ProductItemStyle.productBox,
          {
            marginRight: isLastItem ? marginContainer : 0,
          },
        ]}
        onPress={() =>
          navigation.navigate('ProductInfo', {
            kd_barang: data?.kd_barang,
            kd_detail_barang: data?.kd_detail_barang,
          })
        }>
        <View style={ProductItemStyle.productImageContainer}>
          {data.diskon ? (
            <View style={ProductItemStyle.productDisc}>
              <Text style={ProductItemStyle.productDiscPercent}>
                {data.diskon}%
              </Text>
            </View>
          ) : null}
          <Image
            source={{ uri: data?.file }}
            style={ProductItemStyle.productImage}
          />
        </View>
        <View style={ProductItemStyle.productInfo}>
          <Text style={ProductItemStyle.productName}>
            {data?.nama} - {data?.varian}
          </Text>
          <View style={ProductItemStyle.productStockContainer}>
            {/* <FontAwesome
              name="circle"
              style={[
                ProductItemStyle.productStockStatus,
                {
                  marginRight: 6,
                  color: data?.isAvailable
                    ? COLOR_SETTINGS.GREEN
                    : COLOR_SETTINGS.RED,
                },
              ]}
            />
            <Text
              style={[
                ProductItemStyle.productStockStatus,
                {
                  color: data?.isAvailable
                    ? COLOR_SETTINGS.GREEN
                    : COLOR_SETTINGS.RED,
                },
              ]}>
              {data?.isAvailable ? 'Masih Ada' : 'Stok Habis'}
            </Text> */}
          </View>
          <Text style={ProductItemStyle.productPrice}>
            {data?.diskon
              ? rupiahFormatter(
                  nominalDiscount(data?.harga, data?.diskon).afterDiscount,
                )
              : rupiahFormatter(data?.harga)}
          </Text>
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default ProductCard;
