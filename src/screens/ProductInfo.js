import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ToastAndroid,
  Linking,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductInfoStyle from '../styles/ProductInfo.style';
import { COLOR_SETTINGS, WA_NUMBER } from '../database/AppData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sliderWidth } from '../styles/global.style';
import { rupiahFormatter } from '../helpers/formatter';
import api from '../config/api';
import { nominalDiscount } from '../helpers/math';
import { VariantItem } from '../components/Product';
import ImageView from 'react-native-image-viewing';

const ProductInfo = ({ route, navigation }) => {
  const { kd_barang, kd_detail_barang } = route.params;

  const [product, setProduct] = useState(null);
  const [detailProduct, setDetailProduct] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState([]);
  const [imageViewer, setImageViewer] = useState({
    currentIndex: 0,
    visible: false,
  });

  const width = Dimensions.get('window').width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get product data by productID

  const getDataFromDB = () => {
    const formData = new FormData();
    formData.append('kd_barang', kd_barang);
    api
      .post('/getdetailbarang', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        setProduct(data?.barang);
        setFiles(data?.file_barang);
        setDetailProduct(data?.detail_barang);
        setCategory(data?.kategori_barang);

        const newSelectedDetail = data?.detail_barang.find(
          obj => obj.kd_detail_barang === kd_detail_barang,
        );
        setSelectedDetail(newSelectedDetail);
      });
  };

  const addToCart = async (redirect = false) => {
    let userData = await AsyncStorage.getItem('user_data');
    if (userData !== null) {
      const user = JSON.parse(userData);
      const formData = new FormData();
      formData.append('kd_user', user.kd_user);
      formData.append('kd_detail_barang', selectedDetail?.kd_detail_barang);
      formData.append('jumlah_barang', 1);
      formData.append(
        'harga_barang',
        nominalDiscount(selectedDetail?.harga, product?.diskon).afterDiscount,
      );
      await api
        .post('/tambahkeranjang', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(() => {
          if (redirect) {
            if (user?.biteship_area_id) {
              navigation.navigate('MyCart');
            } else {
              ToastAndroid.show(
                'Harap lengkapi data diri terlebih dahulu',
                ToastAndroid.SHORT,
              );
              navigation.navigate('AccountDetails');
            }
          } else {
            ToastAndroid.show(
              'Produk Berhasil Ditambahkan Ke Keranjang',
              ToastAndroid.SHORT,
            );
          }
        })
        .catch(() =>
          ToastAndroid.show(
            'Gagal Menambahkan Produk Ke Keranjang',
            ToastAndroid.SHORT,
          ),
        );
    } else {
      await navigation.navigate('SignIn');
    }
  };

  const renderProductImage = ({ item }, index) => {
    return (
      <TouchableOpacity
        style={ProductInfoStyle.imageContainer}
        onPress={() => setImageViewer({ currentIndex: index, visible: true })}>
        <Image
          source={{ uri: item?.file }}
          style={ProductInfoStyle.productImage}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={ProductInfoStyle.container}>
      <ScrollView>
        <View style={ProductInfoStyle.productImageContainer}>
          <View style={ProductInfoStyle.backContainer}>
            <TouchableOpacity
              style={ProductInfoStyle.backBtn}
              onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" style={ProductInfoStyle.backBtnIcon} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={files ?? null}
            horizontal
            renderItem={renderProductImage}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={sliderWidth}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false },
            )}
          />
          <ImageView
            images={files.map(data => ({ uri: data?.file }))}
            imageIndex={imageViewer.currentIndex}
            visible={imageViewer.visible}
            onRequestClose={() =>
              setImageViewer({ currentIndex: 0, visible: false })
            }
          />
          <View style={ProductInfoStyle.productIndicatorContainer}>
            {files
              ? files?.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={[
                        ProductInfoStyle.productIndicator,
                        {
                          opacity,
                        },
                      ]}
                    />
                  );
                })
              : null}
          </View>
        </View>

        <View style={ProductInfoStyle.productDescContainer}>
          <View style={ProductInfoStyle.productCategory}>
            <Text style={ProductInfoStyle.productCategoryName}>
              {category?.nama}
            </Text>
          </View>
          <View style={ProductInfoStyle.productNameContainer}>
            <Text style={ProductInfoStyle.productName}>{product?.nama}</Text>
          </View>
          <View style={ProductInfoStyle.productPriceContainer}>
            <Text style={ProductInfoStyle.productPrice}>
              {rupiahFormatter(
                nominalDiscount(selectedDetail?.harga, product?.diskon)
                  .afterDiscount,
              )}
            </Text>
            {product?.diskon !== null && product?.diskon > 0 && (
              <>
                <Text style={ProductInfoStyle.productPriceOffPercent}>
                  {product?.diskon}%
                </Text>
                <Text style={ProductInfoStyle.productPriceOffNominal}>
                  {rupiahFormatter(selectedDetail?.harga)}
                </Text>
              </>
            )}
          </View>
          <View style={ProductInfoStyle.productVariant}>
            <View style={ProductInfoStyle.productVariantTitleContainer}>
              <Text style={ProductInfoStyle.productVariantTitle}>
                Pilih Varian :
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {detailProduct.map((item, j) => (
                <VariantItem
                  key={j}
                  data={item}
                  isLastItem={j === detailProduct.length - 1}
                  isFirstItem={j === 0}
                  isSelected={
                    item?.kd_detail_barang === selectedDetail?.kd_detail_barang
                  }
                  onPress={data => setSelectedDetail(data)}
                />
              ))}
            </ScrollView>
            <View style={ProductInfoStyle.productVariantTitleContainer}>
              <Text style={ProductInfoStyle.productStock}>
                Stok : {selectedDetail?.stok}
              </Text>
            </View>
          </View>
          <Text style={ProductInfoStyle.productDescription}>
            {product?.deskripsi}
          </Text>
        </View>
      </ScrollView>

      <View style={ProductInfoStyle.addToCartContainer}>
        <TouchableOpacity
          onPress={() => (selectedDetail?.stok > 0 ? addToCart() : null)}
          style={ProductInfoStyle.buyNowBtn}>
          <MaterialCommunityIcons
            name="cart"
            style={[
              ProductInfoStyle.addToCartIcon,
              {
                marginRight: 0,
                color: COLOR_SETTINGS.PRIMARY,
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => (selectedDetail?.stok > 0 ? addToCart(true) : null)}
          style={[
            ProductInfoStyle.addToCartBtn,
            {
              backgroundColor:
                selectedDetail?.stok > 0
                  ? COLOR_SETTINGS.PRIMARY
                  : COLOR_SETTINGS.GRAY,
            },
          ]}>
          <MaterialCommunityIcons
            name="wallet-plus-outline"
            style={ProductInfoStyle.addToCartIcon}
          />
          <Text style={ProductInfoStyle.addToCartLabel}>
            {selectedDetail?.stok > 0 ? 'Beli Sekarang' : 'Stok Habis'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `https://wa.me/${WA_NUMBER}?text=Halo saya memiliki pertanyaan untuk produk ${product?.nama}`,
            )
          }
          style={[
            ProductInfoStyle.buyNowBtn,
            {
              marginRight: 0,
              marginLeft: 5,
            },
          ]}>
          <MaterialCommunityIcons
            name="whatsapp"
            style={[
              ProductInfoStyle.addToCartIcon,
              {
                marginRight: 0,
                color: COLOR_SETTINGS.PRIMARY,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;
