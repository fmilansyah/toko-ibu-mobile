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
import ItemDetailStyle from '../../styles/ItemDetail.style';
import Feather from 'react-native-vector-icons/Feather';
import { USER_PICTURE_DEFAULT } from '../../database/AppData';
import globalStyle from '../../styles/global.style';
import api from '../../config/api';
import Loading from '../Loading';
import { Divider } from 'react-native-paper';
import dayjs from 'dayjs';
import { rupiahFormatter } from '../../helpers/formatter';
import ImageView from 'react-native-image-viewing';

export default function ItemDetail({ route, navigation }) {
  const { kd_barang } = route.params;
  const [item, setItem] = useState(null);
  const [variants, setVariants] = useState([]);
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageViewer, setImageViewer] = useState({
    currentIndex: 0,
    visible: false,
  });

  useEffect(() => {
    getItem();
  }, []);

  const getItem = () => {
    const formData = new FormData();
    formData.append('kd_barang', kd_barang);
    api
      .post('/getdetailbarang', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        setItem(data?.barang ?? null);
        setVariants(data?.detail_barang ?? []);
        setFiles(data?.file_barang ?? []);
        setCategory(data?.kategori_barang ?? null);
        setLoading(false);
      });
  };

  const confirmDelete = () => {
    Alert.alert('Hapus Produk', 'Apakah anda yakin?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      { text: 'Ya, Hapus', onPress: () => handleDelete() },
    ]);
  };

  const handleDelete = () => {
    const formData = new FormData();
    formData.append('kd_barang', kd_barang);
    api
      .post('/deletedatabarang', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        if (data.Error === 0) {
          navigation.goBack();
          ToastAndroid.show('Produk Berhasil Dihapus', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Gagal Menghapus Data', ToastAndroid.SHORT);
        }
      });
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
          <Text style={globalStyle.appName}>Informasi Produk</Text>
        </View>
      </View>

      <ScrollView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <View style={ItemDetailStyle.userContainer}>
              <View style={ItemDetailStyle.userPictureContainer}>
                <Image
                  source={{ uri: files[0]?.file ?? USER_PICTURE_DEFAULT }}
                  style={ItemDetailStyle.userPicture}
                />
              </View>
              <View style={ItemDetailStyle.userDetailContainer}>
                <View>
                  <Text style={ItemDetailStyle.userTitle}>{item?.nama}</Text>
                  <Text style={ItemDetailStyle.userSubtitle}>
                    Kategori : {category?.nama ?? '-'}
                  </Text>
                </View>
              </View>
            </View>

            <View style={globalStyle.paddingHorizontal}>
              <Text style={ItemDetailStyle.itemTitle}>Foto Produk</Text>
              <View style={ItemDetailStyle.imageContainer}>
                {files?.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    style={ItemDetailStyle.userPictureContainer}
                    onPress={() =>
                      setImageViewer({ currentIndex: index, visible: true })
                    }>
                    <Image
                      source={{ uri: data.file ?? USER_PICTURE_DEFAULT }}
                      style={ItemDetailStyle.userPicture}
                    />
                  </TouchableOpacity>
                ))}
                <ImageView
                  images={files.map(data => ({ uri: data?.file }))}
                  imageIndex={imageViewer.currentIndex}
                  visible={imageViewer.visible}
                  onRequestClose={() =>
                    setImageViewer({ currentIndex: 0, visible: false })
                  }
                />
              </View>
              <Divider />
            </View>
            <View style={globalStyle.paddingHorizontal}>
              <Text style={ItemDetailStyle.itemTitle}>Deskripsi Produk</Text>
              <Text style={ItemDetailStyle.itemContent}>{item?.deskripsi}</Text>
              <Divider />
            </View>
            <View style={globalStyle.paddingHorizontal}>
              <Text style={ItemDetailStyle.itemTitle}>
                {variants.length} Varian
              </Text>
              {variants.map((variant, index) => (
                <View key={index}>
                  <Text style={ItemDetailStyle.itemContent}>
                    {variant?.varian}
                  </Text>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text
                      style={[ItemDetailStyle.itemContentDetail, { flex: 1 }]}>
                      Sisa Stok : {variant?.stok}
                    </Text>
                    <Text
                      style={[ItemDetailStyle.itemContentDetail, { flex: 1 }]}>
                      Berat : {variant?.berat_satuan} gram
                    </Text>
                  </View>
                  <Text style={ItemDetailStyle.itemContentDetail}>
                    Harga : {rupiahFormatter(variant?.harga)}
                  </Text>
                </View>
              ))}
              <Divider />
            </View>
            <View style={globalStyle.paddingHorizontal}>
              <Text style={ItemDetailStyle.itemTitle}>Ditambahkan Pada</Text>
              <Text style={ItemDetailStyle.itemContent}>
                {item?.created_at
                  ? dayjs(item?.created_at, 'YYYY-MM-DD HH:mm:ss').format(
                      'DD/MM/YYYY HH:mm:ss',
                    )
                  : '-'}
              </Text>
            </View>
            <View style={ItemDetailStyle.btnContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AccountDetails')}
                style={globalStyle.flexBtn}>
                <Feather name="edit" style={globalStyle.submitBtnIcon} />
                <Text style={globalStyle.submitBtnText}>Ubah Produk</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => confirmDelete()}
                style={globalStyle.flexBtn}>
                <Feather name="trash-2" style={globalStyle.submitBtnIcon} />
                <Text style={globalStyle.submitBtnText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
