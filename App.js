import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import users from "./reducers/users";
import recettes from "./reducers/recettes";
<<<<<<< HEAD
import semaines from "./reducers/semaines";
=======
import semaine from "./reducers/semaine";
import recettesFavorites from "./reducers/recettesFavorites";
>>>>>>> gestionRecettesFavorites

import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/types";
//import du hook pour les fonts
import { useFonts } from "expo-font";

<<<<<<< HEAD
const reducers = combineReducers({ users, recettes, semaines });
=======
const reducers = combineReducers({
  users,
  recettes,
  semaine,
  recettesFavorites,
});
>>>>>>> gestionRecettesFavorites
const persistConfig = { key: "foodPlaner", storage: AsyncStorage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

import AccueilScreen from "./screens/AccueilScreen";
import LandingPageScreen from "./screens/LandingPageScreen";
import FavorisScreen from "./screens/FavorisScreen";
import ProfilsScreen from "./screens/ProfilsScreen";
import MaSemaineScreen from "./screens/MaSemaineScreen";
import ConnexionScreen from "./screens/ConnexionScreen";
import CreateProfilScreen from "./screens/CreateProfilScreen";
import SemainierScreen from "./screens/SemainierScreen";
import CameraScreen from "./screens/CameraScreen";
import SuggestionScreen from "./screens/SuggestionScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";
import SemainierTestScreen from "./screens/SemainierTestScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
          } else if (route.name === "Accueil") {
            iconName = "home";
          } else if (route.name === "Profils") {
            iconName = "user-circle";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: "#FDFEFE",
        tabBarInactiveTintColor: "#979A9A",
        tabBarLabelStyle: { color: "white" },
        tabBarStyle: styleTabBar,
        initialRouteName: "Ma Semaine",
        tabBarBadgeStyle: { backgroundColor: "red" },
      })}
    >
      <Tab.Screen name="Favoris" component={FavorisScreen} />
      <Tab.Screen name="Accueil" component={AccueilScreen} />
      <Tab.Screen name="Profils" component={ProfilsScreen} />
    </Tab.Navigator>
  );
};
export default function App() {
  //utilisation des fonts
  const [loaded] = useFonts({
    Fredoka: require("./assets/fonts/Fredoka-Regular.ttf"),
    FredokaBold: require("./assets/fonts/Fredoka_Condensed-Bold.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screensOption={{ headerShown: false }}
            // headerMode={false}
          >
<<<<<<< HEAD
            <Stack.Screen name="Ma Semaine" component={MaSemaineScreen} />
            
=======
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
>>>>>>> gestionRecettesFavorites
            <Stack.Screen name=" " component={LandingPageScreen} />
            <Stack.Screen name="Semainier" component={SemainierScreen} />
            <Stack.Screen
              name="CreateProfilScreen"
              component={CreateProfilScreen}
            />
            <Stack.Screen name="ConnexionScreen" component={ConnexionScreen} />
<<<<<<< HEAD
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="SemainierTest" component={SemainierTestScreen} />
=======

            <Stack.Screen name="Ma Semaine" component={MaSemaineScreen} />

>>>>>>> gestionRecettesFavorites
            <Stack.Screen name="CameraScreen" component={CameraScreen} />
            <Stack.Screen name="Semainier" component={SemainierScreen} />
            <Stack.Screen name="Suggestion" component={SuggestionScreen} />
            <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
