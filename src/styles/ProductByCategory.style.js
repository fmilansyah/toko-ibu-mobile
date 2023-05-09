import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import { marginContainer, paddingContainer } from './global.style';

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
    fontFamily: 'Lora-Regular',
    marginLeft: 10,
  },
  productList: {
    flex: 2,
    marginHorizontal: marginContainer / 2,
  },
  productContainer: {
    flex: 1,
    maxWidth: '50%',
    paddingHorizontal: marginContainer / 2,
    marginVertical: marginContainer / 2,
  },
});
