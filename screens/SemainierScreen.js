import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
//import fontawesome pour les icones
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import des hooks
import { useEffect, useState } from "react";

export default function SemainierScreen({ navigation }) {
  const [recetteData, setRecetteData] = useState({}); //variable d'état des recettes
  //fonction qui recupère les recettes en fonction du nombre de repas sélectionner
  useEffect(() => {
    fetch("http://10.2.0.221:3000/recettes")
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        // setRecetteData(data);
      });
  }, []);

  // const recetteAffichées = recetteData.map((data, i) => {
  //   return (
  //     <View style={styles.card}>
  //       <ImageBackground
  //         source={require("../assets/carottes.jpg")}
  //         style={styles.imageCard}
  //       >
  //         <TouchableOpacity style={styles.recettefavorite}>
  //           <FontAwesome name="heart-o" size={20} color="black" />
  //         </TouchableOpacity>
  //       </ImageBackground>
  //       <View style={styles.text}>
  //         <Text style={styles.title}>{data.nom}</Text>
  //         <Text style={styles.desc}>{data.description}</Text>
  //         <TouchableOpacity style={styles.modifierRecette}>
  //           <FontAwesome name="gear" size={20} color="black" />
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // });

  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.scrollContent}></View>
      </ScrollView>
      <View style={styles.listeButton}>
        <TouchableOpacity style={styles.btn}>
          <Text>Faison une liste de courses</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: { flex: 1, alignItems: "center" },
  scrollContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  card: {
    display: "flex",
    alignItems: "center",

    width: 175,
    height: 250,
    borderRadius: 4,
    backgroundColor: "green",
    margin: 6,
  },
  listeButton: {
    backgroundColor: "green",
    width: 300,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
    borderRadius: 4,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  imageCard: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  title: { fontWeight: 900, fontSize: 20 },
  desc: { fontWeight: 300, fontSize: 10 },
  recettefavorite: { margin: 3 },
  text: { width: "100%", margin: 3 },
  modifierRecette: {
    display: "flex",
    alignItems: "flex-end",
    marginTop: 50,
  },
});
