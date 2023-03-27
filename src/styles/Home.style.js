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
    fontSize: 20,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-Regular',
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
    fontSize: 17,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-SemiBold',
  },
  sectionContainer: {
    marginTop: marginContainer,
  },
  categoryNameContainer: {
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
    fontFamily: 'Lora-Regular',
  },
  sectionShowAll: {
    fontSize: 16,
    color: COLOR_SETTINGS.PRIMARY,
    fontFamily: 'Lora-Medium',
  },
});
