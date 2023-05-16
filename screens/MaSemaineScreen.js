import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Switch, FlatList, Item, VirtualizedList} from "react-native";
//import CheckBox from '@react-native-community/checkbox';
import Checkbox from 'expo-checkbox';
import FontAwesome from "react-native-vector-icons/FontAwesome";


//import des hooks d'effets
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

// import des reducers
import { decrement, increment } from '../reducers/counter';




const BACKEND_ADDRESS = 'http://10.2.0.221:3000';// exp://10.2.1.16:19000

export default function MaSemaineScreen({ navigation }) {

//fonction counter avec reducer nb de personnes par repas
const dispatch = useDispatch();
const users = useSelector((state) => state.users.value);
const [counterRepas, setCounterRepas] = useState();
const counter = users.nbPersonne;
const [isChecked, setChecked] = useState(false);

// états pour le boutons switch/toggle Semaine
const [isEnabledSemaine, setIsEnabledSemaine] = useState(false);
const toggleSwitchSemaine = () => setIsEnabledSemaine(previousState => !previousState);
// états pour le boutons switch/toggle Semaine
const [isEnabledWeekEnd, setIsEnabledWeekEnd] = useState(false);
const toggleSwitchWeekEnd= () => setIsEnabledWeekEnd(previousState => !previousState);

// fetch nb de personnes enregistrées dans Profil
const decrementSubmit = () => {
  fetch(`${BACKEND_ADDRESS}/nbPersonne/:token`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      {counterRepas};

      dispatch(decrement(counter));
      setCounterRepas(data);
    });
};


// useEffect(() => {
//   fetch(`${BACKEND_ADDRESS}/nbPersonne/:token`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data)
//     });
// }, []);


// dataList pour nb de personnes par repas

  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.rowToggleSemaine}>
        <Text>Tous les repas de la semaine</Text>

        <Switch
        trackColor={{false: '#767577', true: '#78CB26'}}
        thumbColor={isEnabledSemaine ? '#fff' : '#fff'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchSemaine}
        value={isEnabledSemaine}
      />
      </View>
      <ScrollView style={styles.scrollView}>
        
        <View style={styles.jour}>
        <Text style={styles.text}>Lundi :</Text>

        <TouchableOpacity style={styles.decrementBtn} onPress={() => decrementSubmit()}><Text>-</Text></TouchableOpacity>
        <Text className={styles.counter}></Text>
        <TouchableOpacity style={styles.incrementBtn}  onPress={() => dispatch(increment())}><Text>+</Text></TouchableOpacity>
        </View>
        
        <View style={styles.rowCheckbox}>
          <View style={styles.containerCheckbox} >
        <Checkbox 
       style={styles.checkbox}
        disabled={false}
        value={isChecked} 
        onValueChange={setChecked}
        color={isChecked ? '#E4631B' : undefined} />


        <Text>Midi</Text>
        </View>
        <View style={styles.containerCheckbox}> 
        <Checkbox 
       style={styles.checkbox}
        disabled={false}
        value={isChecked} 
        onValueChange={setChecked} 
        color={isChecked ? '#E4631B' : undefined} />
        <Text>Soir</Text>
        </View>

        <View style={styles.containerCheckbox}>
        <Checkbox 
       style={styles.checkbox}
        disabled={false}
        value={isChecked} 
        onValueChange={setChecked} 
        color={isChecked ? '#E4631B' : undefined} />
        <Text>Les 2</Text>
        </View>
        </View>

    




        <View style={styles.rowToggleWeekEnd}>
        <Text>WeekEnd</Text>
        <Switch
        trackColor={{false: '#767577', true: '#78CB26'}}
        thumbColor={isEnabledWeekEnd ? '#fff' : '#fff'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchWeekEnd}
        value={isEnabledWeekEnd}
      />
      </View>


    <View style={styles.iconHeart}>
      <TouchableOpacity >
          <FontAwesome name='heart-o' size={40} color='#78CB26' />
        </TouchableOpacity>
        </View>
      </ScrollView>



      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
  },
  rowToggleSemaine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: 'rgba(	120, 203, 38, 0.4)',
    
    marginHorizontal: 20,
    flexDirection: 'column',
    //alignItems: 'center'
  },

  jour: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },

  containerCheckbox: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    marginRight: 10,
  },
  checkbox: {
    alignSelf: 'center',
    marginRight: 10,
  
  },

  rowToggleWeekEnd: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  iconHeart: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  }
});
