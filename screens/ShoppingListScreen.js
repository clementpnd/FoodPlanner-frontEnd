import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function ShoppingListScreen({ navigation }) {
  const [isChecked, setCheck] = useState(false);
  const recette = useSelector((state) => state.recettes.value);

  // const AllIngredients = [];
  // let ingredients;
  // recette.recettes.map((data, i) => {
  
  //   ingredients = data.ingredients.map((ing, i) => {
  //     return (
  //       <View style={styles.div} key={i}>
  //         <BouncyCheckbox onPress={() => setCheck(!isChecked)} />
  //         <Text>
  //           {ing.quantite} {ing.nom}
  //         </Text>
  //       </View>
  //     );
  //   });
  //   AllIngredients.push(ingredients);
   
  // });
  

 
  recette.recettes.map((data, i) => {
   let tousIngredients = data.reduce(function(prev, curr) {
      return [...prev, ...curr.ingredients];
    }, []);
    
    for (const item of tousIngredients) {
      const quantite = item.quantite;
      const nombre = quantite.match(/\d+(?:.\d+)?/||/^(?!.*\S)/g);
    
      if (nombre) {
        const reste = quantite.replace(nombre[0], "").trim();
        item.nombre = parseFloat(nombre[0]);
        item.reste = reste; 
      }
    }
    result = Object.values(tousIngredients.reduce((r, { nom, nombre, reste, test }) => {
      if (!r[nom]) r[nom] = { nom, nombre: 0, reste, test };
      r[nom].nombre += nombre;
      if (test === 'FAIL') r[nom].test = 'FAIL';
      return r;
  }, {}));
    
  ingredients = result.map((ing, i) => {

      
     console.log(result)
      return (
        <View style={styles.div} key={i}>
          <BouncyCheckbox onPress={() => setCheck(!isChecked)} />
          <Text>
            {ing.nombre} {ing.reste} {ing.nom}
          </Text>
        </View>
      );
    });
    AllIngredients.push(ingredients);
  });
console.log(ingredients)
  







  return (
    <View style={styles.content}>
        <Text style={styles.title}>Liste de course</Text>
        <View>
          <ScrollView>{AllIngredients}</ScrollView>
        </View>
      </View>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    height: "100%",
    width: "100%"
  },
  div: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  titleDiv: {
    flex : 1,
    justifyContent: "center",
    alignItems : "center",
    textAlign: "center",
    backgroundColor: "red",
    height : 40,
    width: "100%",
  },
  title: {
    fontSize: 20,
    textAlign : "center",
  },
});
