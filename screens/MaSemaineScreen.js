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
//import { NativeBaseProvider, Checkbox } from "native-base";
// import BouncyCheckboxGroup, {
//   ICheckboxButton,
// } from "react-native-bouncy-checkbox-group";
//import SelectMultiple from 'react-native-select-multiple'
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import "@fontsource/fredoka-one"
//import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
//import { useFonts } from 'expo-font';
import * as Font from "expo-font";

import { addSemaine } from "../reducers/semaine";

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

const BACKEND_ADDRESS = "http://10.2.0.221:3000"; // exp://10.2.1.16:19000
//import de .env front
import { ADDRESSE_BACKEND } from "@env";

export default function MaSemaineScreen({ navigation }) {
  //fonction counter avec reducer nb de personnes par repas
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const [userState, setUserState] = useState({ ...user });

  //const semaine = useSelector((state) => state.semaine.value);
  const [counterRepas, setCounterRepas] = useState();
  const counter = user.nbPersonne;
  //const [isChecked, setChecked] = useState(false);
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
  useEffect(() => {
    fetch(`http://10.2.0.221:3000/users/nbPersonne/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(user.token);
        console.log(data);
        setNbPersonneSemaine(nbPersonneSemaine);
      });
  }, []);

  // dataList pour nb de personnes par repas
  let items = [];
  for (let i = 1; i < 11; i++) {
    j = i.toString();
    items.push(<Picker.Item key={j} label={j} value={j} />);
  }

  //variables d'état pour chaquejour/ chaque repas
  const [lundiMidi, setLundiMidi] = useState(false);
  const [lundiSoir, setLundiSoir] = useState(false);
  const [lundiRepas, setLundiRepas] = useState(false);

  // useEffect(() =>{
  //   setUserState({...userState, semaine})
  // }, [semaine])

  // bouton ajout du repas dans la semaine
  // const handleOnChange = () => {
  //   fetch(`http://10.2.0.221:3000/users/newsemaine/${user.token}`, {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({}),
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //       // Dispatch Redux store les repas choisis
  //       if (data) {
  //         //dispatch(addSemaine(jour: , midi: value , soir: repas: nbPersonneSemaine: nbPersonneSemaine))
  //         setLundiMidi(!lundiMidi);
  //         console.log(data)
  //       };
  //       }
  //     );
  // };

  //effet pour le bouton favori si cliqué
  // let iconHeart = {};
  //   if () {
  //     iconHeart = { 'color': '#E9BE59' };
  //   }

  const [isDisabled, setIsDisabled] = useState(false);
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setChecked] = useState(false);

  const listData = [
    { id: "1", value: "Midi" },
    { id: "2", value: "Soir" },
    { id: "3", value: "les 2" },
  ];

  let ICheckboxButton = [
    {
      id: 0,
    },
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];

  // const handleSelect = (event) => {
  //   // const value = event.target.value;
  //   // const isChecked = event.target.checked;

  //   if (isChecked) {
  //     //Add checked item into checkList
  //     setCheckedList([...checkedList, value]);
  //   } else {
  //     //Remove unchecked item from checkList
  //     const filteredList = checkedList.filter((item) => item !== value);
  //     setCheckedList(filteredList);
  //   }
  // };

  //   const masemainecheckedbox = listData.map((item, i) => {
  //     return (

  //           <View key={i} style={styles.containerCheckbox} >

  //         <Checkbox
  //        style={styles.checkbox}

  //         value={item.value}
  //         disabled={isDisabled}
  //         onSelectionsChange={() => this.handleSelect}
  //         //onChange={() => this.handleSelect}
  //        //onValueChange={() => this.handleSelect}
  //         color={item.value ? '#E4631B' : undefined} />

  //         <Text>{item.value}</Text>
  //         </View>

  //         );
  //   });

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
        <View style={styles.rowCheckbox}></View>

        <BouncyCheckboxGroup
          text={listData.value}
          data={listData}
          style={{ flexDirection: "column" }}
        />

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
    //fontFamily: 'Fredoka One',
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
