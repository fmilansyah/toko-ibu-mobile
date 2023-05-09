import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';

export default StyleSheet.create({
  title: {
    fontSize: 20,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-Bold',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 14,
    color: COLOR_SETTINGS.DARKGRAY,
    fontFamily: 'Lora-Regular',
  },
  form: {
    marginTop: 20,
  },
});
