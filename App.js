import React, { createContext, useEffect, useState } from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Account from './src/screens/Admin/Account';
import ChangePassword from './src/screens/ChangePassword';
import UserList from './src/screens/Admin/UserList';
import AddUser from './src/screens/Admin/AddUser';
import UserDetail from './src/screens/Admin/UserDetail';
import ItemList from './src/screens/Admin/ItemList';
import ItemDetail from './src/screens/Admin/ItemDetail';
import AddItem from './src/screens/Admin/AddItem';
import EditItem from './src/screens/Admin/EditItem';
import Categories from './src/screens/Admin/Categories';
import AddCategory from './src/screens/Admin/AddCategory';
import EditCategory from './src/screens/Admin/EditCategory';
import { default as OrderListAdmin } from './src/screens/Admin/OrderList';
import { default as OrderDetailAdmin } from './src/screens/Admin/OrderDetail';
import OrderDetail from './src/screens/OrderDetail';
import ReportAdmin from './src/screens/Admin/ReportAdmin';

const OrderScreen = () => {
  const OrderStack = createNativeStackNavigator();
  return (
    <OrderStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <OrderStack.Screen name="OrderListAdmin" component={OrderListAdmin} />
      <OrderStack.Screen name="OrderDetailAdmin" component={OrderDetailAdmin} />
    </OrderStack.Navigator>
  );
};

const ItemScreen = () => {
  const ItemStack = createNativeStackNavigator();
  return (
    <ItemStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ItemStack.Screen name="ItemList" component={ItemList} />
      <ItemStack.Screen name="ItemDetail" component={ItemDetail} />
      <ItemStack.Screen name="AddItem" component={AddItem} />
      <ItemStack.Screen name="EditItem" component={EditItem} />
      <ItemStack.Screen name="Categories" component={Categories} />
      <ItemStack.Screen name="AddCategory" component={AddCategory} />
      <ItemStack.Screen name="EditCategory" component={EditCategory} />
    </ItemStack.Navigator>
  );
};

const ReportScreen = () => {
  const ReportStack = createNativeStackNavigator();
  return (
    <ReportStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ReportStack.Screen name="ReportAdmin" component={ReportAdmin} />
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
      <AccountStack.Screen name="UserList" component={UserList} />
      <AccountStack.Screen name="AddUser" component={AddUser} />
      <AccountStack.Screen name="UserDetail" component={UserDetail} />
      <AccountStack.Screen name="AccountDetails" component={AccountDetails} />
    </AccountStack.Navigator>
  );
};

export const Context = createContext();

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const [userData, setUserData] = useState('waiting');

  useEffect(() => {
    getUserData();
  }, [AsyncStorage.getItem('user_data')]);

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
    <Context.Provider
      value={{
        setData: setUserData,
      }}>
      <NavigationContainer>
        {userData?.level === USER_LEVEL?.OWNER ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Produk') {
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
            <Tab.Screen name="Produk" component={ItemScreen} />
            <Tab.Screen name="Laporan" component={ReportScreen} />
            <Tab.Screen name="Akun" component={AccountScreen} />
          </Tab.Navigator>
        ) : userData?.level === USER_LEVEL?.CASHIER ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Pesanan') {
                  iconName = focused ? 'receipt' : 'receipt-outline';
                } else if (route.name === 'Produk') {
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
            <Tab.Screen name="Produk" component={ItemScreen} />
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
                <Stack.Screen
                  name="AccountDetails"
                  component={AccountDetails}
                />
                <Stack.Screen name="PaymentView" component={PaymentView} />
                <Stack.Screen name="SearchProduct" component={SearchProduct} />
                <Stack.Screen name="OrderDetail" component={OrderDetail} />

                {/* JANGAN DIHAPUS */}
                <Stack.Screen name="Pesanan" component={OrderScreen} />
                <Stack.Screen name="Produk" component={ItemScreen} />
              </>
            )}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Context.Provider>
  );
};

export default App;
