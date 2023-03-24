import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import { borderRadius, marginContainer } from './global.style';

export default StyleSheet.create({
  productBox: {
    width: 150,
    marginLeft: marginContainer,
    borderRadius: borderRadius,
    overflow: 'hidden',
    borderWidth: 1,
    // borderColor: 'transparent',
  },
  productImageContainer: {
    width: '100%',
    height: 100,
    borderRadius: borderRadius,
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
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productDiscPercent: {
    fontSize: 12,
    color: COLOR_SETTINGS.WHITE,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 12,
    color: COLOR_SETTINGS.BLACK,
    fontWeight: '600',
    marginBottom: 2,
  },
  productStockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productStockStatus: {
    fontSize: 12,
  },
});
