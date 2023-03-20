import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';

export default StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
});
