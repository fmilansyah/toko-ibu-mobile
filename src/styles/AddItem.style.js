import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import {
  borderRadius,
  marginContainer,
  paddingContainer,
} from './global.style';

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
  modalContainer: {
    backgroundColor: COLOR_SETTINGS.WHITE,
    margin: marginContainer,
    padding: paddingContainer,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'Lora-SemiBold',
    color: COLOR_SETTINGS.BLACK,
  },
  modalCloseIcon: {
    fontSize: 16,
    color: COLOR_SETTINGS.BLACK,
  },
  categoryItem: {
    paddingVertical: 8,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Lora-Regular',
    color: COLOR_SETTINGS.BLACK,
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
  imageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  fileInfoContainer: {
    borderColor: COLOR_SETTINGS.GRAY,
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: paddingContainer,
    marginVertical: 8,
  },
  fileInfo: {
    color: COLOR_SETTINGS.GRAY,
    fontSize: 14,
    fontFamily: 'Lora-Regular',
    textAlign: 'center',
  },
  formRepeatContainer: {
    borderColor: COLOR_SETTINGS.DARKGRAY,
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    marginVertical: 8,
  },
  formRepeatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formRepeatTitle: {
    fontSize: 14,
    fontFamily: 'Lora-SemiBold',
    color: COLOR_SETTINGS.BLACK,
  },
  formRepeatDelete: {
    fontSize: 14,
    fontFamily: 'Lora-SemiBold',
    color: COLOR_SETTINGS.RED,
  },
});
