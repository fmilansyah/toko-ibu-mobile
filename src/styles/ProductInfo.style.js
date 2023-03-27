import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import { borderRadius, marginContainer, paddingContainer, sliderWidth } from './global.style';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOR_SETTINGS.WHITE,
    position: 'relative',
  },
  addToCartContainer: {
    position: 'absolute',
    bottom: 10,
    height: '8%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: paddingContainer,
    paddingRight: paddingContainer,
    paddingTop: 10,
  },
  addToCartBtn: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addToCartIcon: {
    fontSize: 18,
    color: COLOR_SETTINGS.WHITE,
    marginRight: 5,
  },
  addToCartLabel: {
    fontSize: 16,
    color: COLOR_SETTINGS.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'Lora-Medium',
  },
  productImageContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  backContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: paddingContainer,
    paddingLeft: paddingContainer,
  },
  backBtn: {
    borderRadius: borderRadius,
    padding: 12,
    borderWidth: 1,
    borderColor: COLOR_SETTINGS.GRAY,
  },
  backBtnIcon: {
    fontSize: 18,
    color: COLOR_SETTINGS.GRAY,
  },
  imageContainer: {
    width: sliderWidth,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productIndicatorContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: marginContainer,
    marginTop: marginContainer * 2,
  },
  productIndicator: {
    width: '5%',
    height: 2.4,
    backgroundColor: COLOR_SETTINGS.BLACK,
    marginHorizontal: 4,
    borderRadius: 100,
  },
  productDescContainer: {
    paddingHorizontal: paddingContainer,
  },
  productCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  productCategoryName: {
    fontSize: 12,
    color: COLOR_SETTINGS.BLACK,
  },
  productNameContainer: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 20,
    fontFamily: 'Lora-Bold',
    color: COLOR_SETTINGS.BLACK,
  },
  productDescription: {
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 18,
    fontFamily: 'Lora-Medium',
  },
});
