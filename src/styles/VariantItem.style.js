import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import { borderRadius, marginContainer } from './global.style';

export default StyleSheet.create({
  box: {
    alignSelf: 'flex-start',
    borderColor: COLOR_SETTINGS.DARKGRAY,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  variantText: {
    fontSize: 14,
    fontFamily: 'Lora-Medium',
  },
});
