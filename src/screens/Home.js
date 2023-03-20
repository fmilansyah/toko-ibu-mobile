import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from '../components/Basic';
import { APP_NAME, COLOR_SETTINGS } from '../database/AppData';
import Feather from 'react-native-vector-icons/Feather';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Feather name="search" style={styles.iconBtn} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.appName}>{APP_NAME}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather name="log-in" style={styles.roundedBtn} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLOR_SETTINGS.WHITE,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  appName: {
    fontSize: 22,
    color: COLOR_SETTINGS.BLACK,
  },
  iconBtn: {
    fontSize: 22,
    color: COLOR_SETTINGS.BLACK,
  },
  roundedBtn: {
    fontSize: 22,
    color: COLOR_SETTINGS.WHITE,
    backgroundColor: COLOR_SETTINGS.PRIMARY,
    padding: 10,
    borderRadius: 100,
  },
});

export default Home;
