import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import { borderRadius, marginContainer, paddingContainer } from './global.style';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOR_SETTINGS.WHITE,
    position: 'relative',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: paddingContainer,
  },
  appName: {
    fontSize: 20,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-Regular',
    marginLeft: 10,
  },
  payBtnContainer: {
    position: 'absolute',
    bottom: 10,
    height: '8%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: paddingContainer,
    paddingRight: paddingContainer,
    paddingTop: 10,
  },
  payBtn: {
    width: '100%',
    height: '100%',
    borderRadius: borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLOR_SETTINGS.PRIMARY,
  },
  payBtnIcon: {
    fontSize: 18,
    color: COLOR_SETTINGS.WHITE,
    marginRight: 5,
  },
  payBtnLabel: {
    fontSize: 16,
    color: COLOR_SETTINGS.WHITE,
    textTransform: 'uppercase',
    fontFamily: 'Lora-Medium',
  },
  sectionContainer: {
    paddingHorizontal: paddingContainer,
    marginVertical: marginContainer,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-Medium',
    marginBottom: 10,
  },
  boxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  boxContent: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
  },
  boxIconContainer: {
    backgroundColor: COLOR_SETTINGS.BG_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: borderRadius,
    marginRight: marginContainer,
  },
  boxIcon: {
    fontSize: 18,
    color: COLOR_SETTINGS.PRIMARY,
  },
  boxTitle: {
    fontSize: 14,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-SemiBold',
  },
  boxDesc: {
    fontSize: 12,
    color: COLOR_SETTINGS.BLACK,
    fontFamily: 'Lora-Medium',
    opacity: 0.5,
  },
  expandIcon: {
    fontSize: 22,
    color: COLOR_SETTINGS.BLACK
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  summaryTitle: {
    fontSize: 12,
    fontFamily: 'Lora-Medium',
    maxWidth: '80%',
    color: COLOR_SETTINGS.BLACK,
    opacity: 0.7,
  },
  summaryTotal: {
    fontSize: 12,
    fontFamily: 'Lora-Medium',
    color: COLOR_SETTINGS.BLACK,
  },
});
