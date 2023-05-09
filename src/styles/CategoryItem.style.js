import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import { borderRadius, marginContainer } from './global.style';

export default StyleSheet.create({
  categoryBox: {
    borderRadius: borderRadius,
    borderColor: COLOR_SETTINGS.GRAY,
    overflow: 'hidden',
    borderWidth: 1,
    flexDirection: 'column',
    marginLeft: marginContainer,
  },
  categoryImage: {
    width: 150,
    height: 100,
  },
  categoryName: {
    fontSize: 14,
    color: COLOR_SETTINGS.BLACK,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Lora-Regular',
  },
});
