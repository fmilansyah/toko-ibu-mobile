import React, { useState, forwardRef } from 'react';
import { View, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import FormStyles from '../../styles/Form.styles';
import { COLOR_SETTINGS } from '../../database/AppData';

const TextInput = forwardRef(
  ({ label = null, isPassword = false, inputProps = {} }, ref) => {
    const [passwordStatus, setPasswordStatus] = useState(isPassword);
    const [focus, setFocus] = useState(false);

    const toggleShowPassword = () => {
      setPasswordStatus(!passwordStatus);
    };

    return (
      <View style={FormStyles.container}>
        {label !== null && label !== undefined && (
          <Text
            style={[
              FormStyles.label,
              {
                color: focus ? COLOR_SETTINGS.PRIMARY : COLOR_SETTINGS.DARKGRAY,
              },
            ]}>
            {label}
          </Text>
        )}
        <Input
          ref={ref}
          mode="outlined"
          theme={{
            colors: { primary: COLOR_SETTINGS.PRIMARY },
          }}
          secureTextEntry={passwordStatus}
          right={
            isPassword ? (
              <Input.Icon
                icon={passwordStatus ? 'eye' : 'eye-off'}
                onPress={() => toggleShowPassword()}
                color={isTextInputFocused =>
                  isTextInputFocused
                    ? COLOR_SETTINGS.PRIMARY
                    : COLOR_SETTINGS.DARKGRAY
                }
              />
            ) : null
          }
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          {...inputProps}
        />
      </View>
    );
  },
);

export default TextInput;
