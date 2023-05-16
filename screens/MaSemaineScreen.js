import { Button, StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
//import des hooks d'effets
import { useState, useEffect } from "react";
// import des reducers
import { decrement, increment } from '../reducers/counter';


const BACKEND_ADDRESS = 'http://BACKEND_IP:3000';
// exp://10.2.1.16:19000
export default function MaSemaineScreen({ navigation }) {
//fonction counter avec reducer nb de personnes par repas
const dispatch = useDispatch();
const counter = useSelector((state) => state.counter.value);
const [counterRepas, setCounterRepas] = useState({counter});

const [isSelected, setSelection] = useState(false);
// fetch nb de personnes enregistrées dans Profil
const decrementSubmit = () => {
  fetch(`${BACKEND_ADDRESS}/nbPersonne/:token`)
    .then((response) => response.json())
    .then((data) => {
      {counter};

      dispatch(decrement(counter));
      setCounterRepas('');
    });
};


  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
        <Text style={styles.text}>Lundi</Text>
      
        <Button style={styles.decrementBtn} onPress={() => dispatch(decrement())}><Text>-</Text></Button>
        <Text className={styles.counter}>{counterRepas}</Text>
        <Button style={styles.incrementBtn}  onPress={() => dispatch(increment())}><Text>+</Text></Button>

        </View>
        <View>

        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text>Midi</Text>

        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text>Soir</Text>

        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />

        </View>
        <Text>Les 2</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  checkbox: {
    alignSelf: 'center',
  },
});
