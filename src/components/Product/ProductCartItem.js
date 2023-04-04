import { TouchableOpacity, View, Image, Text } from 'react-native';
import ProductCartItemStyle from '../../styles/ProductCartItem.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { rupiahFormatter } from '../../helpers/formatter';

const ProductCartItem = ({ data }) => {
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
          <Text style={ProductCartItemStyle.productName}>
            {data?.productName}
          </Text>
          <View style={ProductCartItemStyle.productPriceContainer}>
            <Text style={ProductCartItemStyle.productPrice}>
              {rupiahFormatter(data?.productPrice)}
            </Text>
          </View>
        </View>
        <View style={ProductCartItemStyle.productActionContainer}>
          <View style={ProductCartItemStyle.productQtyContainer}>
            <View style={ProductCartItemStyle.productQtyActionMin}>
              <MaterialCommunityIcons
                name="minus"
                style={ProductCartItemStyle.productQtyActionIcon}
              />
            </View>
            <Text style={{ fontSize: 14 }}>1</Text>
            <View style={ProductCartItemStyle.productQtyActionPlus}>
              <MaterialCommunityIcons
                name="plus"
                style={ProductCartItemStyle.productQtyActionIcon}
              />
            </View>
          </View>
          <TouchableOpacity>
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
