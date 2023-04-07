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
    margin: marginContainer,
  },
  headerCard: {
    paddingHorizontal: paddingContainer,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SETTINGS.GRAY,
  }
});
