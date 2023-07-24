import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import globalStyle from '../../styles/global.style';
import ChangePasswordStyle from '../../styles/ChangePassword.style';
import { TextInput, Validation } from '../../components/Form';
import { ActivityIndicator, Snackbar } from 'react-native-paper';
import { validEmail } from '../../helpers/validation';
import api from '../../config/api';
import { Button } from 'react-native-paper';
import DocumentPicker, { types } from 'react-native-document-picker';
import { COLOR_SETTINGS } from '../../database/AppData';

export default function EditCategory({ route, navigation }) {
  const { kd_kategori, nama, keterangan } = route.params;
  const [validation, setValidation] = useState({
    name: [],
  });
  const [name, setName] = useState(nama ?? null);
  const [description, setDescription] = useState(keterangan ?? null);
  const [photo, setPhoto] = useState(null);
  const [snackbarInfo, setSnackbarInfo] = useState({
    visible: false,
    message: null,
  });
  const [saving, setSaving] = useState(false);

  const descriptionRef = useRef();

  const handleSave = () => {
    for (const key in validation) {
      if (validation[key].length > 0) {
        setSnackbarInfo({ visible: true, message: 'Harap Periksa Kembali' });
        return;
      }
    }
    const formData = new FormData();
    formData.append('kd_kategori', kd_kategori);
    formData.append('nama', name);
    formData.append('keterangan', description);
    if (photo !== null) {
      formData.append('foto', {
        ...photo[0],
      });
      console.log(kd_kategori);
      console.log(name);
      console.log(description);
      console.log(photo[0]);
    }
    setSaving(true);
    api
      .post('/ubahkategori', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        setSaving(false);
        if (data.Error === 0) {
          ToastAndroid.show('Data Berhasil Disimpan', ToastAndroid.SHORT);
          navigation.goBack();
        } else {
          setSnackbarInfo({ visible: true, message: data?.Message });
        }
      })
      .catch(() => {
        setSaving(false);
        setSnackbarInfo({ visible: true, message: 'Gagal Menyimpan Data' });
      });
  };

  const handleChangeName = text => {
    setName(text);

    // validation rules
    const nameValidation = [];
    if (text === null || text === '') {
      nameValidation.push({
        title: 'Nama kategori harap diisi',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      name: nameValidation,
    });
  };

  const handleDismissSnackbar = () => {
    setSnackbarInfo({
      visible: false,
      message: null,
    });
  };

  return (
    <View style={[globalStyle.container, globalStyle.pRelative]}>
      <Snackbar
        visible={snackbarInfo.visible}
        onDismiss={handleDismissSnackbar}>
        {snackbarInfo.message}
      </Snackbar>
      <View style={globalStyle.headerContainer}>
        <TouchableOpacity
          style={globalStyle.paddingContainer}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" style={globalStyle.iconBtn} />
        </TouchableOpacity>
        <View>
          <Text style={globalStyle.appName}>Edit Kategori</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={globalStyle.paddingHorizontal}>
          <View style={ChangePasswordStyle.form}>
            <View style={globalStyle.formGroup}>
              <TextInput
                label="Nama Kategori"
                inputProps={{
                  value: name,
                  onChangeText: handleChangeName,
                  autoCapitalize: 'words',
                  autoCorrect: false,
                  returnKeyType: 'next',
                  onSubmitEditing: () => {
                    descriptionRef.current.focus();
                  },
                }}
              />
            </View>
            {validation.name.length > 0 && (
              <View style={globalStyle.formGroup}>
                <Validation data={validation.name} />
              </View>
            )}
            <View style={globalStyle.formGroup}>
              <TextInput
                ref={descriptionRef}
                label="Deskripsi"
                inputProps={{
                  value: description,
                  onChangeText: setDescription,
                  autoCapitalize: 'words',
                  returnKeyType: 'done',
                }}
              />
            </View>
            <View style={globalStyle.formGroup}>
              <Button
                icon="camera"
                mode="outlined"
                onPress={() => {
                  DocumentPicker.pick({
                    type: types.images,
                  })
                    .then(setPhoto)
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
                {photo !== null ? photo[0]?.name : 'Pilih Foto Kategori'}
              </Button>
            </View>
            <View style={globalStyle.formGroup}>
              <TouchableOpacity
                style={globalStyle.submitBtn}
                onPress={() => handleSave()}>
                {saving ? (
                  <ActivityIndicator
                    size="small"
                    color={COLOR_SETTINGS.WHITE}
                    style={{
                      marginRight: 5,
                    }}
                  />
                ) : (
                  <Feather name="save" style={globalStyle.submitBtnIcon} />
                )}
                <Text style={globalStyle.submitBtnText}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
