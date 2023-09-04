import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import {
  borderRadius,
  marginContainer,
  paddingContainer,
  sliderWidth,
} from './global.style';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOR_SETTINGS.WHITE,
    position: 'relative',
  },
  addToCartContainer: {
    position: 'absolute',
    bottom: 0,
    height: '8%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: paddingContainer,
    paddingRight: paddingContainer,
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: 'row',
  },
  addToCartBtn: {
    flexGrow: 1,
    height: '100%',
    borderRadius: borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buyNowBtn: {
    width: 50,
    height: '100%',
    borderRadius: borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: COLOR_SETTINGS.PRIMARY,
    borderWidth: 1,
    marginRight: 5,
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
    fontFamily: 'Lora-Regular',
  },
  productImageContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    height: 325,
  },
  backContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: paddingContainer,
    paddingLeft: paddingContainer,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  },
  backBtn: {
    borderRadius: borderRadius,
    padding: 12,
    borderWidth: 1,
    borderColor: COLOR_SETTINGS.GRAY,
    backgroundColor: COLOR_SETTINGS.WHITE,
  },
  backBtnIcon: {
    fontSize: 18,
    color: COLOR_SETTINGS.GRAY,
  },
  imageContainer: {
    width: sliderWidth,
    height: 325,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_SETTINGS.RED,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productIndicatorContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: marginContainer,
    marginTop: marginContainer * 2,
    position: 'absolute',
    bottom: 0,
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
    color: COLOR_SETTINGS.PRIMARY,
  },
  productNameContainer: {
    flexDirection: 'row',
    marginBottom: 14,
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
    fontFamily: 'Lora-Regular',
    color: COLOR_SETTINGS.DARKGRAY,
  },
  productStock: {
    fontSize: 14,
    fontFamily: 'Lora-Regular',
    color: COLOR_SETTINGS.BLACK,
  },
  productPriceContainer: {
    flexDirection: 'row',
    verticalAlign: 'middle',
    marginBottom: 14,
  },
  productPrice: {
    fontSize: 18,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-SemiBold',
    marginRight: 5,
  },
  productPriceOffPercent: {
    fontSize: 14,
    color: COLOR_SETTINGS.RED,
    fontFamily: 'Lora-Regular',
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: '#FFDBE2',
  },
  productPriceOffNominal: {
    fontSize: 14,
    color: COLOR_SETTINGS.GRAY,
    fontFamily: 'Lora-Regular',
    paddingVertical: 2,
    paddingHorizontal: 4,
    textDecorationLine: 'line-through',
    textDecorationColor: COLOR_SETTINGS.GRAY,
    textDecorationStyle: 'solid',
  },
  productVariant: {
    marginHorizontal: -paddingContainer,
    marginBottom: 14,
    borderTopWidth: 1,
    borderTopColor: COLOR_SETTINGS.GRAY,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SETTINGS.GRAY,
    paddingVertical: 8,
  },
  productVariantTitleContainer: {
    paddingHorizontal: paddingContainer,
    marginBottom: 4,
  },
  productVariantTitle: {
    fontSize: 14,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-SemiBold',
  },
});
