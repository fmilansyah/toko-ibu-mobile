import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import {
  borderRadius,
  marginContainer,
  paddingContainer,
} from './global.style';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOR_SETTINGS.WHITE,
    position: 'relative',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: paddingContainer,
  },
  appName: {
    fontSize: 20,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-Medium',
    marginLeft: 10,
  },
  card: {
    borderColor: COLOR_SETTINGS.GRAY,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: COLOR_SETTINGS.WHITE,
    marginHorizontal: marginContainer,
    marginVertical: 8,
  },
  headerCard: {
    paddingHorizontal: paddingContainer,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SETTINGS.GRAY,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCol: {
    flex: 1,
  },
  moreBtn: {
    fontSize: 18,
    color: COLOR_SETTINGS.BLACK,
    textAlign: 'right',
  },
  headerTitle: {
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-SemiBold',
  },
  headerDate: {
    color: COLOR_SETTINGS.GRAY,
    fontFamily: 'Lora-Medium',
  },
  footerCard: {
    paddingHorizontal: paddingContainer,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerTitle: {
    color: COLOR_SETTINGS.GRAY,
    fontFamily: 'Lora-Medium',
  },
  footerNominal: {
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-SemiBold',
  },
  successLabel: {
    paddingHorizontal: 8,
    backgroundColor: COLOR_SETTINGS.BG_GREEN,
    color: COLOR_SETTINGS.GREEN,
    fontFamily: 'Lora-SemiBold',
    alignSelf: 'flex-end',
  },
  warningLabel: {
    paddingHorizontal: 8,
    backgroundColor: COLOR_SETTINGS.BG_ORANGE,
    color: COLOR_SETTINGS.ORANGE,
    fontFamily: 'Lora-SemiBold',
    alignSelf: 'flex-end',
  },
  bodyCard: {
    paddingHorizontal: paddingContainer,
    paddingVertical: 8,
  },
  productContainer: {
    width: '100%',
    height: 50,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImageContainer: {
    width: 50,
    height: 50,
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
    fontFamily: 'Lora-Medium',
  },
  productPriceContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.6,
  },
  productPrice: {
    fontSize: 14,
    fontFamily: 'Lora-Medium',
  },
});
