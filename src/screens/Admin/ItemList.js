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
import ItemListStyle from '../../styles/ItemList.style';
import Loading from '../Loading';

export default function ItemList({ navigation }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getItems();
    });

    return unsubscribe;
  }, [navigation]);

  const getItems = () => {
    const params = {
      nama: name ?? '',
    };
    setLoading(true);
    api.get('/getdatabarang', { params }).then(({ data }) => {
      setLoading(false);
      setItems(data?.Barang ?? []);
    });
  };

  const confirmDelete = record => {
    Alert.alert('Hapus Produk', 'Apakah anda yakin?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      { text: 'Ya, Hapus', onPress: () => handleDelete(record) },
    ]);
  };

  const handleDelete = record => {
    const formData = new FormData();
    formData.append('kd_barang', record?.kd_barang);
    setLoading(true);
    api
      .post('/deletedatabarang', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        if (data.Error === 0) {
          getItems();
          ToastAndroid.show('Produk Berhasil Dihapus', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Gagal Menghapus Data', ToastAndroid.SHORT);
        }
      });
  };

  return (
    <View style={[globalStyle.container, globalStyle.pRelative]}>
      <View style={globalStyle.headerContainer}>
        <View style={globalStyle.paddingContainer}>
          <Text style={globalStyle.appName}>Daftar Produk</Text>
        </View>
      </View>
      <View style={ItemListStyle.topContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Categories')}
          style={ItemListStyle.categoryMenuContainer}>
          <Text style={ItemListStyle.categoryMenuTitle}>
            Daftar Kategori Produk
          </Text>
          <Text style={ItemListStyle.categoryMenuLink}>KELOLA</Text>
        </TouchableOpacity>
        <TextInput
          inputProps={{
            placeholder: 'Cari Produk',
            value: name,
            onChangeText: text => setName(text),
            autoCorrect: false,
            returnKeyType: 'search',
            onSubmitEditing: () => getItems(),
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
        {loading ? (
          <View style={{ paddingVertical: 16 }}>
            <Loading />
          </View>
        ) : (
          <View>
            {items.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ItemDetail', {
                    kd_barang: item?.kd_barang,
                  })
                }
                key={index}>
                <View style={ItemListStyle.userContainer}>
                  <View style={ItemListStyle.userPictureContainer}>
                    <Image
                      source={{ uri: item?.file ?? USER_PICTURE_DEFAULT }}
                      style={ItemListStyle.userPicture}
                    />
                  </View>
                  <View style={ItemListStyle.userDetailContainer}>
                    <View>
                      <Text style={ItemListStyle.userTitle}>{item?.nama}</Text>
                      <Text style={ItemListStyle.userSubtitle}>
                        {item?.jumlah_varian} Varian
                      </Text>
                      <Text style={ItemListStyle.userLevel}>
                        {item?.nama_kategori}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={ItemListStyle.btnContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('EditItem', {
                        kd_barang: item?.kd_barang,
                      })
                    }
                    style={ItemListStyle.btnPrimaryOutline}>
                    <Text style={ItemListStyle.btnTextPrimary}>
                      Ubah Produk
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={ItemListStyle.btn}
                    onPress={() => confirmDelete(item)}>
                    <Text style={ItemListStyle.btnText}>Hapus Produk</Text>
                  </TouchableOpacity>
                </View>
                {items.length !== index + 1 && (
                  <View style={globalStyle.paddingContainer}>
                    <Divider />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
      <FAB
        icon="plus"
        style={globalStyle.fab}
        onPress={() => navigation.navigate('AddItem')}
        theme={{ colors: { onPrimaryContainer: COLOR_SETTINGS.PRIMARY } }}
      />
    </View>
  );
}
