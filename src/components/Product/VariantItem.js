import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import VariantItemStyle from '../../styles/VariantItem.style';
import { marginContainer } from '../../styles/global.style';
import { COLOR_SETTINGS } from '../../database/AppData';

const VariantItem = ({
  data,
  isLastItem = false,
  isFirstItem = true,
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        VariantItemStyle.box,
        {
          marginLeft: isFirstItem ? marginContainer : 8,
          marginRight: isLastItem ? marginContainer : 0,
          borderColor: isSelected
            ? COLOR_SETTINGS.PRIMARY
            : VariantItemStyle.box.borderColor,
        },
      ]}
      onPress={() => onPress(data)}>
      <Text
        style={[
          VariantItemStyle.variantText,
          {
            color: isSelected
              ? COLOR_SETTINGS.PRIMARY
              : COLOR_SETTINGS.DARKGRAY,
          },
        ]}>
        {data?.varian}
      </Text>
    </TouchableOpacity>
  );
};

export default VariantItem;
