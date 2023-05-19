import {

  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import BouncyCheckboxGroup, {
  ICheckboxButton,} from "react-native-bouncy-checkbox-group";
//import SelectMultiple from 'react-native-select-multiple'
import { Picker } from "@react-native-picker/picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//import "@fontsource/fredoka-one"
//import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';

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

//import de .env front
import { ADDRESSE_BACKEND } from "@env";

export default function MaSemaineScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const [userState, setUserState] = useState({ ...user });

  const semaine = useSelector((state) => state.semaine.value);
  const [nbPersonneSemaine, setNbPersonneSemaine] = useState(""); // mettre nb personne enrgistré dans profil
  const pickerRef = useRef();
  const [selectedItem, setSelectedItem] = useState(false);

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
  fetch(`${ADDRESSE_BACKEND}/users/nbPersonne/${user.token}`)
    .then((response) => response.json())
    .then((data) => {
      //console.log(user.token)
      console.log(data)
    console.log(user.token)
      setNbPersonneSemaine(nbPersonneSemaine)
    });
}, []);

// dataList pour nb de personnes par repas
let items = [];
for (let i = 1; i < 11; i++) {
  j = i.toString();
  items.push(<Picker.Item key={j} label={j} value={j} />);
};

//DataList pour les repas de la semaine
const listDataLundi = [
  { id: "1", jour: "Lundi", value: "Midi", text: "Midi",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
  },
  { id: "2", jour: "Lundi", value: "Soir", text: "Soir", 
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
},
  { id: "3", jour: "Lundi", value: "lesdeux", text: "les 2",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
   },
];

const listDataMardi = [
  { id: "4", jour: "Mardi", value: "Midi", text: "Midi",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
  
  },
  { id: "5", jour: "Mardi", value: "Soir", text: "Soir",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
 },
  { id: "6", jour: "Mardi", value: "lesdeux", text: "les 2",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
   },
];

const listDataMercredi = [
  { id: "7", jour: "Mercredi", value: "Midi", text: "Midi",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
  
  },
  { id: "8", jour: "Mercredi", value: "Soir", text: "Soir",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
 },
  { id: "9", jour: "Mercredi", value: "lesdeux", text: "les 2",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
   },
];

const listDataJeudi = [
  { id: "10", jour: "Jeudi", value: "Midi", text: "Midi",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
  
  },
  { id: "11", jour: "Jeudi", value: "Soir", text: "Soir",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
 },
  { id: "12", jour: "Jeudi", value: "lesdeux", text: "les 2",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
   },
];

const listDataVendredi = [
  { id: "13", jour: "Vendredi", value: "Midi", text: "Midi",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
  
  },
  { id: "14", jour: "Vendredi", value: "Soir", text: "Soir",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
 },
  { id: "15", jour: "Vendredi", value: "lesdeux", text: "les 2",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
   },
];

const listDataSamedi = [
  { id: "16", jour: "Samedi", value: "Midi", text: "Midi",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
  
  },
  { id: "17", jour: "Samedi", value: "Soir", text: "Soir",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
 },
  { id: "18", jour: "Samedi", value: "lesdeux", text: "les 2",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
   },
];

const listDataDimanche = [
  { id: "19", jour: "Dimanche", value: "Midi", text: "Midi",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
  
  },
  { id: "20", jour: "Dimanche", value: "Soir", text: "Soir",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
 },
  { id: "21", jour: "Dimanche", value: "lesdeux", text: "les 2",
  fillColor: "#E4631B",
  unfillColor: "#fff",
  textColor: "black",
  marginRight: 10,
  textContainerStyle: {textDecorationLine: "none"},
   },
];


  //bouton ajout du repas dans la semaine
  const handleOnSubmit = () => {
    fetch(`${ADDRESSE_BACKEND}/users/newsemaine/${user.token}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({token: user.token, jour: selectedItem.jour, repas: selectedItem.value}),
    })
    .then((response) => response.json())
    .then((data) => {
        // Dispatch Redux store les repas choisis
        if (data) {
          data.result  && dispatch(addSemaine({jour: selectedItem.jour, repas: selectedItem.value}))
          //navigation.navigate("SemainierScreen");
        };
        }
      );
  };

  // toggle qui selectonne tous les repas de la semaine
  const handleOnToogle = () => {
    
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
      <ScrollView nestedScrollEnabled={true}  style={styles.scrollView}>
        <View style={styles.jour}>
          <Text style={styles.text}>{`${listDataLundi[0].jour} :`}</Text>
          <Picker
          listMode="SCROLLVIEW" 
            ref={pickerRef}
            selectedValue={nbPersonneSemaine}
            onValueChange={(itemValue, itemIndex) =>
              setNbPersonneSemaine(itemValue)
            }>
            {items}
          </Picker>
         
        </View>
        <View style={styles.rowCheckbox}>

        <BouncyCheckboxGroup 
        textStyle={{
          textDecorationLine: "none",
     }}
     isChecked={selectedItem}
  data={listDataLundi}
  onChange={(selectedItem: ICheckboxButton) => {
    setSelectedItem(selectedItem);
  }}
  
 
/>
</View>

<View style={styles.jour}>
          <Text style={styles.text}>{`${listDataMardi[0].jour} :`}</Text>
          <Picker
          listMode="SCROLLVIEW" 
            ref={pickerRef}
            selectedValue={nbPersonneSemaine}
            onValueChange={(itemValue, itemIndex) =>
              setNbPersonneSemaine(itemValue)
            }>
            {items}
          </Picker>
        </View>
        <View style={styles.rowCheckbox}>
        <BouncyCheckboxGroup 
        style={{ justifyContent: "center"}}
        textStyle={{textDecorationLine: "none",}}
  data={listDataMardi}
  onChange={(selectedItem: ICheckboxButton) => {setSelectedItem(selectedItem);}}/>
</View>

<View style={styles.jour}>
          <Text style={styles.text}>{`${listDataMercredi[0].jour} :`}</Text>
          <Picker
            ref={pickerRef}
            selectedValue={nbPersonneSemaine}
            onValueChange={(itemValue, itemIndex) => setNbPersonneSemaine(itemValue)}>
            {items}
          </Picker>
        </View>
        <View style={styles.rowCheckbox}>

        <BouncyCheckboxGroup 
        style={{ justifyContent: "center"}}
        textStyle={{textDecorationLine: "none", }}
        data={listDataMercredi}
        onChange={(selectedItem: ICheckboxButton) => {setSelectedItem(selectedItem);}}/>
        </View>


<View style={styles.jour}>
          <Text style={styles.text}>{`${listDataJeudi[0].jour} :`}</Text>
          <Picker
            ref={pickerRef}
            selectedValue={nbPersonneSemaine}
            onValueChange={(itemValue, itemIndex) => setNbPersonneSemaine(itemValue)}>
            {items}
          </Picker>
        </View>
        <View style={styles.rowCheckbox}>

        <BouncyCheckboxGroup 
        style={{ justifyContent: "center"}}
        textStyle={{textDecorationLine: "none",}}
  data={listDataJeudi}
  onChange={(selectedItem: ICheckboxButton) => {setSelectedItem(selectedItem);}}/>
</View>


<View style={styles.jour}>
          <Text style={styles.text}>{`${listDataVendredi[0].jour} :`}</Text>
          <Picker
            ref={pickerRef}
            selectedValue={nbPersonneSemaine}
            onValueChange={(itemValue, itemIndex) =>
              setNbPersonneSemaine(itemValue)
            }>
            {items}
          </Picker>
        </View>
        <View style={styles.rowCheckbox}>

        <BouncyCheckboxGroup 
        style={{ justifyContent: "center"}}
        textStyle={{textDecorationLine: "none", }}
        data={listDataVendredi}
        onChange={(selectedItem: ICheckboxButton) => {setSelectedItem(selectedItem);}}/>
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
          <Text style={styles.text}>{`${listDataSamedi[0].jour} :`}</Text>
          <Picker
            ref={pickerRef}
            selectedValue={nbPersonneSemaine}
            onValueChange={(itemValue, itemIndex) =>
              setNbPersonneSemaine(itemValue)
            }>
            {items}
          </Picker>
        </View>
        <View style={styles.rowCheckbox}>

        <BouncyCheckboxGroup 
        style={{ justifyContent: "center"}}
        textStyle={{textDecorationLine: "none", }}
        data={listDataSamedi}
        onChange={(selectedItem: ICheckboxButton) => {setSelectedItem(selectedItem);}}/>
        </View>

        <View style={styles.jour}>
          <Text style={styles.text}>{`${listDataDimanche[0].jour} :`}</Text>
          <Picker
            ref={pickerRef}
            selectedValue={nbPersonneSemaine}
            onValueChange={(itemValue, itemIndex) =>
              setNbPersonneSemaine(itemValue)
            }>
            {items}
          </Picker>
        </View>
        <View style={styles.rowCheckbox}>

        <BouncyCheckboxGroup 
        style={{ justifyContent: "center"}}
        textStyle={{textDecorationLine: "none", }}
        data={listDataDimanche}
        onChange={(selectedItem: ICheckboxButton) => {setSelectedItem(selectedItem);}}/>
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
    marginBottom: 4,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    paddingBottom: 2,
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
    fillColor: "blue",
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

});
