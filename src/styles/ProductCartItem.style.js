import { StyleSheet } from 'react-native';
import { borderRadius, marginContainer } from './global.style';
import { COLOR_SETTINGS } from '../database/AppData';

export default StyleSheet.create({
  productContainer: {
    width: '100%',
    height: 100,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImageContainer: {
    width: 100,
    height: 100,
    marginRight: marginContainer,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: borderRadius,
  },
  productDetailContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
  },
  productName: {
    fontSize: 14,
    maxWidth: '100%',
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-Regular',
  },
  productPriceContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Lora-Regular',
  },
  productActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productQtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productQtyActionMin: {
    borderRadius: 100,
    marginRight: marginContainer,
    padding: 4,
    borderWidth: 1,
    borderColor: COLOR_SETTINGS.GRAY,
  },
  productQtyActionPlus: {
    borderRadius: 100,
    marginLeft: marginContainer,
    padding: 4,
    borderWidth: 1,
    borderColor: COLOR_SETTINGS.GRAY,
  },
  productQtyActionIcon: {
    fontSize: 16,
    color: COLOR_SETTINGS.GRAY,
  },
  productDeleteIcon: {
    fontSize: 16,
    color: COLOR_SETTINGS.GRAY,
    padding: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
