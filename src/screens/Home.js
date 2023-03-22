import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SliderItem, Text } from '../components/Basic';
import { APP_NAME } from '../database/AppData';
import Feather from 'react-native-vector-icons/Feather';
import globalStyle, { itemWidth, sliderWidth } from '../styles/global.style';
import HomeStyle from '../styles/Home.style';
import { Carousel } from 'react-native-snap-carousel-v4';
import { Categories, SliderData } from '../database/Database';
import { CategoryItem } from '../components/Category';

const renderSliderItem = ({ item }) => {
  return <SliderItem data={item} />;
};

const Home = ({ navigation }) => {
  return (
    <View style={globalStyle.container}>
      <View style={HomeStyle.headerContainer}>
        <TouchableOpacity>
          <Feather name="search" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={HomeStyle.appName}>{APP_NAME}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
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
            {Categories.map((item, index) => (
              <CategoryItem
                key={index}
                data={item}
                isLastItem={index === Categories.length - 1}
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
