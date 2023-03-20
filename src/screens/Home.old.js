import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Dimensions,
} from 'react-native';
import { SliderItem, Text } from '../components/Basic';
import { COLOURS, Items, SliderData } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { APP_NAME, COLOR_SETTINGS } from '../database/AppData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Carousel } from 'react-native-snap-carousel-v4';

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
const slideWidth = wp(75);
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const renderSliderItem = ({ item, index }, parallaxProps) => {
  return (
    <SliderItem
      data={item}
      even={(index + 1) % 2 === 0}
      parallax={true}
      parallaxProps={parallaxProps}
    />
  );
};

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);

  //get called on screen loads
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from DB

  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == 'product') {
        productList.push(Items[index]);
      } else if (Items[index].category == 'accessory') {
        accessoryList.push(Items[index]);
      }
    }

    setProducts(productList);
    setAccessory(accessoryList);
  };

  //create an product reusable card

  const ProductCard = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductInfo', { productID: data.id })
        }
        style={{
          width: '48%',
          marginVertical: 14,
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          {data.isOff ? (
            <View
              style={{
                position: 'absolute',
                width: '20%',
                height: '24%',
                backgroundColor: COLOR_SETTINGS.PRIMARY,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.white,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>
                {data.offPercentage}%
              </Text>
            </View>
          ) : null}
          <Image
            source={data.productImage}
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}>
          {data.productName}
        </Text>
        {data.category == 'accessory' ? (
          data.isAvailable ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.green,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.green,
                }}>
                Available
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.red,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.red,
                }}>
                Unavailable
              </Text>
            </View>
          )
        ) : null}
        <Text>Rp. {data.productPrice}</Text>
      </TouchableOpacity>
    );
  };

  const [clicked, setClicked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Feather name="search" style={styles.iconBtn} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.appName}>{APP_NAME}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="log-in" style={styles.roundedBtn} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Carousel
            data={SliderData}
            renderItem={renderSliderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            hasParallaxImages={true}
            firstItem={1}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            // inactiveSlideShift={20}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
            loop={true}
            loopClonesPerSide={2}
            autoplay={true}
            autoplayDelay={4000}
            autoplayInterval={7000}
            // onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
          />
        </View>
      </ScrollView>
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.searchBar}>
            <Feather name="search" size={20} color={COLOR_SETTINGS.GRAY} />
            <TextInput style={styles.inputSearch} placeholder="Cari Produk" />
          </View>
          <View style={styles.accountMenu}>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={35}
              color={COLOR_SETTINGS.WHITE}
            />
          </View>
        </View>
        <View style={styles.heroContainer}>
          <Text style={styles.homeAppTitle}>Toko Ibu</Text>
          <Text style={styles.homeAppDescription}>
            In do laborum reprehenderit deserunt ex officia consectetur
            excepteur quis veniam.
          </Text>
        </View>
        <View style={styles.paddingContainer}>
          <View style={styles.categories}>
            <View style={styles.categoryTitle}>
              <Text style={styles.categoryName}>Fashion</Text>
              <Text style={styles.countProduct}>41</Text>
            </View>
            <Text style={styles.showAll}>Lihat Semua</Text>
          </View>
          <View style={styles.productList}>
            {products.map(data => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  paddingContainer: {
    padding: 16,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOURS.white,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  appName: {
    fontSize: 22,
    color: COLOR_SETTINGS.BLACK,
  },
  iconBtn: {
    fontSize: 22,
    color: COLOR_SETTINGS.BLACK,
  },
  roundedBtn: {
    fontSize: 22,
    color: COLOR_SETTINGS.WHITE,
    backgroundColor: COLOR_SETTINGS.PRIMARY,
    padding: 10,
    borderRadius: 100,
  },
  homeAppTitle: {
    fontSize: 26,
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 10,
    fontFamily: 'OpenSans-SemiBold',
  },
  heroContainer: {
    marginBottom: 10,
    padding: 16,
  },
  homeAppDescription: {
    fontSize: 14,
    color: COLOURS.black,
    // fontWeight: '400',
    lineHeight: 24,
    fontFamily: 'Montserrat-Regular',
  },
  categories: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 18,
    color: COLOURS.black,
    fontWeight: '500',
    letterSpacing: 1,
  },
  countProduct: {
    fontSize: 14,
    color: COLOURS.black,
    fontWeight: '400',
    opacity: 0.5,
    marginLeft: 10,
  },
  showAll: {
    fontSize: 14,
    color: COLOR_SETTINGS.PRIMARY,
    fontWeight: '400',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    alignItems: 'center',
  },
  slider: {
    marginTop: 15,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10, // for custom animation
  },
});

export default Home;
