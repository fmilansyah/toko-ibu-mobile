import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { COLOR_SETTINGS } from '../../database/AppData';
import ProductItemStyle from '../../styles/ProductItem.style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { marginContainer } from '../../styles/global.style';
import { rupiahFormatter } from '../../helpers/formatter';
import { useNavigation } from '@react-navigation/native';

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
          navigation.navigate('ProductInfo', { productID: data.id })
        }>
        <View style={ProductItemStyle.productImageContainer}>
          {data.isOff ? (
            <View style={ProductItemStyle.productDisc}>
              <Text style={ProductItemStyle.productDiscPercent}>
                {data.offPercentage}%
              </Text>
            </View>
          ) : null}
          <Image
            source={{ uri: data.productImage }}
            style={ProductItemStyle.productImage}
          />
        </View>
        <View style={ProductItemStyle.productInfo}>
          <Text style={ProductItemStyle.productName}>{data.productName}</Text>
          <View style={ProductItemStyle.productStockContainer}>
            <FontAwesome
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
            </Text>
          </View>
          <Text style={ProductItemStyle.productPrice}>
            {rupiahFormatter(data?.productPrice)}
          </Text>
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default ProductCard;
