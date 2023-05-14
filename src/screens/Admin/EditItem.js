import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import globalStyle from '../../styles/global.style';
import AddItemStyle from '../../styles/AddItem.style';
import { TextInput, Validation } from '../../components/Form';
import {
  Snackbar,
  Provider,
  Portal,
  Modal,
  Divider,
  Button,
} from 'react-native-paper';
import api from '../../config/api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DocumentPicker, { types } from 'react-native-document-picker';
import { COLOR_SETTINGS, USER_PICTURE_DEFAULT } from '../../database/AppData';
import ImageView from 'react-native-image-viewing';
import Loading from '../Loading';

export default function EditItem({ route, navigation }) {
  const { kd_barang } = route.params;
  const [validation, setValidation] = useState({
    name: [],
    variants: [
      {
        varian: [],
        stok: [],
        harga: [],
        berat_satuan: [],
      },
    ],
  });
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [files, setFiles] = useState([]);
  const [variants, setVariants] = useState([
    {
      varian: null,
      stok: null,
      harga: null,
      berat_satuan: null,
    },
  ]);
  const [deletedVariants, setDeletedVariants] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [snackbarInfo, setSnackbarInfo] = useState({
    visible: false,
    message: null,
  });
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageViewer, setImageViewer] = useState({
    currentIndex: 0,
    visible: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
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
        setName(data?.barang?.nama ?? null);
        setCategory(
          data?.kategori_barang
            ? data?.barang?.kd_kategori + ' - ' + data?.kategori_barang?.nama
            : null,
        );
        setFiles(
          data?.file_barang
            ? data?.file_barang.map(item => ({
                kd_file: item?.kd_file,
                uri: item?.file,
              }))
            : [],
        );
        let newVariants = [];
        let newValidation = { ...validation };
        data?.detail_barang.forEach((item, index) => {
          newVariants.push({
            kd_detail_barang: item?.kd_detail_barang,
            varian: item?.varian,
            stok: String(item?.stok ?? ''),
            harga: String(item?.harga ?? ''),
            berat_satuan: String(item?.berat_satuan ?? ''),
          });
          if (index !== data?.detail_barang.length - 1) {
            newValidation.variants.push({
              varian: [],
              stok: [],
              harga: [],
              berat_satuan: [],
            });
          }
        });
        setVariants(newVariants);
        setValidation(newValidation);
        setLoading(false);
      });
  };

  const handleSave = () => {
    if (files.length < 1) {
      setSnackbarInfo({ visible: true, message: 'Harap Pilih Foto Produk' });
      return;
    }
    const formData = new FormData();
    formData.append('kd_barang', kd_barang);
    formData.append('nama', name);
    if (category) {
      const arrCategory = category.split(' - ');
      formData.append('kd_kategori', arrCategory[0]);
    }
    files
      .filter(item => item?.kd_file === undefined || item?.kd_file === null)
      .forEach(item => {
        formData.append('images[]', {
          ...item,
        });
      });
    formData.append('ukuran', JSON.stringify(variants));
    formData.append('hapus_ukuran', JSON.stringify(deletedVariants));
    formData.append('hapus_file', JSON.stringify(deletedFiles));
    console.log(JSON.stringify(variants));
    console.log(JSON.stringify(deletedVariants));
    console.log(JSON.stringify(deletedFiles));
    api
      .post('/ubahdatabarang', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        if (data.Error === 0) {
          navigation.goBack();
          ToastAndroid.show('Produk Berhasil Diubah', ToastAndroid.SHORT);
        } else {
          setSnackbarInfo({ visible: true, message: data?.Message });
        }
      })
      .catch(e => {
        console.log(e.data);
        setSnackbarInfo({ visible: true, message: 'Gagal Mengubah Produk' });
      });
  };

  const handleChangeName = text => {
    setName(text);

    // validation rules
    const nameValidation = [];
    if (text === null || text === '') {
      nameValidation.push({
        title: 'Nama produk harap diisi',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      name: nameValidation,
    });
  };

  const handleChangeVarian = (text, index) => {
    const newVariants = [...variants];
    newVariants[index].varian = text;
    setVariants(newVariants);

    // validation rules
    const variantValidation = [];
    if (text === null || text === '') {
      variantValidation.push({
        title: 'Nama produk harap diisi',
        icon: 'error',
      });
    }
    const newValidation = { ...validation };
    newValidation.variants[index].varian = variantValidation;
    setValidation(newValidation);
  };

  const handleChangeHarga = (text, index) => {
    const newVariants = [...variants];
    newVariants[index].harga = text;
    setVariants(newVariants);

    // validation rules
    const priceValidation = [];
    if (text === null || text === '') {
      priceValidation.push({
        title: 'Harga harap diisi',
        icon: 'error',
      });
    }
    const newValidation = { ...validation };
    newValidation.variants[index].harga = priceValidation;
    setValidation(newValidation);
  };

  const handleChangeStok = (text, index) => {
    const newVariants = [...variants];
    newVariants[index].stok = text;
    setVariants(newVariants);

    // validation rules
    const stockValidation = [];
    if (text === null || text === '') {
      stockValidation.push({
        title: 'Stok harap diisi',
        icon: 'error',
      });
    }
    const newValidation = { ...validation };
    newValidation.variants[index].stok = stockValidation;
    setValidation(newValidation);
  };

  const handleChangeBeratSatuan = (text, index) => {
    const newVariants = [...variants];
    newVariants[index].berat_satuan = text;
    setVariants(newVariants);

    // validation rules
    const weightValidation = [];
    if (text === null || text === '') {
      weightValidation.push({
        title: 'Berat harap diisi',
        icon: 'error',
      });
    }
    const newValidation = { ...validation };
    newValidation.variants[index].berat_satuan = weightValidation;
    setValidation(newValidation);
  };

  const handleDismissSnackbar = () => {
    setSnackbarInfo({
      visible: false,
      message: null,
    });
  };

  const handleCloseCategories = () => {
    setCategoriesVisible(false);
  };

  const handleOpenCategories = () => {
    setCategoriesVisible(true);
  };

  const getCategories = () => {
    api
      .get('/getkategori')
      .then(({ data }) => setCategories(data?.Kategori ?? []));
  };

  const handleDeleteVariant = index => {
    if (index === 0) {
      setSnackbarInfo({ visible: true, message: 'Minimal harus ada 1 varian' });
    } else {
      const newVariants = [...variants];
      const newDeletedVariants = [...deletedVariants];
      if (newVariants[index].kd_detail_barang) {
        newDeletedVariants.push(newVariants[index].kd_detail_barang);
      }
      setDeletedVariants(newDeletedVariants);
      newVariants.splice(index, 1);
      const newValidation = { ...validation };
      newValidation.variants.splice(index, 1);
      setVariants(newVariants);
    }
  };

  const handleAddVariants = () => {
    setVariants([
      ...variants,
      {
        varian: null,
        stok: null,
        harga: null,
        berat_satuan: null,
      },
    ]);
    const newValidation = { ...validation };
    newValidation.variants = [
      ...newValidation.variants,
      {
        varian: [],
        stok: [],
        harga: [],
        berat_satuan: [],
      },
    ];
    setValidation(newValidation);
  };

  const handleChangeFiles = newFiles => {
    const newDeletedFiles = [...deletedFiles];
    files.forEach(item => {
      if (item?.kd_file) {
        newDeletedFiles.push(item?.kd_file);
      }
    });
    setDeletedFiles(newDeletedFiles);
    setFiles(newFiles);
  };

  const renderCategories = () => {
    return (
      <View>
        <View style={AddItemStyle.modalHeader}>
          <View>
            <Text style={AddItemStyle.modalTitle}>Pilih Kategori</Text>
          </View>
          <TouchableOpacity onPress={() => handleCloseCategories()}>
            <MaterialCommunityIcons
              name="close-thick"
              style={AddItemStyle.modalCloseIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {categories.map((cat, index) => (
            <View key={index}>
              <TouchableOpacity
                style={AddItemStyle.categoryItem}
                onPress={() => {
                  setCategory(cat?.kd_kategori + ' - ' + cat?.nama);
                  handleCloseCategories();
                }}>
                <Text style={AddItemStyle.categoryName}>{cat?.nama}</Text>
              </TouchableOpacity>
              {categories.length - 1 !== index && <Divider />}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={categoriesVisible}
          onDismiss={() => {
            handleCloseCategories();
          }}
          contentContainerStyle={AddItemStyle.modalContainer}>
          {renderCategories()}
        </Modal>
      </Portal>
      <View style={[globalStyle.container, globalStyle.pRelative]}>
        <Snackbar
          visible={snackbarInfo.visible}
          onDismiss={handleDismissSnackbar}
          wrapperStyle={{ zIndex: 100, elevation: 100 }}>
          {snackbarInfo.message}
        </Snackbar>
        <View style={globalStyle.headerContainer}>
          <TouchableOpacity
            style={globalStyle.paddingContainer}
            onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" style={globalStyle.iconBtn} />
          </TouchableOpacity>
          <View>
            <Text style={globalStyle.appName}>Ubah Produk</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={globalStyle.paddingHorizontal}>
            <Text style={AddItemStyle.title}>Ubah Produk</Text>
            <Text style={AddItemStyle.subTitle}>
              Harap pastikan stok produk sudah sesuai dengan jumlah aslinya
            </Text>

            {loading ? (
              <Loading />
            ) : (
              <View style={AddItemStyle.form}>
                <View style={globalStyle.formGroup}>
                  <TextInput
                    label="Nama Produk"
                    inputProps={{
                      value: name,
                      onChangeText: handleChangeName,
                      autoCorrect: false,
                      returnKeyType: 'next',
                      onSubmitEditing: () => {
                        handleOpenCategories();
                      },
                    }}
                  />
                </View>
                {validation.name.length > 0 && (
                  <View style={globalStyle.formGroup}>
                    <Validation data={validation.name} />
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => handleOpenCategories()}
                  style={globalStyle.formGroup}>
                  <TextInput
                    label="Ketegori"
                    inputProps={{
                      value: category,
                      editable: false,
                    }}
                  />
                </TouchableOpacity>
                <View style={globalStyle.formGroup}>
                  <Text style={globalStyle.formLabel}>Foto Produk</Text>
                  <View style={AddItemStyle.imageContainer}>
                    {files?.map((data, index) => (
                      <TouchableOpacity
                        key={index}
                        style={AddItemStyle.userPictureContainer}
                        onPress={() =>
                          setImageViewer({ currentIndex: index, visible: true })
                        }>
                        <Image
                          source={{ uri: data.uri ?? USER_PICTURE_DEFAULT }}
                          style={AddItemStyle.userPicture}
                        />
                      </TouchableOpacity>
                    ))}
                    <ImageView
                      images={files.map(data => ({ uri: data?.uri }))}
                      imageIndex={imageViewer.currentIndex}
                      visible={imageViewer.visible}
                      onRequestClose={() =>
                        setImageViewer({ currentIndex: 0, visible: false })
                      }
                    />
                    {files.length < 1 && (
                      <View style={AddItemStyle.fileInfoContainer}>
                        <Text style={AddItemStyle.fileInfo}>
                          Tekan Lama Pada Foto Untuk Memilih Beberapa Foto
                          Sekaligus
                        </Text>
                      </View>
                    )}
                  </View>
                  <Button
                    icon="camera"
                    mode="outlined"
                    onPress={() => {
                      DocumentPicker.pick({
                        type: types.images,
                        allowMultiSelection: true,
                      })
                        .then(newFiles => handleChangeFiles(files))
                        .catch(() => console.log('picker canceled'));
                    }}
                    style={{
                      marginTop: 10,
                    }}
                    theme={{
                      colors: {
                        primary: COLOR_SETTINGS.PRIMARY,
                        outline: COLOR_SETTINGS.PRIMARY,
                      },
                    }}>
                    Pilih Foto ({files.length} Dipilih)
                  </Button>
                </View>
                <View style={globalStyle.formGroup}>
                  <Text style={globalStyle.formLabel}>Varian</Text>
                  {variants.map((variant, index) => (
                    <View key={index} style={AddItemStyle.formRepeatContainer}>
                      <View style={AddItemStyle.formRepeatHeader}>
                        <View>
                          <Text style={AddItemStyle.formRepeatTitle}>
                            Varian #{index + 1}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleDeleteVariant(index)}>
                          <Text style={AddItemStyle.formRepeatDelete}>
                            Hapus
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={globalStyle.formGroup}>
                        <TextInput
                          label="Nama Varian"
                          inputProps={{
                            value: variant?.varian,
                            onChangeText: text =>
                              handleChangeVarian(text, index),
                            autoCorrect: false,
                            returnKeyType: 'next',
                          }}
                        />
                      </View>
                      {validation.variants[index].varian.length > 0 && (
                        <View style={globalStyle.formGroup}>
                          <Validation
                            data={validation.variants[index].varian}
                          />
                        </View>
                      )}
                      <View style={globalStyle.formGroup}>
                        <TextInput
                          label="Harga"
                          inputProps={{
                            value: variant?.harga,
                            onChangeText: text =>
                              handleChangeHarga(text, index),
                            autoCorrect: false,
                            keyboardType: 'numeric',
                            returnKeyType: 'next',
                          }}
                        />
                      </View>
                      {validation.variants[index].harga.length > 0 && (
                        <View style={globalStyle.formGroup}>
                          <Validation data={validation.variants[index].harga} />
                        </View>
                      )}
                      <View style={globalStyle.formGroup}>
                        <TextInput
                          label="Stok"
                          inputProps={{
                            value: variant?.stok,
                            onChangeText: text => handleChangeStok(text, index),
                            autoCorrect: false,
                            keyboardType: 'numeric',
                            returnKeyType: 'next',
                          }}
                        />
                      </View>
                      {validation.variants[index].stok.length > 0 && (
                        <View style={globalStyle.formGroup}>
                          <Validation data={validation.variants[index].stok} />
                        </View>
                      )}
                      <View style={globalStyle.formGroup}>
                        <TextInput
                          label="Berat (gram)"
                          inputProps={{
                            value: variant?.berat_satuan,
                            onChangeText: text =>
                              handleChangeBeratSatuan(text, index),
                            autoCorrect: false,
                            keyboardType: 'numeric',
                            returnKeyType: 'next',
                          }}
                        />
                      </View>
                      {validation.variants[index].berat_satuan.length > 0 && (
                        <View style={globalStyle.formGroup}>
                          <Validation
                            data={validation.variants[index].berat_satuan}
                          />
                        </View>
                      )}
                    </View>
                  ))}
                  <Button
                    icon="plus"
                    mode="outlined"
                    onPress={() => handleAddVariants()}
                    style={{
                      marginTop: 10,
                    }}
                    theme={{
                      colors: {
                        primary: COLOR_SETTINGS.PRIMARY,
                        outline: COLOR_SETTINGS.PRIMARY,
                      },
                    }}>
                    Tambah Varian
                  </Button>
                </View>
                <View style={globalStyle.formGroup}>
                  <TouchableOpacity
                    style={globalStyle.submitBtn}
                    onPress={() => handleSave()}>
                    <Feather name="save" style={globalStyle.submitBtnIcon} />
                    <Text style={globalStyle.submitBtnText}>Simpan</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
}
