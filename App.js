import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
//import storage from "redux-persits/lib/storage";

const reducers = combineReducers({ user });
const persistConfig = { key: "users" };

const store = configureStore({
  reducer: persitsReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

import AccueilScreen from "./screens/AccueilScreen";
import LandingPageScreen from "./screens/LandingPageScreen";
import FavorisScreen from "./screens/FavorisScreen";
import ProfilsScreen from "./screens/ProfilsScreen";
import MaSemaineScreen from "./screens/MaSemaineScreen";
import ConnexionScreen from "./screens/ConnexionScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**Logo  */
//heart : heart-o/
//Home : home
//
styleTabBar = {
  backgroundColor: "#E4631B",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
};
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Favoris") {
            iconName = "heart-o";
          } else if (route.name === "Ma Semaine") {
            iconName = "home";
          } else if (route.name === "Profils") {
            iconName = "user-circle";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FDFEFE",
        tabBarInactiveTintColor: "#979A9A",
        headerShown: false,
        tabBarLabelStyle: { color: "white" },
        tabBarStyle: styleTabBar,
        initialRouteName: "Ma Semaine",
        tabBarBadgeStyle: { backgroundColor: "red" },
      })}
    >
      <Tab.Screen name="Favoris" component={FavorisScreen} />
      <Tab.Screen name="Ma Semaine" component={MaSemaineScreen} />
      <Tab.Screen name="Profils" component={ProfilsScreen} />
    </Tab.Navigator>
  );
};
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screensOption={{ headerShown: false }}>
            <Stack.Screen
              name="LandingPageScreen"
              component={LandingPageScreen}
            />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Tab.Screen name="AccueilScreen" component={AccueilScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
