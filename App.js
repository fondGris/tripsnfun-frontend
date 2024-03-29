import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import ChatScreen from './screens/ChatScreen';
import IndexLoginScreen from './screens/IndexLoginScreen';
import SignupScreen from './screens/SignupScreen'
import LoginScreen from './screens/LoginScreen';
import ResetPassScreen from './screens/ResetPassScreen';
import UserScreen from './screens/UserScreen';

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
const reducers = combineReducers({ user });
import user from "./reducers/user";

// SplashScreen.preventAutoHideAsync();

const persistConfig = { key: "tripsnfun", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {


  
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
        //icone pour home
        if (route.name === 'Home') {
          iconName = 'home';
          // icone pour mon profile
        } else if (route.name === 'MyProfile') {
          iconName = 'address-card';
          // icone pour favorite buddies
        } else if (route.name === 'Buddies') {
          iconName = 'users';
          // icone pour chat
        } else if (route.name === 'Chat') {
          iconName = 'comments'
        }
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#05898E',
      tabBarInactiveTintColor: '#888',
      headerShown: false,
    })}>

      <Tab.Screen name='Home' component={MapScreen} />
      <Tab.Screen name='MyProfile' component={ProfileScreen} />
      <Tab.Screen name='Buddies' component={FavoriteScreen} />
      <Tab.Screen name='Chat' component={ChatScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    'MontserratAlternatesBlack': require('./assets/fonts/MontserratAlternatesBlack.ttf'),
    'MontserratAlternatesBold': require('./assets/fonts/MontserratAlternatesBold.ttf'),
    'MontserratAlternatesSemiBold': require('./assets/fonts/MontserratAlternatesSemiBold.ttf'),
    'MontserratAlternatesRegular': require('./assets/fonts/MontserratAlternatesRegular.ttf'),
    'MontserratAlternatesMedium': require('./assets/fonts/MontserratAlternatesMedium.ttf'),
    'MontserratAlternatesLight': require('./assets/fonts/MontserratAlternatesLight.ttf'),
    'RobotoLight': require('./assets/fonts/RobotoLight.ttf'),
    'RobotoBold': require('./assets/fonts/RobotoBold.ttf'),
    'RobotoRegular': require('./assets/fonts/RobotoRegular.ttf'),
    'RobotoLight': require('./assets/fonts/RobotoLight.ttf'),
});
const onLayoutRootView = useEffect( () => {
 async function loadFont (){
  if (fontsLoaded) {
    await SplashScreen.hideAsync();
  }
 }
 loadFont()

}, [fontsLoaded]);
if (!fontsLoaded) {
  return null;
}
// console.log('fontsLoaded',fontsLoaded);
  return (
    <Provider store={store} 
    // onLayout={onLayoutRootView}
    >
    <PersistGate persistor={persistor}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name='indexLogin' component={IndexLoginScreen} />
        <Stack.Screen name='login' component={LoginScreen} />
        <Stack.Screen name='signup' component={SignupScreen} />
        <Stack.Screen name='reset' component={ResetPassScreen} />
        <Stack.Screen name='user' component={UserScreen} />
        <Stack.Screen name='Chat' component={ChatScreen} />
        <Stack.Screen name='Buddies' component={FavoriteScreen} />
        <Stack.Screen name='TabNavigator' component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}


