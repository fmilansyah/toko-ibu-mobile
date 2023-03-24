import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import { marginContainer, paddingContainer } from './global.style';

export default StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: paddingContainer,
  },
  appName: {
    fontSize: 22,
    color: COLOR_SETTINGS.BLACK,
    fontWeight: '700',
  },
  slider: {
    marginTop: marginContainer,
    overflow: 'visible',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    color: COLOR_SETTINGS.BLACK,
    fontWeight: '700',
  },
  sectionContainer: {
    marginTop: marginContainer,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionCount: {
    fontSize: 16,
    color: COLOR_SETTINGS.BLACK,
    fontWeight: '400',
    opacity: 0.5,
    marginLeft: 10,
  },
  sectionShowAll: {
    fontSize: 16,
    color: COLOR_SETTINGS.PRIMARY,
    fontWeight: '400',
  },
});
