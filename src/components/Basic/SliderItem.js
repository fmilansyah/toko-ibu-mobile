import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import SliderItemStyle from '../../styles/SliderItem.style';

class SliderItem extends Component {
  get image() {
    const {
      data: { illustration },
    } = this.props;

    return (
      <Image source={{ uri: illustration }} style={SliderItemStyle.image} />
    );
  }

  render() {
    return (
      <TouchableOpacity style={SliderItemStyle.slideInnerContainer}>
        <View style={SliderItemStyle.imageContainer}>{this.image}</View>
      </TouchableOpacity>
    );
  }
}

export default SliderItem;
