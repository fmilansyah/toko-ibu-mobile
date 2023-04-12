import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { SliderItem } from '../components/Basic';
import { APP_NAME } from '../database/AppData';
import Feather from 'react-native-vector-icons/Feather';
import globalStyle, { itemWidth, sliderWidth } from '../styles/global.style';
import HomeStyle from '../styles/Home.style';
import { Carousel } from 'react-native-snap-carousel-v4';
import {
  MaleFashion,
  SliderData,
  Foods,
} from '../database/Database';
import { CategoryItem } from '../components/Category';
import { ProductItem } from '../components/Product';
import api from '../config/api';

const renderSliderItem = ({ item }) => {
  return <SliderItem data={item} />;
};

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
  }, []);

  const getCategories = () => {
    api
      .get('/getkategori')
      .then(({ data }) => setCategories(data?.Kategori ?? []));
  };

  return (
    <View style={globalStyle.container}>
      <View style={HomeStyle.headerContainer}>
        <TouchableOpacity>
          <Feather name="search" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={HomeStyle.appName}>{APP_NAME}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
          <Feather name="log-in" style={globalStyle.roundedBtn} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Carousel
            data={SliderData}
            renderItem={renderSliderItem}
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

        <View style={HomeStyle.sectionContainer}>
          <View style={globalStyle.paddingContainer}>
            <View style={HomeStyle.sectionTitleContainer}>
              <Text style={HomeStyle.sectionTitle}>Kategori</Text>
            </View>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categories.map((item, index) => (
              <CategoryItem
                key={index}
                data={item}
                isLastItem={index === categories.length - 1}
              />
            ))}
          </ScrollView>
        </View>

        <View style={HomeStyle.sectionContainer}>
          <View
            style={[
              globalStyle.paddingContainer,
              HomeStyle.categoryNameContainer,
            ]}>
            <View style={HomeStyle.sectionTitleContainer}>
              <Text style={HomeStyle.sectionTitle}>Fashion Pria</Text>
              <Text style={HomeStyle.sectionCount}>41</Text>
            </View>
            <Text style={HomeStyle.sectionShowAll}>Lihat Semua</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {MaleFashion.map((item, index) => (
              <ProductItem
                key={index}
                data={item}
                isLastItem={index === MaleFashion.length - 1}
              />
            ))}
          </ScrollView>
        </View>

        <View
          style={[
            HomeStyle.sectionContainer,
            {
              marginBottom: 16, // for last item only
            },
          ]}>
          <View
            style={[
              globalStyle.paddingContainer,
              HomeStyle.categoryNameContainer,
            ]}>
            <View style={HomeStyle.sectionTitleContainer}>
              <Text style={HomeStyle.sectionTitle}>Makanan</Text>
              <Text style={HomeStyle.sectionCount}>17</Text>
            </View>
            <Text style={HomeStyle.sectionShowAll}>Lihat Semua</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {Foods.map((item, index) => (
              <ProductItem
                key={index}
                data={item}
                isLastItem={index === Foods.length - 1}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
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
