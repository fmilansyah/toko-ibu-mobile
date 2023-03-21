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
  },
  slider: {
    marginTop: 15,
    overflow: 'visible',
  },
  sliderContentContainer: {
    paddingVertical: 10,
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
});
