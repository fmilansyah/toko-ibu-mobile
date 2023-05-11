import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import { borderRadius, marginContainer } from './global.style';

export default StyleSheet.create({
  topContainer: {
    marginHorizontal: marginContainer,
    marginBottom: marginContainer,
  },
  userContainer: {
    width: '100%',
    height: 75,
    marginHorizontal: marginContainer,
    marginBottom: marginContainer,
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
    borderRadius: borderRadius,
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
  userLevel: {
    fontSize: 14,
    maxWidth: '100%',
    color: COLOR_SETTINGS.GRAY,
    fontFamily: 'Lora-SemiBold',
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: marginContainer,
    gap: 4,
  },
  btn: {
    flex: 1,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR_SETTINGS.DARKGRAY,
  },
  btnPrimaryOutline: {
    flex: 1,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR_SETTINGS.PRIMARY,
  },
  btnText: {
    fontFamily: 'Lora-Regular',
    color: COLOR_SETTINGS.DARKGRAY,
    textAlign: 'center',
  },
  btnTextPrimary: {
    fontFamily: 'Lora-Regular',
    color: COLOR_SETTINGS.PRIMARY,
    textAlign: 'center',
  },
});
