import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SliderItem, Text } from '../components/Basic';
import { APP_NAME } from '../database/AppData';
import Feather from 'react-native-vector-icons/Feather';
import globalStyle, { itemWidth, sliderWidth } from '../styles/global.style';
import HomeStyle from '../styles/Home.style';
import { Carousel } from 'react-native-snap-carousel-v4';
import { SliderData } from '../database/Database';

const renderSliderItem = ({ item, index }, parallaxProps) => {
  return (
    <SliderItem data={item} parallax={true} parallaxProps={parallaxProps} />
  );
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
            contentContainerCustomStyle={HomeStyle.sliderContentContainer}
            hasParallaxImages={true}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            inactiveSlideShift={20}
            loop={true}
            autoplay={false}
            autoplayDelay={4000}
            autoplayInterval={7000}
          />
        </View>
      </ScrollView>
      <Footer />
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
