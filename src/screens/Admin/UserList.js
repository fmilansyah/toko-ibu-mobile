import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import globalStyle from '../../styles/global.style';
import { TextInput } from '../../components/Form';
import {
  Divider,
  FAB,
  TextInput as Input,
  SegmentedButtons,
} from 'react-native-paper';
import api from '../../config/api';
import {
  COLOR_SETTINGS,
  USER_LEVEL,
  USER_PICTURE_DEFAULT,
} from '../../database/AppData';
import UserListStyle from '../../styles/UserList.style';

export default function UserList({ navigation }) {
  const [users, setUsers] = useState([]);
  const [level, setLevel] = useState('');
  const [name, setName] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [level]);

  const getUsers = () => {
    const params = {
      level: level ?? '',
      nama: name ?? '',
    };
    api
      .get('/list-user', { params })
      .then(({ data }) => setUsers(data?.User ?? []));
  };

  return (
    <View style={[globalStyle.container, globalStyle.pRelative]}>
      <View style={globalStyle.headerContainer}>
        <TouchableOpacity
          style={globalStyle.paddingContainer}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <View>
          <Text style={globalStyle.appName}>Daftar Akun</Text>
        </View>
      </View>
      <View style={globalStyle.paddingHorizontal}>
        <TextInput
          inputProps={{
            placeholder: 'Cari Akun',
            value: name,
            onChangeText: text => setName(text),
            autoCorrect: false,
            returnKeyType: 'search',
            onSubmitEditing: () => getUsers(),
            left: (
              <Input.Icon
                icon="account-search-outline"
                color={isTextInputFocused =>
                  isTextInputFocused
                    ? COLOR_SETTINGS.PRIMARY
                    : COLOR_SETTINGS.DARKGRAY
                }
              />
            ),
          }}
        />
        <SegmentedButtons
          value={level}
          onValueChange={setLevel}
          buttons={[
            {
              value: '',
              label: 'Semua',
            },
            {
              value: USER_LEVEL.CASHIER,
              label: USER_LEVEL.CASHIER,
            },
            { value: USER_LEVEL.OWNER, label: USER_LEVEL.OWNER },
          ]}
          style={{ marginTop: 10 }}
          theme={{
            colors: {
              primary: COLOR_SETTINGS.PRIMARY,
              secondaryContainer: COLOR_SETTINGS.PRIMARY,
              onSecondaryContainer: COLOR_SETTINGS.WHITE,
            },
          }}
        />
      </View>
      <ScrollView>
        {users.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserDetail', {
                kd_user: item?.kd_user,
              })
            }
            key={index}>
            <View style={UserListStyle.userContainer}>
              <View style={UserListStyle.userPictureContainer}>
                <Image
                  source={{ uri: item?.foto_profil ?? USER_PICTURE_DEFAULT }}
                  style={UserListStyle.userPicture}
                />
              </View>
              <View style={UserListStyle.userDetailContainer}>
                <View>
                  <Text style={UserListStyle.userTitle}>{item?.nama}</Text>
                  <Text style={UserListStyle.userSubtitle}>
                    {item?.no_telepon}
                  </Text>
                  <Text style={UserListStyle.userLevel}>{item?.level}</Text>
                </View>
              </View>
            </View>
            {users.length !== index + 1 && <Divider />}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        style={globalStyle.fab}
        onPress={() => navigation.navigate('AddUser')}
        theme={{ colors: { onPrimaryContainer: COLOR_SETTINGS.PRIMARY } }}
      />
    </View>
  );
}
