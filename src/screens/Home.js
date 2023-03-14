import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLOURS, Items } from '../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
                backgroundColor: COLOURS.green,
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Text style={styles.accountLink}>Hai, Febri Milansyah</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
            <MaterialCommunityIcons name="cart" style={styles.iconBtn} />
          </TouchableOpacity>
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
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
  },
  heroContainer: {
    marginBottom: 10,
    padding: 16,
  },
  homeAppDescription: {
    fontSize: 14,
    color: COLOURS.black,
    fontWeight: '400',
    letterSpacing: 1,
    lineHeight: 24,
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
    color: COLOURS.blue,
    fontWeight: '400',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default Home;
