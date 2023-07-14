import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, TextInput, FlatList } from 'react-native';
import globalStyle from '../styles/global.style';
import Feather from 'react-native-vector-icons/Feather';
import api from '../config/api';
import SearchProductStyle from '../styles/SearchProduct.style';
import { ProductItem } from '../components/Product';

export default function SearchProduct({ navigation }) {
  const [search, setSearch] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProducts();
    });

    return unsubscribe;
  }, [navigation]);

  const handleSearchProduct = () => {
    getProducts();
  };

  const renderProducts = ({ item, index }) => {
    return (
      <View style={SearchProductStyle.productContainer}>
        <ProductItem
          key={index}
          vertical={true}
          data={item}
          isLastItem={false}
        />
      </View>
    );
  };

  const getProducts = () => {
    const params = {
      search: search ?? '',
    };
    api
      .get('/getbarangterbaru', { params })
      .then(({ data }) => setProducts(data?.Barang ?? []));
  };

  return (
    <View style={SearchProductStyle.container}>
      <View style={SearchProductStyle.headerContainer}>
        <TouchableOpacity
          style={SearchProductStyle.iconContainer}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <View style={SearchProductStyle.searchBox}>
          <TextInput
            style={SearchProductStyle.searchInput}
            placeholder="Cari Produk"
            returnKeyType="search"
            value={search}
            onChangeText={text => setSearch(text)}
            onSubmitEditing={() => handleSearchProduct()}
          />
        </View>
      </View>
      <View>
        <FlatList data={products} numColumns={2} renderItem={renderProducts} />
      </View>
    </View>
  );
}
