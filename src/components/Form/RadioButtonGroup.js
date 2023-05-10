import React, { forwardRef } from 'react';
import { View, Text } from 'react-native';
import { COLOR_SETTINGS } from '../../database/AppData';
import FormStyles from '../../styles/Form.styles';
import { SegmentedButtons } from 'react-native-paper';

const RadioButtonGroup = forwardRef(
  ({ label = null, options = [], value = null, onChange }, ref) => {
    return (
      <View style={FormStyles.container}>
        {label !== null && label !== undefined && (
          <Text
            style={[
              FormStyles.label,
              {
                color: COLOR_SETTINGS.DARKGRAY,
              },
            ]}>
            {label}
          </Text>
        )}
        <SegmentedButtons
          value={value}
          onValueChange={val => onChange(val)}
          buttons={options}
          theme={{
            colors: {
              primary: COLOR_SETTINGS.PRIMARY,
              secondaryContainer: COLOR_SETTINGS.PRIMARY,
              onSecondaryContainer: COLOR_SETTINGS.WHITE,
            },
          }}
        />
      </View>
    );
  },
);

export default RadioButtonGroup;
