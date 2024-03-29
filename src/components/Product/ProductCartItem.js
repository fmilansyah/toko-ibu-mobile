import { TouchableOpacity, View, Image, Text } from 'react-native';
import ProductCartItemStyle from '../../styles/ProductCartItem.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { rupiahFormatter } from '../../helpers/formatter';
import { COLOR_SETTINGS } from '../../database/AppData';

const ProductCartItem = ({ data, onDelete, onUpdateQty }) => {
  return (
    <View style={ProductCartItemStyle.productContainer}>
      <View style={ProductCartItemStyle.productImageContainer}>
        <Image
          source={{ uri: data?.file }}
          style={ProductCartItemStyle.productImage}
        />
      </View>
      <View style={ProductCartItemStyle.productDetailContainer}>
        <View>
          <Text style={ProductCartItemStyle.productName}>
            {data?.nama} - {data?.varian}
          </Text>
          <View style={ProductCartItemStyle.productPriceContainer}>
            <Text style={ProductCartItemStyle.productPrice}>
              {rupiahFormatter(data?.harga_total)}
              {' | '}
              Berat : {(data?.berat_satuan * data?.jumlah_barang) / 1000} kg
            </Text>
          </View>
        </View>
        <View style={ProductCartItemStyle.productActionContainer}>
          <View style={ProductCartItemStyle.productQtyContainer}>
            {data?.stok > 0 ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    data?.jumlah_barang < 2
                      ? onDelete(data?.kd_detail_barang)
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
              </>
            ) : (
              <Text style={{ fontSize: 14, color: COLOR_SETTINGS.PRIMARY }}>
                Stok sudah habis
              </Text>
            )}
          </View>
          <TouchableOpacity onPress={() => onDelete(data?.kd_detail_barang)}>
            <MaterialCommunityIcons
              name="delete-outline"
              style={ProductCartItemStyle.productDeleteIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCartItem;
