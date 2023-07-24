import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, FlatList } from 'react-native';
import ProductByCategoryStyle from '../styles/ProductByCategory.style';
import globalStyle from '../styles/global.style';
import Feather from 'react-native-vector-icons/Feather';
import api from '../config/api';
import { ProductItem } from '../components/Product';
import Loading from './Loading';

export default function ProductByCategory({ route, navigation }) {
  const { id, name } = route.params;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProductByCategory();
    });

    return unsubscribe;
  }, [navigation]);

  const getProductByCategory = () => {
    const params = {
      kd_kategori: id,
    };
    setLoading(true);
    api.get('/getdatabarangperkategori', { params }).then(({ data }) => {
      setLoading(false);
      setProducts(data?.Barang ?? []);
    });
  };

  const renderProducts = ({ item, index }) => {
    return (
      <View style={ProductByCategoryStyle.productContainer}>
        <ProductItem
          key={index}
          vertical={true}
          data={item}
          isLastItem={false}
        />
      </View>
    );
  };

  return (
    <View style={ProductByCategoryStyle.container}>
      <View style={ProductByCategoryStyle.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <View>
          <Text style={ProductByCategoryStyle.appName}>{name}</Text>
        </View>
      </View>
      <View style={ProductByCategoryStyle.productList}>
        {loading ? (
          <View style={{ paddingVertical: 16 }}>
            <Loading />
          </View>
        ) : (
          <FlatList
            data={products}
            numColumns={2}
            renderItem={renderProducts}
          />
        )}
      </View>
    </View>
  );
}
