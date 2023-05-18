import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  FlatList,
  Item,
  VirtualizedList,
} from "react-native";
//import CheckBox from '@react-native-community/checkbox';
import Checkbox from "expo-checkbox";
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import "@fontsource/fredoka-one"
// import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
//import { useFonts } from 'expo-font';
import * as Font from "expo-font";

//import des hooks d'effets
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// import des reducers
import { decrement, increment } from "../reducers/counter";

//import des screens pour la bottombar
import AccueilScreen from "./AccueilScreen";
import FavorisScreen from "./FavorisScreen";
import ProfilsScreen from "./ProfilsScreen";

const Tab = createBottomTabNavigator();

//import de .env front
import { ADDRESSE_BACKEND } from "@env";

export default function MaSemaineScreen({ navigation }) {
  //fonction counter avec reducer nb de personnes par repas
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.value);
  const [counterRepas, setCounterRepas] = useState();
  const counter = users.nbPersonne;
  const [isChecked, setChecked] = useState(false);
  const [nbPersonneSemaine, setNbPersonneSemaine] = useState(""); // mettre nb personne enrgistré dans profil
  const pickerRef = useRef();

  // états pour le boutons switch/toggle Semaine
  const [isEnabledSemaine, setIsEnabledSemaine] = useState(false);
  const toggleSwitchSemaine = () =>
    setIsEnabledSemaine((previousState) => !previousState);
  // états pour le boutons switch/toggle Semaine
  const [isEnabledWeekEnd, setIsEnabledWeekEnd] = useState(false);
  const toggleSwitchWeekEnd = () =>
    setIsEnabledWeekEnd((previousState) => !previousState);

  // fetch nb de personnes enregistrées dans Profil
  const decrementSubmit = () => {
    fetch(`${ADDRESSE_BACKEND}/nbPersonne/:token`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        {
          counterRepas;
        }

        dispatch(decrement(counter));
        setCounterRepas(data);
      });
  };

  // {/* <TouchableOpacity style={styles.decrementBtn} onPress={() => decrementSubmit()}><Text>-</Text></TouchableOpacity>
  //         <Text className={styles.counter}></Text>
  //         <TouchableOpacity style={styles.incrementBtn}  onPress={() => dispatch(increment())}><Text>+</Text></TouchableOpacity> */}

  // useEffect(() => {
  //   fetch(`${ADDRESSE_BACKEND}`/${users.token}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.user)
  //       setNbPersonneSemaine(nbPersonneSemaine)
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch(`${ADDRESSE_BACKEND}`/users/nbPersonne/${users.token}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data)
  //       //setNbPersonneSemaine(nbPersonneSemaine)
  //     });
  // }, []);

  // var responseClone; // 1
  // fetch(`${ADDRESSE_BACKEND}`/users/${users.token}`)
  // .then(function (response) {
  //     responseClone = response.clone(); // 2
  //     return response.json();
  // })
  // .then(function (data) {
  //     // Do something with data
  // }, function (rejectionReason) { // 3
  //     console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
  //     responseClone.text() // 5
  //     .then(function (bodyText) {
  //         console.log('Received the following instead of valid JSON:', bodyText); // 6
  //     });
  // });

  // dataList pour nb de personnes par repas

  let items = [];
  for (let i = 1; i < 11; i++) {
    j = i.toString();
    items.push(<Picker.Item key={j} label={j} value={j} />);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowToggleSemaine}>
        <Text>Tous les repas de la semaine</Text>

        <Switch
          trackColor={{ false: "#767577", true: "#78CB26" }}
          thumbColor={isEnabledSemaine ? "#fff" : "#fff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitchSemaine}
          value={isEnabledSemaine}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.jour}>
          <Text style={styles.text}>Lundi :</Text>

          <Picker
            ref={pickerRef}
            selectedValue={nbPersonneSemaine}
            onValueChange={(itemValue, itemIndex) =>
              setNbPersonneSemaine(itemValue)
            }
          >
            {items}
          </Picker>
        </View>

        <View style={styles.rowCheckbox}>
          <View style={styles.containerCheckbox}>
            <Checkbox
              style={styles.checkbox}
              disabled={false}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#E4631B" : undefined}
            />

            <Text>Midi</Text>
          </View>
          <View style={styles.containerCheckbox}>
            <Checkbox
              style={styles.checkbox}
              disabled={false}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#E4631B" : undefined}
            />
            <Text>Soir</Text>
          </View>

          <View style={styles.containerCheckbox}>
            <Checkbox
              style={styles.checkbox}
              disabled={false}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#E4631B" : undefined}
            />
            <Text>Les 2</Text>
          </View>
        </View>

        <View style={styles.rowToggleWeekEnd}>
          <Text>WeekEnd</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#78CB26" }}
            thumbColor={isEnabledWeekEnd ? "#fff" : "#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchWeekEnd}
            value={isEnabledWeekEnd}
          />
        </View>

        <View style={styles.iconHeart}>
          <TouchableOpacity>
            <FontAwesome name="heart-o" size={40} color="#78CB26" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.submitDiv}>
        <TouchableOpacity
          style={styles.submit}
          onPress={() => planifionsSemaine()}
        >
          <Text styme={styles.buttonText}>Planifions ma semaine</Text>
        </TouchableOpacity>
      </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    //alignItems: 'center',
  },
  rowToggleSemaine: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    backgroundColor: "rgba(	120, 203, 38, 0.4)",

    marginHorizontal: 20,
    flexDirection: "column",
    //alignItems: 'center'
  },

  jour: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
    marginTop: 10,
  },

  counter: {
    height: 10,
  },
  text: {
    fontSize: 20,
  },

  rowCheckbox: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },

  containerCheckbox: {
    flexDirection: "row",
    //justifyContent: 'space-between',
    marginRight: 10,
  },
  checkbox: {
    alignSelf: "center",
    marginRight: 10,
  },

  rowToggleWeekEnd: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  iconHeart: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
  },
  submitDiv: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 60,
    backgroundColor: "#E4631B",
    fontFamily: "Fredoka One",
    fontSize: 20,
    borderRadius: 10,
    width: "90%",
    height: "10%",
  },

  buttonText: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
});
