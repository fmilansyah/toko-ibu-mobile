import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import {
  borderRadius,
  marginContainer,
  paddingContainer,
} from './global.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: paddingContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 108,
    resizeMode: 'center',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Lora-Bold',
    color: COLOR_SETTINGS.BLACK,
    marginBottom: marginContainer,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: marginContainer,
  },
  forgot: {
    fontSize: 16,
    color: COLOR_SETTINGS.PRIMARY,
    fontFamily: 'Lora-Regular',
  },
  createAccount: {
    marginRight: 5,
  },

  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  submitBtn: {
    width: '100%',
    borderRadius: borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLOR_SETTINGS.PRIMARY,
    paddingVertical: 12,
    marginBottom: marginContainer,
  },
  submitBtnIcon: {
    fontSize: 18,
    color: COLOR_SETTINGS.WHITE,
    marginRight: 5,
  },
  submitBtnText: {
    fontSize: 16,
    color: COLOR_SETTINGS.WHITE,
    fontFamily: 'Lora-Regular',
  },
  backBtn: {
    position: 'absolute',
    top: paddingContainer,
    right: paddingContainer,
    padding: 8,
  },
  backBtnIcon: {
    fontSize: 22,
    color: COLOR_SETTINGS.BLACK,
  },
});
