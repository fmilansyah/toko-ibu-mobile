import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import { borderRadius, marginContainer } from './global.style';

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
  itemContentDetail: {
    fontSize: 14,
    color: COLOR_SETTINGS.GRAY,
    fontFamily: 'Lora-Regular',
    marginBottom: 10,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: marginContainer,
    gap: 4,
  },
  productImage: {
    width: '30.33333333333333%',
    resizeMode: 'cover',
    borderRadius: borderRadius,
  },
  imageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
});
