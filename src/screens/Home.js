import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import { SliderItem } from '../components/Basic';
import Feather from 'react-native-vector-icons/Feather';
import globalStyle, { itemWidth, sliderWidth } from '../styles/global.style';
import HomeStyle from '../styles/Home.style';
import { Carousel } from 'react-native-snap-carousel-v4';
import { CategoryItem } from '../components/Category';
import { ProductItem } from '../components/Product';
import api from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';

const renderSliderItem = (item, navigation) => {
  return (
    <SliderItem
      data={item}
      onPress={() => {
        navigation.navigate('ProductInfo', {
          kd_barang: item?.kd_barang,
          kd_detail_barang: item?.kd_detail_barang,
        });
      }}
    />
  );
};

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [categoryAndItem, setCategoryAndItem] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastItem, setLastItem] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCategories();
      getCategoryAndItem();
      getUserData();
      getLastItem();
    });

    return unsubscribe;
  }, [navigation]);

  const getLastItem = () => {
    api.get('/getbarangterbaru').then(({ data }) =>
      setLastItem(
        data?.Barang
          ? data?.Barang.filter(
              obj => obj.file !== null && obj.file !== undefined,
            ).map(item => ({
              illustration: item.file,
              kd_barang: item.kd_barang,
              kd_detail_barang: item.kd_detail_barang,
            }))
          : [],
      ),
    );
  };

  const getCategories = () => {
    api
      .get('/getkategori')
      .then(({ data }) => setCategories(data?.Kategori ?? []));
  };

  const getCategoryAndItem = () => {
    setLoading(true);
    api.get('/getkategoridanbarang').then(({ data }) => {
      setLoading(false);
      setCategoryAndItem(data?.Kategori ?? []);
    });
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (userData !== null) {
        setLoggedIn(true);
      }
    } catch (e) {
      setLoggedIn(false);
    }
  };

  const renderCategories = ({ item, index }) => {
    return (
      <CategoryItem
        key={index}
        data={item}
        isLastItem={index === categories.length - 1}
      />
    );
  };

  const renderCategoryProduct = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{ marginBottom: index === categoryAndItem.length - 1 ? 16 : 0 }}>
        <View
          style={[
            globalStyle.paddingContainer,
            HomeStyle.categoryNameContainer,
          ]}>
          <View style={HomeStyle.sectionTitleContainer}>
            <Text style={HomeStyle.sectionTitle}>{item?.nama}</Text>
            <Text style={HomeStyle.sectionCount}>{item?.jml_barang}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductByCategory', {
                id: item?.kd_kategori,
                name: item?.nama,
              })
            }>
            <Text style={HomeStyle.sectionShowAll}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={item?.barang ?? []}
          horizontal
          renderItem={e => renderProducts(e, item?.barang.length)}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderProducts = ({ item, index }, totalItem) => {
    return (
      <ProductItem
        key={index}
        data={item}
        isLastItem={index === totalItem - 1}
      />
    );
  };

  const renderHead = () => {
    return (
      <View>
        <View>
          <Carousel
            data={lastItem}
            renderItem={({ item }) => renderSliderItem(item, navigation)}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            containerCustomStyle={HomeStyle.slider}
            inactiveSlideScale={0.95}
            loop={true}
            autoplay={true}
            autoplayDelay={4000}
            autoplayInterval={7000}
          />
        </View>

        <View>
          <View style={globalStyle.paddingContainer}>
            <View style={HomeStyle.sectionTitleContainer}>
              <Text style={HomeStyle.sectionTitle}>Kategori</Text>
            </View>
          </View>
          <FlatList
            data={categories}
            horizontal
            renderItem={renderCategories}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={globalStyle.container}>
      <View style={HomeStyle.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SearchProduct')}>
          <Feather name="search" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <View>
          <Image
            source={require('../../assets/images/logo.png')}
            style={HomeStyle.logo}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(loggedIn ? 'OrderList' : 'SignIn')
          }>
          <Feather
            name={loggedIn ? 'user' : 'log-in'}
            style={globalStyle.roundedBtn}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ paddingVertical: 16 }}>
          <Loading />
        </View>
      ) : (
        <FlatList
          data={categoryAndItem}
          renderItem={renderCategoryProduct}
          ListHeaderComponent={renderHead}
        />
      )}
      {/* <Footer /> */}
    </View>
  );
};

export default Home;

export function Footer() {
  return (
    <View>
      <Text>2023</Text>
    </View>
  );
}
