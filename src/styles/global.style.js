import { StyleSheet, Dimensions } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get('window');

export const sliderWidth = viewportWidth;
const wp = percentage => {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
};
const slideWidth = wp(75);
export const itemHorizontalMargin = wp(2);
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export const slideHeight = viewportHeight * 0.25;

export const borderRadius = 8;

export const paddingContainer = 16;

export const marginContainer = 16;

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOR_SETTINGS.WHITE,
  },
  iconBtn: {
    fontSize: 20,
    color: COLOR_SETTINGS.BLACK,
  },
  roundedBtn: {
    fontSize: 20,
    color: COLOR_SETTINGS.WHITE,
    backgroundColor: COLOR_SETTINGS.PRIMARY,
    padding: 10,
    borderRadius: 100,
  },
  paddingContainer: {
    padding: 16,
  },
  descLink: {
    fontSize: 16,
    fontFamily: 'Lora-Medium',
  },
  link: {
    fontSize: 16,
    color: COLOR_SETTINGS.PRIMARY,
    fontFamily: 'Lora-Medium',
  },
  row: {
    flexDirection: 'row',
  },
});
