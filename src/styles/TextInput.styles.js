import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';

export default StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
  },
  error: {
    fontSize: 12,
    color: COLOR_SETTINGS.RED,
    paddingTop: 8,
    fontFamily: 'Lora-Medium',
  },
});
