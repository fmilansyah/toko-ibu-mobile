import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { COLOR_SETTINGS } from '../../database/AppData';
import ProductItemStyle from '../../styles/ProductItem.style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { marginContainer } from '../../styles/global.style';

const ProductCard = ({ data, isLastItem = false }) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        style={[
          ProductItemStyle.productBox,
          {
            marginRight: isLastItem ? marginContainer : 0,
          },
        ]}>
        <View style={ProductItemStyle.productImageContainer}>
          {data.isOff ? (
            <View style={ProductItemStyle.productDisc}>
              <Text style={ProductItemStyle.productDiscPercent}>
                {data.offPercentage}%
              </Text>
            </View>
          ) : null}
          <Image
            source={data.productImage}
            style={ProductItemStyle.productImage}
          />
        </View>
        <Text style={ProductItemStyle.productName}>{data.productName}</Text>
        <View style={ProductItemStyle.productStockContainer}>
          <FontAwesome
            name="circle"
            style={[
              ProductItemStyle.productStockStatus,
              {
                marginRight: 6,
                color: COLOR_SETTINGS.GREEN,
              },
            ]}
          />
          <Text
            style={[
              ProductItemStyle.productStockStatus,
              {
                color: COLOR_SETTINGS.GREEN,
              },
            ]}>
            {data?.isAvailable ? 'Masih Ada' : 'Stok Habis'}
          </Text>
        </View>
        <Text>Rp. {data.productPrice}</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default ProductCard;
