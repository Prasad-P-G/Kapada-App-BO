import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash/Splash';
import Login from '../screens/Login/Login';
import Home from '../screens/Home/Home';
import Cart from '../screens/Cart/Cart';
import Details from '../screens/Details/Details';
import Whishlist from '../screens/Whishlist/Whishlist';
import UploadBanners from '../screens/UploadBanners/UploadBanners';

const Stack = createNativeStackNavigator();

const StackRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Whishlist" component={Whishlist} />
      <Stack.Screen name="UploadBanners" component={UploadBanners} />
    </Stack.Navigator>
  );
};

export default StackRoutes;
