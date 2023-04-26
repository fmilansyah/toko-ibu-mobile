import { TouchableOpacity, View, Image, Text } from 'react-native';
import ProductCartItemStyle from '../../styles/ProductCartItem.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { rupiahFormatter } from '../../helpers/formatter';

const ProductCartItem = ({ data, onDelete, onUpdateQty }) => {
  return (
    <TouchableOpacity style={ProductCartItemStyle.productContainer}>
      <View style={ProductCartItemStyle.productImageContainer}>
        <Image
          source={{ uri: data?.productImage }}
          style={ProductCartItemStyle.productImage}
        />
      </View>
      <View style={ProductCartItemStyle.productDetailContainer}>
        <View>
          <Text style={ProductCartItemStyle.productName}>{data?.nama}</Text>
          <View style={ProductCartItemStyle.productPriceContainer}>
            <Text style={ProductCartItemStyle.productPrice}>
              {rupiahFormatter(data?.harga_total)}
            </Text>
          </View>
        </View>
        <View style={ProductCartItemStyle.productActionContainer}>
          <View style={ProductCartItemStyle.productQtyContainer}>
            <TouchableOpacity
              onPress={() =>
                data?.jumlah_barang < 2
                  ? onDelete(data?.kd_keranjang)
                  : onUpdateQty(data?.kd_detail_barang, -1)
              }
              style={ProductCartItemStyle.productQtyActionMin}>
              <MaterialCommunityIcons
                name="minus"
                style={ProductCartItemStyle.productQtyActionIcon}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 14 }}>{data?.jumlah_barang}</Text>
            <TouchableOpacity
              onPress={() => onUpdateQty(data?.kd_detail_barang, 1)}
              style={ProductCartItemStyle.productQtyActionPlus}>
              <MaterialCommunityIcons
                name="plus"
                style={ProductCartItemStyle.productQtyActionIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => onDelete(data?.kd_keranjang)}>
            <MaterialCommunityIcons
              name="delete-outline"
              style={ProductCartItemStyle.productDeleteIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCartItem;
