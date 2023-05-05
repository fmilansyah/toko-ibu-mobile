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
import { USER_LEVEL } from './src/database/AppData';

const App = () => {
  const Stack = createNativeStackNavigator();
  const [userData, setUserData] = useState('waiting');

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const newUserData = await AsyncStorage.getItem('user_data');
      if (newUserData !== null) {
        setUserData(JSON.parse(newUserData));
      }
    } catch (e) {
      setUserData(null);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userData?.level === 'waiting' ? (
          <></>
        ) : userData?.level === USER_LEVEL.OWNER ? (
          <></>
        ) : userData?.level === USER_LEVEL.CASHIER ? (
          <></>
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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
