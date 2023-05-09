import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import MyCart from './src/screens/MyCart';
import ProductInfo from './src/screens/ProductInfo';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import OrderList from './src/screens/OrderList';
import ProductByCategory from './src/screens/ProductByCategory';
import AccountDetails from './src/screens/AccountDetails';
import PaymentView from './src/screens/PaymentView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR_SETTINGS, USER_LEVEL } from './src/database/AppData';
import SearchProduct from './src/screens/SearchProduct';
import Loading from './src/screens/Loading';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Account from './src/screens/Admin/Account';
import ChangePassword from './src/screens/ChangePassword';

const OnProgressScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>1</Text>
    </View>
  );
};

const OnProgressScreen2 = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>2</Text>
    </View>
  );
};

const OnProgressScreen3 = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>4</Text>
    </View>
  );
};

const OrderScreen = () => {
  const OrderStack = createNativeStackNavigator();
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen name="Order" component={OnProgressScreen} />
    </OrderStack.Navigator>
  );
};

const ItemScreen = () => {
  const ItemStack = createNativeStackNavigator();
  return (
    <ItemStack.Navigator>
      <ItemStack.Screen name="Item" component={OnProgressScreen2} />
    </ItemStack.Navigator>
  );
};

const ReportScreen = () => {
  const ReportStack = createNativeStackNavigator();
  return (
    <ReportStack.Navigator>
      <ReportStack.Screen name="Report" component={OnProgressScreen3} />
    </ReportStack.Navigator>
  );
};

const AccountScreen = () => {
  const AccountStack = createNativeStackNavigator();
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AccountStack.Screen name="Account" component={Account} />
      <AccountStack.Screen name="ChangePassword" component={ChangePassword} />
    </AccountStack.Navigator>
  );
};

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [userData, setUserData] = useState('waiting');

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const newUserData = await AsyncStorage.getItem('user_data');
      if (newUserData !== null) {
        setUserData(JSON.parse(newUserData));
      } else {
        setUserData(null);
      }
    } catch (e) {
      setUserData(null);
    }
  };

  return (
    <NavigationContainer>
      {userData?.level === USER_LEVEL?.CASHIER ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Pesanan') {
                iconName = focused ? 'receipt' : 'receipt-outline';
              } else if (route.name === 'Data Barang') {
                iconName = focused ? 'pricetags' : 'pricetags-outline';
              } else if (route.name === 'Laporan') {
                iconName = focused
                  ? 'document-attach'
                  : 'document-attach-outline';
              } else if (route.name === 'Akun') {
                iconName = focused ? 'person' : 'person-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: COLOR_SETTINGS.PRIMARY,
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarStyle: { height: 60 },
            tabBarLabelStyle: {
              fontFamily: 'Lora-SemiBold',
              marginBottom: 7,
            },
          })}>
          <Tab.Screen name="Pesanan" component={OrderScreen} />
          <Tab.Screen name="Data Barang" component={ItemScreen} />
          <Tab.Screen name="Laporan" component={ReportScreen} />
          <Tab.Screen name="Akun" component={AccountScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {userData === 'waiting' ? (
            <Stack.Screen name="Loading" component={Loading} />
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="MyCart" component={MyCart} />
              <Stack.Screen name="ProductInfo" component={ProductInfo} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="OrderList" component={OrderList} />
              <Stack.Screen
                name="ProductByCategory"
                component={ProductByCategory}
              />
              <Stack.Screen name="AccountDetails" component={AccountDetails} />
              <Stack.Screen name="PaymentView" component={PaymentView} />
              <Stack.Screen name="SearchProduct" component={SearchProduct} />
            </>
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
