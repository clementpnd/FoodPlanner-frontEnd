import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Button,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import des hooks d'effets
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// import des reducers
import { addSemaine } from "../reducers/semaines";
import { removeAllRecette } from "../reducers/recettes";
//import des screens pour la bottombar
import AccueilScreen from "./AccueilScreen";
import FavorisScreen from "./FavorisScreen";
import ProfilsScreen from "./ProfilsScreen";

const Tab = createBottomTabNavigator();

//import de .env front
import { ADDRESSE_BACKEND } from "@env";

export default function MaSemaineScreen({ navigation }) {
  const dispatch = useDispatch();
  const pickerRef = useRef();
  const user = useSelector((state) => state.users.value);
  const [userState, setUserState] = useState({ ...user });

   //fetch nb de personnes enregistrées dans Profil
  useEffect(() => {
    fetch(`${ADDRESSE_BACKEND}/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setNbPersonneLundi(data.user.nbPersonne.toString());
        setNbPersonneMardi(data.user.nbPersonne.toString());
        setNbPersonneMercredi(data.user.nbPersonne.toString());
        setNbPersonneJeudi(data.user.nbPersonne.toString());
        setNbPersonneVendredi(data.user.nbPersonne.toString());
        setNbPersonneSamedi(data.user.nbPersonne.toString());
        setNbPersonneDimanche(data.user.nbPersonne.toString());
      });
  }, []);
  // états pour le boutons switch/toggle Semaine
  const [isEnabledSemaine, setIsEnabledSemaine] = useState(false);
  const toggleSwitchSemaine = () =>
    setIsEnabledSemaine((previousState) => !previousState);
  // états pour le boutons switch/toggle Weekend
  const [isEnabledWeekEnd, setIsEnabledWeekEnd] = useState([false]);
  const toggleSwitchWeekEnd = () =>
    setIsEnabledWeekEnd((previousState) => !previousState);

 
 

  // variables d'états pour le nb de personnes par jour
  const [nbPersonneProfil, setNbPersonneProfil] = useState(user.nbPersonne); // rappel du nb de personnes enrgistrées dans le profil
  const [nbPersonneLundi, setNbPersonneLundi] = useState(nbPersonneProfil);
  const [nbPersonneMardi, setNbPersonneMardi] = useState(nbPersonneProfil);
  const [nbPersonneMercredi, setNbPersonneMercredi] =
    useState(nbPersonneProfil);
  const [nbPersonneJeudi, setNbPersonneJeudi] = useState(nbPersonneProfil);
  const [nbPersonneVendredi, setNbPersonneVendredi] =
    useState(nbPersonneProfil);
  const [nbPersonneSamedi, setNbPersonneSamedi] = useState(nbPersonneProfil);
  const [nbPersonneDimanche, setNbPersonneDimanche] =
    useState(nbPersonneProfil);

  //DataList pour les repas de la semaine
  const listData = [
    { rang: "0", jour: "Lundi", repas: "Midi", nbPersonne: nbPersonneLundi },
    { rang: "1", jour: "Lundi", repas: "Soir", nbPersonne: nbPersonneLundi },
    { rang: "2", jour: "Lundi", repas: "lesdeux", nbPersonne: nbPersonneLundi },
    { rang: "3", jour: "Mardi", repas: "Midi", nbPersonne: nbPersonneMardi },
    { rang: "4", jour: "Mardi", repas: "Soir", nbPersonne: nbPersonneMardi },
    { rang: "5", jour: "Mardi", repas: "lesdeux", nbPersonne: nbPersonneMardi },
    {
      rang: "6",
      jour: "Mercredi",
      value: "Midi",
      nbPersonne: nbPersonneMercredi,
    },
    {
      rang: "7",
      jour: "Mercredi",
      value: "Soir",
      nbPersonne: nbPersonneMercredi,
    },
    {
      rang: "8",
      jour: "Mercredi",
      value: "lesdeux",
      nbPersonne: nbPersonneMercredi,
    },
    { rang: "9", jour: "Jeudi", value: "Midi", nbPersonne: nbPersonneJeudi },
    { rang: "10", jour: "Jeudi", value: "Soir", nbPersonne: nbPersonneJeudi },
    {
      rang: "11",
      jour: "Jeudi",
      value: "lesdeux",
      nbPersonne: nbPersonneJeudi,
    },
    {
      rang: "12",
      jour: "Vendredi",
      value: "Midi",
      nbPersonne: nbPersonneVendredi,
    },
    {
      rang: "13",
      jour: "Vendredi",
      value: "Soir",
      nbPersonne: nbPersonneVendredi,
    },
    {
      rang: "14",
      jour: "Vendredi",
      value: "lesdeux",
      nbPersonne: nbPersonneVendredi,
    },
    { rang: "15", jour: "Samedi", value: "Midi", nbPersonne: nbPersonneSamedi },
    { rang: "16", jour: "Samedi", value: "Soir", nbPersonne: nbPersonneSamedi },
    {
      rang: "17",
      jour: "Samedi",
      value: "lesdeux",
      nbPersonne: nbPersonneSamedi,
    },
    {
      rang: "18",
      jour: "Dimanche",
      value: "Midi",
      nbPersonne: nbPersonneDimanche,
    },
    {
      rang: "19",
      jour: "Dimanche",
      value: "Soir",
      nbPersonne: nbPersonneDimanche,
    },
    {
      rang: "20",
      jour: "Dimanche",
      value: "lesdeux",
      nbPersonne: nbPersonneDimanche,
    },
  ];



  //bouton pour setter la semaine dans le store pour semainier
  const [checkboxStateLundiMidi, setCheckboxStateLundiMidi] = useState(false);
  const [checkboxStateLundiSoir, setCheckboxStateLundiSoir] = useState(false);
  const [checkboxStateLundiDeux, setCheckboxStateLundiDeux] = useState(false);
  const [checkboxStateMardiMidi, setCheckboxStateMardiMidi] = useState(false);
  const [checkboxStateMardiSoir, setCheckboxStateMardiSoir] = useState(false);
  const [checkboxStateMardiDeux, setCheckboxStateMardiDeux] = useState(false);
  const [checkboxStateMercrediMidi, setCheckboxStateMercrediMidi] =
    useState(false);
  const [checkboxStateMercrediSoir, setCheckboxStateMercrediSoir] =
    useState(false);
  const [checkboxStateMercrediDeux, setCheckboxStateMercrediDeux] =
    useState(false);
  const [checkboxStateJeudiMidi, setCheckboxStateJeudiMidi] = useState(false);
  const [checkboxStateJeudiSoir, setCheckboxStateJeudiSoir] = useState(false);
  const [checkboxStateJeudiDeux, setCheckboxStateJeudiDeux] = useState(false);
  const [checkboxStateVendrediMidi, setCheckboxStateVendrediMidi] =
    useState(false);
  const [checkboxStateVendrediSoir, setCheckboxStateVendrediSoir] =
    useState(false);
  const [checkboxStateVendrediDeux, setCheckboxStateVendrediDeux] =
    useState(false);
  const [checkboxStateSamediMidi, setCheckboxStateSamediMidi] = useState(false);
  const [checkboxStateSamediSoir, setCheckboxStateSamediSoir] = useState(false);
  const [checkboxStateSamediDeux, setCheckboxStateSamediDeux] = useState(false);
  const [checkboxStateDimancheMidi, setCheckboxStateDimancheMidi] =
    useState(false);
  const [checkboxStateDimancheSoir, setCheckboxStateDimancheSoir] =
    useState(false);
  const [checkboxStateDimancheDeux, setCheckboxStateDimancheDeux] =
    useState(false);

  // const pour récuperer toutes les check box qui ont été choisies
  const allCheckBoxSelected = [];

  // conditions pour récupérer les données de chaque checkbox qui est sélectionnée
  checkboxStateLundiMidi === true || checkboxStateLundiDeux === true
    ? allCheckBoxSelected.push(listData[0])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateLundiMidi);
  checkboxStateLundiSoir === true || checkboxStateLundiDeux === true
    ? allCheckBoxSelected.push(listData[1])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateLundiSoir);
  checkboxStateMardiMidi === true || checkboxStateMardiDeux === true
    ? allCheckBoxSelected.push(listData[3])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateMardiMidi);
  checkboxStateMardiSoir === true || checkboxStateMardiDeux === true
    ? allCheckBoxSelected.push(listData[4])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateMardiSoir);
  checkboxStateMercrediMidi === true || checkboxStateMercrediDeux === true
    ? allCheckBoxSelected.push(listData[6])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateMercrediMidi);
  checkboxStateMercrediSoir === true || checkboxStateMercrediDeux === true
    ? allCheckBoxSelected.push(listData[7])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateMercrediSoir);
  checkboxStateJeudiMidi === true || checkboxStateJeudiDeux === true
    ? allCheckBoxSelected.push(listData[9])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateJeudiMidi);
  checkboxStateJeudiSoir === true || checkboxStateJeudiDeux === true
    ? allCheckBoxSelected.push(listData[10])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateJeudiSoir);
  checkboxStateVendrediMidi === true || checkboxStateVendrediDeux === true
    ? allCheckBoxSelected.push(listData[12])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateVendrediMidi);
  checkboxStateVendrediSoir === true || checkboxStateVendrediDeux === true
    ? allCheckBoxSelected.push(listData[13])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateVendrediSoir);
  checkboxStateSamediMidi === true || checkboxStateSamediDeux === true
    ? allCheckBoxSelected.push(listData[15])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateSamediMidi);
  checkboxStateSamediSoir === true || checkboxStateSamediDeux === true
    ? allCheckBoxSelected.push(listData[16])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateSamediSoir);
  checkboxStateDimancheMidi === true || checkboxStateDimancheDeux === true
    ? allCheckBoxSelected.push(listData[18])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateDimancheMidi);
  checkboxStateDimancheSoir === true || checkboxStateDimancheDeux === true
    ? allCheckBoxSelected.push(listData[19])
    : allCheckBoxSelected.filter((d) => d !== checkboxStateDimancheSoir);

  //dispatch
  const handleOnSubmit = () => {
    dispatch(removeAllRecette())
    dispatch(addSemaine({ allCheckBoxSelected }));
    navigation.navigate("Semainier");
  };

  // variable pour le nb de personnes dans le Picker
  const items = {
    0: nbPersonneProfil,
    1: "1",
    2: "2",
    3: "3",
    5: "4",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
  };
  //fonction checker toutes les check box quand on active le toggle
  function selectAll(ch) {
    let tab = listData;
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].type == "BouncyCheckbox")
        tab[i].isChecked = toggleSwitchSemaine.checked;
    }
  }


  const favorisSemaine = () =>{
    fetch(`http:10.2.1.12:3000/users/addsemaineFavorite/${user.token}`, 
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ semaineFavoris: [allCheckBoxSelected] }),
    });
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
          onPress={selectAll}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {/* //LUNDI */}
        <View style={styles.jour}>
          <Text style={styles.text}>{`${listData[0].jour} :`}</Text>
          <Picker
            style={styles.picker}
            key={items}
            mode={"dropdown"}
            dropdownIconColor={"#E4631B"}
            autoScroll={true}
            pickerStyleType={{ justifyContent: "center" }}
            itemStyle={{ fontFamily: "Fredoka" }}
            ref={pickerRef}
            selectedValue={nbPersonneLundi}
            onValueChange={(itemValue, itemPosition) =>
              setNbPersonneLundi(itemValue)
            }
          >
            {Object.keys(items).map((eachItem) => (
              <Picker.Item
                key={items}
                value={items[eachItem]}
                label={items[eachItem]}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.rowCheckbox}>
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateLundiMidi}
            text="Midi"
            onPress={() => setCheckboxStateLundiMidi(!checkboxStateLundiMidi)}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateLundiSoir}
            text="Soir"
            onPress={() => setCheckboxStateLundiSoir(!checkboxStateLundiSoir)}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateLundiDeux}
            text="Les 2"
            onPress={() => setCheckboxStateLundiDeux(!checkboxStateLundiDeux)}
          />
        </View>
        {/* MARDI */}
        <View style={styles.jour}>
          <Text style={styles.text}>{`${listData[3].jour} :`}</Text>
          <Picker
            style={styles.picker}
            key={items}
            mode={"dropdown"}
            dropdownIconColor={"#E4631B"}
            autoScroll={true}
            pickerStyleType={{ justifyContent: "center" }}
            itemStyle={{ fontFamily: "Fredoka" }}
            ref={pickerRef}
            selectedValue={nbPersonneMardi}
            onValueChange={(itemValue, itemPosition) =>
              setNbPersonneMardi(itemValue)
            }
          >
            {Object.keys(items).map((eachItem) => (
              <Picker.Item
                key={items}
                value={items[eachItem]}
                label={items[eachItem]}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.rowCheckbox}>
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateMardiMidi}
            text="Midi"
            onPress={() => setCheckboxStateMardiMidi(!checkboxStateMardiMidi)}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateMardiSoir}
            text="Soir"
            onPress={() => setCheckboxStateMardiSoir(!checkboxStateMardiSoir)}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateMardiDeux}
            text="Les 2"
            onPress={() => setCheckboxStateMardiDeux(!checkboxStateMardiDeux)}
          />
        </View>

            {/* Mercredi */}
        <View style={styles.jour}>
          <Text style={styles.text}>{`${listData[6].jour} :`}</Text>
          <Picker
            style={styles.picker}
            key={items}
            mode={"dropdown"}
            dropdownIconColor={"#E4631B"}
            autoScroll={true}
            pickerStyleType={{ justifyContent: "center" }}
            itemStyle={{ fontFamily: "Fredoka" }}
            ref={pickerRef}
            selectedValue={nbPersonneMercredi}
            onValueChange={(itemValue, itemPosition) =>
              setNbPersonneMercredi(itemValue)
            }
          >
            {Object.keys(items).map((eachItem) => (
              <Picker.Item
                key={items}
                value={items[eachItem]}
                label={items[eachItem]}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.rowCheckbox}>
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateMercrediMidi}
            text="Midi"
            onPress={() =>
              setCheckboxStateMercrediMidi(!checkboxStateMercrediMidi)
            }
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateMercrediSoir}
            text="Soir"
            onPress={() =>
              setCheckboxStateMercrediSoir(!checkboxStateMercrediSoir)
            }
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateMercrediDeux}
            text="Les 2"
            onPress={() =>
              setCheckboxStateMercrediDeux(!checkboxStateMercrediDeux)
            }
          />
        </View>

        <View style={styles.jour}>
          <Text style={styles.text}>{`${listData[9].jour} :`}</Text>
          <Picker
            style={styles.picker}
            key={items}
            mode={"dropdown"}
            dropdownIconColor={"#E4631B"}
            autoScroll={true}
            pickerStyleType={{ justifyContent: "center" }}
            itemStyle={{ fontFamily: "Fredoka" }}
            ref={pickerRef}
            selectedValue={nbPersonneJeudi}
            onValueChange={(itemValue, itemPosition) =>
              setNbPersonneJeudi(itemValue)
            }
          >
            {Object.keys(items).map((eachItem) => (
              <Picker.Item
                key={items}
                value={items[eachItem]}
                label={items[eachItem]}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.rowCheckbox}>
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateJeudiMidi}
            text="Midi"
            onPress={() => setCheckboxStateJeudiMidi(!checkboxStateJeudiMidi)}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateJeudiSoir}
            text="Soir"
            onPress={() => setCheckboxStateJeudiSoir(!checkboxStateJeudiSoir)}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateJeudiDeux}
            text="Les 2"
            onPress={() => setCheckboxStateJeudiDeux(!checkboxStateJeudiDeux)}
          />
        </View>

        <View style={styles.jour}>
          <Text style={styles.text}>{`${listData[12].jour} :`}</Text>
          <Picker
            style={styles.picker}
            key={items}
            mode={"dropdown"}
            dropdownIconColor={"#E4631B"}
            autoScroll={true}
            pickerStyleType={{ justifyContent: "center" }}
            itemStyle={{ fontFamily: "Fredoka" }}
            ref={pickerRef}
            selectedValue={nbPersonneVendredi}
            onValueChange={(itemValue, itemPosition) =>
              setNbPersonneVendredi(itemValue)
            }
          >
            {Object.keys(items).map((eachItem) => (
              <Picker.Item
                key={items}
                value={items[eachItem]}
                label={items[eachItem]}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.rowCheckbox}>
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateVendrediMidi}
            text="Midi"
            onPress={() =>
              setCheckboxStateVendrediMidi(!checkboxStateVendrediMidi)
            }
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateVendrediSoir}
            text="Soir"
            onPress={() =>
              setCheckboxStateVendrediSoir(!checkboxStateVendrediSoir)
            }
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateVendrediDeux}
            text="Les 2"
            onPress={() =>
              setCheckboxStateVendrediDeux(!checkboxStateVendrediDeux)
            }
          />
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

        <View style={styles.jour}>
          <Text style={styles.text}>{`${listData[15].jour} :`}</Text>
          <Picker
            style={styles.picker}
            key={items}
            mode={"dropdown"}
            dropdownIconColor={"#E4631B"}
            autoScroll={true}
            pickerStyleType={{ justifyContent: "center" }}
            itemStyle={{ fontFamily: "Fredoka" }}
            ref={pickerRef}
            selectedValue={nbPersonneSamedi}
            onValueChange={(itemValue, itemPosition) =>
              setNbPersonneSamedi(itemValue)
            }
          >
            {Object.keys(items).map((eachItem) => (
              <Picker.Item
                key={items}
                value={items[eachItem]}
                label={items[eachItem]}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.rowCheckbox}>
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateSamediMidi}
            text="Midi"
            onPress={() => setCheckboxStateSamediMidi(!checkboxStateSamediMidi)}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateSamediSoir}
            text="Soir"
            onPress={() => setCheckboxStateSamediSoir(!checkboxStateSamediSoir)}
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateSamediDeux}
            text="Les 2"
            onPress={() => setCheckboxStateSamediDeux(!checkboxStateSamediDeux)}
          />
        </View>

        <View style={styles.jour}>
          <Text style={styles.text}>{`${listData[18].jour} :`}</Text>
          <Picker
            style={styles.picker}
            key={items}
            mode={"dropdown"}
            dropdownIconColor={"#E4631B"}
            autoScroll={true}
            pickerStyleType={{ justifyContent: "center" }}
            itemStyle={{ fontFamily: "Fredoka" }}
            ref={pickerRef}
            selectedValue={nbPersonneDimanche}
            onValueChange={(itemValue, itemPosition) =>
              setNbPersonneDimanche(itemValue)
            }
          >
            {Object.keys(items).map((eachItem) => (
              <Picker.Item
                key={items}
                value={items[eachItem]}
                label={items[eachItem]}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.rowCheckbox}>
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateDimancheMidi}
            text="Midi"
            onPress={() =>
              setCheckboxStateDimancheMidi(!checkboxStateDimancheMidi)
            }
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateDimancheSoir}
            text="Soir"
            onPress={() =>
              setCheckboxStateDimancheSoir(!checkboxStateDimancheSoir)
            }
          />
          <BouncyCheckbox
            style={styles.checkbox}
            textStyle={{
              fontFamily: "Fredoka",
              color: "black",
              textDecorationLine: "none",
            }}
            fillColor="#E4631B"
            unfillColor="#fff"
            iconImageStyle={{ width: 14, height: 14 }}
            iconStyle={{ borderColor: "#E4631B", borderRadius: 0 }}
            innerIconStyle={{ borderRadius: 0 }}
            isChecked={checkboxStateDimancheDeux}
            text="Les 2"
            onPress={() =>
              setCheckboxStateDimancheDeux(!checkboxStateDimancheDeux)
            }
          />
        </View>

        <View style={styles.iconHeart}>
          <TouchableOpacity onPress={() => favorisSemaine()}>
            <FontAwesome name="heart-o" size={40} color="#78CB26" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.submitDiv}>
        <TouchableOpacity
          style={styles.submit}
          onPress={() => handleOnSubmit()}
        >
          <Text style={styles.buttonText}>Planifions ma semaine</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
  },

  jour: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    paddingBottom: 2,
    fontFamily: "FredokaBold",
  },

  rowCheckbox: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
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
  title: {
    width: "50%",
    fontSize: 38,
    fontWeight: "600",
    backgroundColor: "white",
  },
  item: {
    fontSize: 20,
    paddingBottom: 2,
    fontFamily: "FredokaBold",
    color: "black",
  },

  picker: {
    width: "40%",
    justifyContent: "flex-end",
    transform: [{ scaleY: 1.2 }, { scaleX: 1.2 }],
  },
});
