import { StyleSheet, Text } from 'react-native';

const BasicText = ({ children, style = {} }) => {
  return <Text style={{ ...styles.text, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Lora',
  },
});

export default BasicText;
