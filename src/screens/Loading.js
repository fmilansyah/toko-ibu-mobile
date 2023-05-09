import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLOR_SETTINGS } from '../database/AppData';

const Loading = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color={COLOR_SETTINGS.PRIMARY} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Loading;
