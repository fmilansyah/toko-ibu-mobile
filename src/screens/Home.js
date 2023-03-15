import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from 'react-native';
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLOR_SETTINGS } from '../database/AppData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View
            style={
              true ? styles.searchBar__clicked : styles.searchBar__unclicked
            }>
            {/* search Icon */}
            <Feather
              name="search"
              size={20}
              color="black"
              style={{ marginLeft: 1 }}
            />
            {/* Input field */}
            <TextInput
              style={styles.input}
              placeholder="Search"
              onFocus={() => {
                setClicked(true);
              }}
            />
            {/* cross Icon, depending on whether the search bar is clicked or not */}
            {clicked && (
              <Entypo
                name="cross"
                size={20}
                color="black"
                style={{ padding: 1 }}
              />
            )}
          </View>
          {/* cancel button, depending on whether the search bar is clicked or not */}
          {clicked && (
            <View>
              <Button
                title="Cancel"
                onPress={() => {
                  Keyboard.dismiss();
                  setClicked(false);
                }}></Button>
            </View>
          )}
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
      </ScrollView>
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
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLOR_SETTINGS.PRIMARY,
  },
  // headerContainer: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   padding: 16,
  // },
  accountLink: {
    fontSize: 18,
    color: COLOURS.black,
    fontWeight: '600',
  },
  iconBtn: {
    fontSize: 18,
    color: COLOURS.backgroundDark,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOURS.backgroundLight,
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
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 14,
    marginLeft: 10,
    width: '90%',
    backgroundColor: COLOR_SETTINGS.WHITE,
    padding: 0,
  },
});

export default Home;
