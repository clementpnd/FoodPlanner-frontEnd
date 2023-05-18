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

//import de .env front
import { ADDRESSE_BACKEND } from "@env";

export default function SemainierScreen({ navigation }) {
  //fonction pour basculer vers la page de suggestion
  const handleSuggestion = () => {
    navigation.navigate("Suggestion");
  };
  const [recetteData, setRecetteData] = useState([]); //variable d'état des recettes

  //fonction qui recupère les recettes en fonction du nombre de repas sélectionner
  useEffect(() => {
    fetch(`${ADDRESSE_BACKEND}/recettes`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        setRecetteData(data.data);
      });
  }, []);

  const recetteAffichées = recetteData.map((data, i) => {
    return (
      <View key={i} style={styles.card}>
        <ImageBackground source={{ uri: data.image }} style={styles.imageCard}>
          <TouchableOpacity style={styles.recettefavorite}>
            <FontAwesome name="heart-o" size={20} color="black" />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.text}>
          <Text style={styles.title}>{data.nom}</Text>
          <Text style={styles.desc}>{data.description}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleSuggestion()}
          style={styles.modifierRecette}
        >
          <FontAwesome name="gear" size={20} color="black" />
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.scrollContent}>{recetteAffichées}</View>
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
    height: 280,
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
    height: 90,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  title: { fontWeight: 900, fontSize: 19 },
  desc: { fontWeight: 300, fontSize: 10 },
  recettefavorite: { margin: 3 },
  text: { width: "100%", margin: 3 },
  modifierRecette: {
    position: "absolute",
    marginTop: 255,
    paddingLeft: 150,
  },
});
