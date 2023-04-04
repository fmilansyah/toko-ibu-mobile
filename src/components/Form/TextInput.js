import React from 'react';
import { View, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import TextInputStyles from '../../styles/TextInput.styles';
import { COLOR_SETTINGS } from '../../database/AppData';

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={TextInputStyles.container}>
      <Input
        mode="outlined"
        theme={{
          colors: { primary: COLOR_SETTINGS.PRIMARY },
          fonts: { default: 'Lora-Medium' },
        }}
        {...props}
      />
      <Text style={TextInputStyles.error}>{errorText}</Text>
    </View>
  );
}
