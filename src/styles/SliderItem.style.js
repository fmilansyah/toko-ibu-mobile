import { StyleSheet } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';
import {
  borderRadius,
  itemHorizontalMargin,
  itemWidth,
  slideHeight,
} from './global.style';

export default StyleSheet.create({
  imageContainer: {
    flex: 1,
    marginBottom: -1, // Prevent a random Android rendering issue
    backgroundColor: COLOR_SETTINGS.WHITE,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: borderRadius,
    overflow: 'hidden',
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
  },
});
