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
    flexDirection: 'row',
    padding: paddingContainer,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    alignSelf: 'center',
    marginRight: 10,
  },
  searchBox: {
    flex: 1,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLOR_SETTINGS.PRIMARY,
    width: '100%',
    paddingVertical: 0,
    paddingHorizontal: 15,
  },
  productContainer: {
    flex: 1,
    maxWidth: '50%',
    paddingHorizontal: marginContainer / 2,
    marginVertical: marginContainer / 2,
  },
});
