import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { ParallaxImage } from 'react-native-snap-carousel-v4';
import SliderItemStyle from '../../styles/SliderItem.style';

class SliderItem extends Component {
  get image() {
    const {
      data: { illustration },
      parallax,
      parallaxProps,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={SliderItemStyle.imageContainer}
        style={SliderItemStyle.image}
        parallaxFactor={0.35}
        showSpinner={true}
        {...parallaxProps}
      />
    ) : (
      <Image source={{ uri: illustration }} style={SliderItemStyle.image} />
    );
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={SliderItemStyle.slideInnerContainer}>
        <View style={SliderItemStyle.imageContainer}>{this.image}</View>
      </TouchableOpacity>
    );
  }
}

export default SliderItem;
