import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import globalStyle, { borderRadius } from '../../styles/global.style';
import { TextInput } from '../../components/Form';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Divider,
  FAB,
  TextInput as Input,
  Modal,
  Portal,
  Provider,
  SegmentedButtons,
} from 'react-native-paper';
import api from '../../config/api';
import {
  COLOR_SETTINGS,
  USER_LEVEL,
  USER_PICTURE_DEFAULT,
} from '../../database/AppData';
import ItemListStyle from '../../styles/ItemList.style';
import AddItemStyle from '../../styles/AddItem.style';

export default function ItemList({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCategories();
    });

    return unsubscribe;
  }, [navigation]);

  const getCategories = () => {
    const params = {
      nama: name ?? '',
    };
    api
      .get('/getkategori', { params })
      .then(({ data }) => setCategories(data?.Kategori ?? []));
  };

  const confirmDelete = record => {
    Alert.alert('Hapus Kategori', 'Apakah anda yakin?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      { text: 'Ya, Hapus', onPress: () => handleDelete(record) },
    ]);
  };

  const handleDelete = record => {
    const formData = new FormData();
    formData.append('kd_kategori', record?.kd_kategori);
    api
      .post('/deletekategori', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        if (data.Error === 0) {
          getCategories();
          ToastAndroid.show('Kategori Berhasil Dihapus', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Gagal Menghapus Data', ToastAndroid.SHORT);
        }
      });
  };

  const handleCloseDescription = () => {
    setDescription(null);
    setDescriptionVisible(false);
  }

  const renderDescription = () => {
    return (
      <View>
        <View style={AddItemStyle.modalHeader}>
          <View>
            <Text style={AddItemStyle.modalTitle}>Deskripsi</Text>
          </View>
          <TouchableOpacity onPress={() => handleCloseDescription()}>
            <MaterialCommunityIcons
              name="close-thick"
              style={AddItemStyle.modalCloseIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={globalStyle.paragraph}>{description}</Text>
      </View>
    );
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={descriptionVisible}
          onDismiss={() => handleCloseDescription()}
          contentContainerStyle={AddItemStyle.modalContainer}>
          {renderDescription()}
        </Modal>
      </Portal>
    <View style={[globalStyle.container, globalStyle.pRelative]}>
      <View style={globalStyle.headerContainer}>
        <TouchableOpacity
          style={globalStyle.paddingContainer}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <View>
          <Text style={globalStyle.appName}>Daftar Kategori</Text>
        </View>
      </View>
      <View style={ItemListStyle.topContainer}>
        <TextInput
          inputProps={{
            placeholder: 'Cari Kategori',
            value: name,
            onChangeText: text => setName(text),
            autoCorrect: false,
            returnKeyType: 'search',
            onSubmitEditing: () => getCategories(),
            left: (
              <Input.Icon
                icon="magnify"
                color={isTextInputFocused =>
                  isTextInputFocused
                    ? COLOR_SETTINGS.PRIMARY
                    : COLOR_SETTINGS.DARKGRAY
                }
              />
            ),
          }}
        />
      </View>
      <ScrollView>
        {categories.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              setDescription(item?.keterangan);
              setDescriptionVisible(true);
            }}
            key={index}>
            <View style={ItemListStyle.userContainer}>
              <View style={ItemListStyle.userPictureContainer}>
                <Image
                  source={{ uri: item?.foto ?? USER_PICTURE_DEFAULT }}
                  style={ItemListStyle.userPicture}
                />
              </View>
              <View style={ItemListStyle.userDetailContainer}>
                <View>
                  <Text style={ItemListStyle.userTitle}>{item?.nama}</Text>
                  <Text style={ItemListStyle.userSubtitle}>
                    {item?.jumlah_produk} Produk
                  </Text>
                </View>
              </View>
            </View>
            <View style={ItemListStyle.btnContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditCategory', {
                    kd_kategori: item?.kd_kategori,
                    nama: item?.nama,
                    keterangan: item?.keterangan,
                  })
                }
                style={ItemListStyle.btnPrimaryOutline}>
                <Text style={ItemListStyle.btnTextPrimary}>Ubah Kategori</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={ItemListStyle.btn}
                onPress={() => confirmDelete(item)}>
                <Text style={ItemListStyle.btnText}>Hapus Kategori</Text>
              </TouchableOpacity>
            </View>
            {categories.length !== index + 1 && (
              <View style={globalStyle.paddingContainer}>
                <Divider />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FAB
        icon="plus"
        style={globalStyle.fab}
        onPress={() => navigation.navigate('AddCategory')}
        theme={{ colors: { onPrimaryContainer: COLOR_SETTINGS.PRIMARY } }}
      />
    </View>
    </Provider>
  );
}
