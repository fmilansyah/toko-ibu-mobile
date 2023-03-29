import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ToastAndroid,
} from 'react-native';
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductInfoStyle from '../styles/ProductInfo.style';
import { COLOR_SETTINGS } from '../database/AppData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sliderWidth } from '../styles/global.style';
import { rupiahFormatter } from '../helpers/formatter';

const ProductInfo = ({ route, navigation }) => {
  const { productID } = route.params;

  const [product, setProduct] = useState({});

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

  const getDataFromDB = async () => {
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id == productID) {
        await setProduct(Items[index]);
        return;
      }
    }
  };

  //add to cart

  const addToCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Item Added Successfully to cart',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Item Added Successfully to cart',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
  };

  const renderProductImage = ({ item }) => {
    return (
      <View style={ProductInfoStyle.imageContainer}>
        <Image source={item} style={ProductInfoStyle.productImage} />
      </View>
    );
  };

  return (
    <View style={ProductInfoStyle.container}>
      <ScrollView>
        <View style={ProductInfoStyle.productImageContainer}>
          <View style={ProductInfoStyle.backContainer}>
            <TouchableOpacity
              style={ProductInfoStyle.backBtn}
              onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={ProductInfoStyle.backBtnIcon}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={product?.productImageList ?? null}
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
          <View style={ProductInfoStyle.productIndicatorContainer}>
            {product?.productImageList
              ? product?.productImageList?.map((data, index) => {
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
              {product?.category}
            </Text>
          </View>
          <View style={ProductInfoStyle.productNameContainer}>
            <Text style={ProductInfoStyle.productName}>
              {product?.productName}
            </Text>
          </View>
          <View style={ProductInfoStyle.productPriceContainer}>
            <Text style={ProductInfoStyle.productPrice}>
              {rupiahFormatter(product.productPrice)}
            </Text>
            {product?.isOff && (
              <>
                <Text style={ProductInfoStyle.productPriceOffPercent}>
                  {product?.offPercentage}%
                </Text>
                <Text style={ProductInfoStyle.productPriceOffNominal}>
                  {rupiahFormatter(2500)}
                </Text>
              </>
            )}
          </View>
          <Text style={ProductInfoStyle.productDescription}>
            {product?.description}
          </Text>
        </View>
      </ScrollView>

      <View style={ProductInfoStyle.addToCartContainer}>
        <TouchableOpacity
          onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          style={[
            ProductInfoStyle.addToCartBtn,
            {
              backgroundColor: product?.isAvailable
                ? COLOR_SETTINGS.PRIMARY
                : COLOR_SETTINGS.GRAY,
            },
          ]}>
          <MaterialCommunityIcons
            name="plus"
            style={ProductInfoStyle.addToCartIcon}
          />
          <Text style={ProductInfoStyle.addToCartLabel}>
            {product.isAvailable ? 'Keranjang' : 'Stok Habis'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;
