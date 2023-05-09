import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import { borderRadius, marginContainer } from './global.style';

export default StyleSheet.create({
  productBox: {
    width: 150,
    marginLeft: marginContainer,
    borderColor: COLOR_SETTINGS.GRAY,
    borderRadius: 8,
    borderWidth: 1,
  },
  productBoxVertical: {
    borderColor: COLOR_SETTINGS.GRAY,
    borderRadius: 8,
    borderWidth: 1,
  },
  productImageContainer: {
    width: '100%',
    height: 100,
    backgroundColor: COLOR_SETTINGS.WHITE,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productDisc: {
    position: 'absolute',
    width: '20%',
    height: '24%',
    backgroundColor: COLOR_SETTINGS.PRIMARY,
    top: 0,
    left: 0,
    borderTopLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  productDiscPercent: {
    fontSize: 12,
    color: COLOR_SETTINGS.WHITE,
    fontFamily: 'Lora-Bold',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    zIndex: 1,
    borderTopRightRadius: borderRadius,
    borderTopLeftRadius: borderRadius,
  },
  productName: {
    fontSize: 14,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-Regular',
    marginBottom: 2,
  },
  productStockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productStockStatus: {
    fontSize: 12,
    fontFamily: 'Lora-Regular',
  },
  productPrice: {
    fontFamily: 'Lora-Regular',
  },
  productInfo: {
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 8,
  },
});
