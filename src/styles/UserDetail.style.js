import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import { marginContainer } from './global.style';

export default StyleSheet.create({
  userContainer: {
    width: '100%',
    height: 75,
    margin: marginContainer,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPictureContainer: {
    width: 75,
    height: 75,
    marginRight: marginContainer,
  },
  userPicture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 75 / 2,
  },
  userDetailContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
  },
  userTitle: {
    fontSize: 14,
    maxWidth: '100%',
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-Bold',
  },
  userSubtitle: {
    fontSize: 14,
    maxWidth: '100%',
    color: COLOR_SETTINGS.PRIMARY,
    fontFamily: 'Lora-Regular',
  },
  itemTitle: {
    fontSize: 14,
    color: COLOR_SETTINGS.DARKGRAY,
    fontFamily: 'Lora-SemiBold',
    marginVertical: 10,
  },
  itemContent: {
    fontSize: 14,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-Regular',
    marginBottom: 10,
  },
});
