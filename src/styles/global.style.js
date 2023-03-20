import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get('window');

export const wp = percentage => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};
const slideWidth = wp(75);

const slideHeight = viewportHeight * 0.36;

const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({});
