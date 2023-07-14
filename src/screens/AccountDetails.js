// import React, { useEffect, useState } from 'react';
// import {
//   ScrollView,
//   Text,
//   ToastAndroid,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import AccountDetailsStyle from '../styles/AccountDetails.style';
// import globalStyle from '../styles/global.style';
// import Feather from 'react-native-vector-icons/Feather';
// import { TextInput } from '../components/Form';
// import { Button } from 'react-native-paper';
// import DocumentPicker, { types } from 'react-native-document-picker';
// import {
//   cantEmpty,
//   emailValidator,
//   numberValidator,
// } from '../helpers/validation';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from '../config/api';

// export default function AccountDetails({ navigation }) {
//   const [name, setName] = useState({ value: '', error: '' });
//   const [phone, setPhone] = useState({ value: '', error: '' });
//   const [email, setEmail] = useState({ value: '', error: '' });
//   const [address, setAddress] = useState({ value: '', error: '' });
//   const [postalCode, setPostalCode] = useState({ value: '', error: '' });
//   const [photo, setPhoto] = useState(null);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     getUserData();
//   }, []);

//   const getUserData = async () => {
//     try {
//       const userData = await AsyncStorage.getItem('user_data');
//       if (userData !== null) {
//         const newUser = JSON.parse(userData);
//         setName({ value: newUser?.nama, error: '' });
//         setPhone({ value: newUser?.no_telepon, error: '' });
//         setEmail({ value: newUser?.email, error: '' });
//         setAddress({ value: newUser?.alamat, error: '' });
//         setPostalCode({ value: newUser?.kode_pos, error: '' });
//         setUser(newUser);
//       }
//     } catch (e) {
//       setUser(null);
//     }
//   };

//   const handleSave = async () => {
//     const nameError = cantEmpty(name.value);
//     const phoneError = numberValidator(phone.value);
//     const emailError = emailValidator(email.value);
//     const addressError = cantEmpty(address.value);
//     const postalCodeError = cantEmpty(postalCode.value);
//     if (
//       nameError ||
//       phoneError ||
//       emailError ||
//       addressError ||
//       postalCodeError
//     ) {
//       setName({ ...name, error: nameError });
//       setPhone({ ...phone, error: phoneError });
//       setEmail({ ...email, error: emailError });
//       setAddress({ ...email, error: addressError });
//       setPostalCode({ ...email, error: postalCodeError });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('kd_user', user?.kd_user);
//     formData.append('nama', name.value);
//     formData.append('no_telepon', phone.value);
//     formData.append('email', email.value);
//     formData.append('alamat', address.value);
//     formData.append('kode_pos', postalCode.value);
//     if (photo !== null) {
//       formData.append('foto_profil', {
//         ...photo[0],
//       });
//     }
//     api
//       .post('/ubahuser', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       })
//       .then(({ data }) => {
//         ToastAndroid.show('Data Berhasil Disimpan', ToastAndroid.SHORT);
//         updateUserData(data);
//       })
//       .catch(() => {
//         ToastAndroid.show('Gagal Menyimpan Data', ToastAndroid.SHORT);
//       });
//   };

//   const updateUserData = async data => {
//     await AsyncStorage.setItem('user_data', JSON.stringify(data?.user));
//     await navigation.goBack();
//   };

//   return (
//     <View style={AccountDetailsStyle.container}>
//       <View style={AccountDetailsStyle.headerContainer}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Feather name="arrow-left" style={globalStyle.iconBtn} />
//         </TouchableOpacity>
//         <View>
//           <Text style={AccountDetailsStyle.appName}>Pengaturan Akun</Text>
//         </View>
//       </View>

//       <ScrollView>
//         <View style={globalStyle.paddingContainer}>
//           <TextInput
//             label="Nama Lengkap"
//             returnKeyType="next"
//             value={name.value}
//             onChangeText={text => setName({ value: text, error: '' })}
//             error={!!name.error}
//             errorText={name.error}
//           />
//           <TextInput
//             label="No. Telepon"
//             returnKeyType="next"
//             value={phone.value}
//             onChangeText={text => setPhone({ value: text, error: '' })}
//             error={!!phone.error}
//             errorText={phone.error}
//             keyboardType="phone-pad"
//           />
//           <TextInput
//             label="Email"
//             returnKeyType="next"
//             value={email.value}
//             onChangeText={text => setEmail({ value: text, error: '' })}
//             error={!!email.error}
//             errorText={email.error}
//             keyboardType="email-address"
//           />
//           <TextInput
//             label="Alamat"
//             returnKeyType="next"
//             value={address.value}
//             onChangeText={text => setAddress({ value: text, error: '' })}
//             error={!!address.error}
//             errorText={address.error}
//           />
//           <TextInput
//             label="Kode Pos"
//             returnKeyType="next"
//             value={String(postalCode.value)}
//             onChangeText={text => setPostalCode({ value: text, error: '' })}
//             error={!!postalCode.error}
//             errorText={postalCode.error}
//             keyboardType="numeric"
//           />
//           <Button
//             icon="camera"
//             mode="contained"
//             onPress={() => {
//               DocumentPicker.pick({
//                 type: types.images,
//               }).then(setPhoto);
//             }}>
//             {photo !== null ? photo[0]?.name : 'Pilih Foto Profil'}
//           </Button>
//           <View style={AccountDetailsStyle.btnSaveContainer}>
//             <TouchableOpacity
//               onPress={() => handleSave()}
//               style={AccountDetailsStyle.btnSave}>
//               <Feather name="save" style={AccountDetailsStyle.btnSaveIcon} />
//               <Text style={AccountDetailsStyle.btnSaveLabel}>Simpan</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
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
import globalStyle from '../styles/global.style';
import ChangePasswordStyle from '../styles/ChangePassword.style';
import { TextInput, Validation } from '../components/Form';
import { Divider, Modal, Portal, Provider, Snackbar } from 'react-native-paper';
import { validEmail } from '../helpers/validation';
import api from '../config/api';
import { Button } from 'react-native-paper';
import DocumentPicker, { types } from 'react-native-document-picker';
import { COLOR_SETTINGS } from '../database/AppData';
import AddItemStyle from '../styles/AddItem.style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AccountDetails({ navigation }) {
  const [user, setUser] = useState(null);
  const [validation, setValidation] = useState({
    name: [],
    phoneNumber: [],
    email: [],
    address: [],
    postalCode: [],
  });
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [snackbarInfo, setSnackbarInfo] = useState({
    visible: false,
    message: null,
  });
  const [areaVisible, setAreaVisible] = useState(false);
  const [postalCodeSearch, setPostalCodeSearch] = useState(null);
  const [areaList, setAreaList] = useState([]);
  const [biteshipAreaId, setBiteshipAreaId] = useState(null);

  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      if (userData !== null) {
        const parsedUser = JSON.parse(userData);
        setName(parsedUser?.nama);
        setPhoneNumber(parsedUser?.no_telepon);
        setEmail(parsedUser?.email);
        setAddress(parsedUser?.alamat);
        setPostalCode(
          parsedUser?.kode_pos && parsedUser?.biteship_area_id
            ? String(parsedUser?.kode_pos)
            : null,
        );
        setUser(parsedUser);
        setBiteshipAreaId(parsedUser?.biteship_area_id);
      }
    } catch (e) {
      setUser(null);
    }
  };

  const updateUserData = async data => {
    await AsyncStorage.setItem('user_data', JSON.stringify(data?.user));
    await navigation.goBack();
  };

  const handleSave = () => {
    for (const key in validation) {
      if (validation[key].length > 0) {
        setSnackbarInfo({ visible: true, message: 'Harap Periksa Kembali' });
        return;
      }
    }
    const formData = new FormData();
    formData.append('kd_user', user?.kd_user);
    formData.append('nama', name);
    formData.append('no_telepon', phoneNumber);
    formData.append('email', email);
    formData.append('alamat', address);
    formData.append('kode_pos', postalCode);
    formData.append('biteship_area_id', biteshipAreaId);
    if (photo !== null) {
      formData.append('foto_profil', {
        ...photo[0],
      });
    }
    api
      .post('/ubahuser', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(({ data }) => {
        if (data.Error === 0) {
          ToastAndroid.show('Data Berhasil Disimpan', ToastAndroid.SHORT);
          updateUserData(data);
        } else {
          setSnackbarInfo({ visible: true, message: data?.Message });
        }
      })
      .catch(() => {
        setSnackbarInfo({ visible: true, message: 'Gagal Menyimpan Data' });
      });
  };

  const handleChangeName = text => {
    setName(text);

    // validation rules
    const nameValidation = [];
    if (text === null || text === '') {
      nameValidation.push({
        title: 'Nama lengkap harap diisi',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      name: nameValidation,
    });
  };

  const handleChangePhoneNumber = text => {
    setPhoneNumber(text);

    // validation rules
    const phoneNumberValidation = [];
    if (text === null || text === '') {
      phoneNumberValidation.push({
        title: 'No. Telepon harap diisi',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      phoneNumber: phoneNumberValidation,
    });
  };

  const handleChangeEmail = text => {
    setEmail(text);

    // validation rules
    const emailValidation = [];
    if (text === null || text === '') {
      emailValidation.push({
        title: 'Email harap diisi',
        icon: 'error',
      });
    }
    if (!validEmail(text)) {
      emailValidation.push({
        title: 'Email tidak valid',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      email: emailValidation,
    });
  };

  const handleChangeAddress = text => {
    setAddress(text);

    // validation rules
    const addressValidation = [];
    if (text === null || text === '') {
      addressValidation.push({
        title: 'Alamat lengkap harap diisi',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      address: addressValidation,
    });
  };

  const handleChangePostalCode = text => {
    setPostalCode(text);

    // validation rules
    const postalCodeValidation = [];
    if (text === null || text === '') {
      postalCodeValidation.push({
        title: 'Kode pos harap diisi',
        icon: 'error',
      });
    }
    setValidation({
      ...validation,
      postalCode: postalCodeValidation,
    });
  };

  const handleDismissSnackbar = () => {
    setSnackbarInfo({
      visible: false,
      message: null,
    });
  };

  const handleCloseArea = () => {
    setAreaVisible(false);
  };

  const handleOpenArea = () => {
    setAreaVisible(true);
  };

  const handleSearchPostal = () => {
    const params = {
      input: postalCodeSearch,
    };
    api.get('/biteshipmaps', { params }).then(({ data }) => {
      setAreaList(data?.data);
    });
  };

  const renderArea = () => {
    return (
      <View>
        <View style={AddItemStyle.modalHeader}>
          <View>
            <Text style={AddItemStyle.modalTitle}>Cari Kode Pos</Text>
          </View>
          <TouchableOpacity onPress={() => handleCloseArea()}>
            <MaterialCommunityIcons
              name="close-thick"
              style={AddItemStyle.modalCloseIcon}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            inputProps={{
              value: postalCodeSearch,
              onChangeText: setPostalCodeSearch,
              placeholder: 'Kode Pos',
              keyboardType: 'numeric',
              returnKeyType: 'search',
              onSubmitEditing: () => {
                handleSearchPostal();
              },
            }}
          />
        </View>
        <ScrollView>
          {areaList?.length < 1 ? (
            <View style={AddItemStyle.fileInfoContainer}>
              <Text style={AddItemStyle.fileInfo}>
                {postalCodeSearch
                  ? 'Kode Pos Tidak Ditemukan'
                  : 'Harap Isi Kode Pos'}
              </Text>
            </View>
          ) : (
            <View>
              {areaList.map((data, index) => (
                <View key={index}>
                  <TouchableOpacity
                    style={AddItemStyle.categoryItem}
                    onPress={() => {
                      setPostalCode(String(data?.postal_code));
                      setBiteshipAreaId(data?.id);
                      handleCloseArea();
                    }}>
                    <Text style={AddItemStyle.categoryName}>{data?.name}</Text>
                  </TouchableOpacity>
                  {areaList.length - 1 !== index && <Divider />}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={areaVisible}
          onDismiss={() => {
            handleCloseArea();
          }}
          contentContainerStyle={AddItemStyle.modalContainer}>
          {renderArea()}
        </Modal>
      </Portal>
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
            <Text style={globalStyle.appName}>Ubah Informasi Akun</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={globalStyle.paddingHorizontal}>
            <Text style={ChangePasswordStyle.subTitle}>
              Harap lengkapi semua isian yang ada
            </Text>

            <View style={ChangePasswordStyle.form}>
              <View style={globalStyle.formGroup}>
                <TextInput
                  label="Nama Lengkap"
                  inputProps={{
                    value: name,
                    onChangeText: handleChangeName,
                    autoCapitalize: 'words',
                    autoCorrect: false,
                    returnKeyType: 'next',
                    onSubmitEditing: () => {
                      phoneNumberRef.current.focus();
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
                  ref={phoneNumberRef}
                  label="No. Telepon"
                  inputProps={{
                    value: phoneNumber,
                    onChangeText: handleChangePhoneNumber,
                    keyboardType: 'phone-pad',
                    returnKeyType: 'next',
                    onSubmitEditing: () => {
                      emailRef.current.focus();
                    },
                  }}
                />
              </View>
              {validation.phoneNumber.length > 0 && (
                <View style={globalStyle.formGroup}>
                  <Validation data={validation.phoneNumber} />
                </View>
              )}
              <View style={globalStyle.formGroup}>
                <TextInput
                  ref={emailRef}
                  label="Email"
                  inputProps={{
                    value: email,
                    onChangeText: handleChangeEmail,
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    autoComplete: 'email',
                    keyboardType: 'email-address',
                    returnKeyType: 'next',
                    onSubmitEditing: () => {
                      addressRef.current.focus();
                    },
                  }}
                />
              </View>
              {validation.email.length > 0 && (
                <View style={globalStyle.formGroup}>
                  <Validation data={validation.email} />
                </View>
              )}
              <View style={globalStyle.formGroup}>
                <TextInput
                  label="Alamat Lengkap"
                  inputProps={{
                    value: address,
                    onChangeText: handleChangeAddress,
                    returnKeyType: 'next',
                    multiline: true,
                    onSubmitEditing: () => {
                      handleOpenArea();
                    },
                  }}
                />
              </View>
              {validation.address.length > 0 && (
                <View style={globalStyle.formGroup}>
                  <Validation data={validation.address} />
                </View>
              )}
              <TouchableOpacity
                onPress={() => handleOpenArea()}
                style={globalStyle.formGroup}>
                <TextInput
                  label="Kode Pos"
                  inputProps={{
                    value: postalCode,
                    editable: false,
                  }}
                />
              </TouchableOpacity>
              {validation.postalCode.length > 0 && (
                <View style={globalStyle.formGroup}>
                  <Validation data={validation.postalCode} />
                </View>
              )}
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
                  {photo !== null ? photo[0]?.name : 'Pilih Foto Profil'}
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
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
}
