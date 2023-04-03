import { View, StyleSheet } from 'react-native'
import { COLOR_SETTINGS } from '../../database/AppData';

const Divider = () => {
  return (
    <View
      style={{
        borderBottomColor: COLOR_SETTINGS.GRAY,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 6,
      }}
    />
  )
}

export default Divider;
