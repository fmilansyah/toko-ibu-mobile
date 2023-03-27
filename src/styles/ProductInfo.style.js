import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import { borderRadius, paddingContainer } from './global.style';

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
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
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
    fontSize: 18,
    color: COLOR_SETTINGS.GRAY,
    padding: 12,
    backgroundColor: COLOR_SETTINGS.WHITE,
    borderRadius: borderRadius,
  },
});
