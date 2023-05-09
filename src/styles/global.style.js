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
    fontSize: 22,
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
    fontFamily: 'Lora-Regular',
  },
  link: {
    fontSize: 16,
    color: COLOR_SETTINGS.PRIMARY,
    fontFamily: 'Lora-Regular',
  },
  row: {
    flexDirection: 'row',
  },
  justifyContentEnd: {
    justifyContent: 'flex-end',
  },
  flex: {
    flex: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  pRelative: {
    position: 'relative',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  appName: {
    fontSize: 18,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-Regular',
  },
  formGroup: {
    marginVertical: 5,
  },
  submitBtn: {
    width: '100%',
    borderRadius: borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLOR_SETTINGS.PRIMARY,
    paddingVertical: 12,
    marginBottom: marginContainer,
    marginTop: 8,
  },
  submitBtnIcon: {
    fontSize: 18,
    color: COLOR_SETTINGS.WHITE,
    marginRight: 5,
  },
  submitBtnText: {
    fontSize: 16,
    color: COLOR_SETTINGS.WHITE,
    fontFamily: 'Lora-Regular',
  },
  formValidationContainer: {
    backgroundColor: COLOR_SETTINGS.BG_ORANGE,
    padding: paddingContainer,
    borderRadius: borderRadius,
  },
});
