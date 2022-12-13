import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfileScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import ChatScreen from './screens/ChatScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ResetPassScreen from './screens/ResetPassScreen';

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
const reducers = combineReducers({ user });
import user from "./reducers/user";
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
      tabBarActiveTintColor: '#e8be4b',
      tabBarInactiveTintColor: '#b2b2b2',
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
  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name='login' component={LoginScreen} />
        <Stack.Screen name='signup' component={SignupScreen} />
        <Stack.Screen name='reset' component={ResetPassScreen} />
        <Stack.Screen name='TabNavigator' component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </PersistGate>
    </Provider>
  );
}


