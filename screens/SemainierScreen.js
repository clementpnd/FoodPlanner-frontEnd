import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  Button
} from "react-native";
//import fontawesome pour les icones
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import des hooks
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addRecette, changeRecette, removeRecette } from "../reducers/recettes";
import { addUsers } from "../reducers/users";
import { addIndexRecette } from "../reducers/users";
import { removeAllRecette } from "../reducers/recettes";

//import de .env front
import { ADDRESSE_BACKEND } from "@env";

export default function SemainierScreen({ navigation }) {
  const user = useSelector((state) => state.users.value);
  const dispatch = useDispatch();
  const recetteRedux = useSelector((state)=>state.recettes.value);

  //fonction pour basculer vers la page de suggestion
  const handleSuggestion = (nb) => {
    const idRecette = {
      idRecette : nb
    }
    dispatch(addIndexRecette(idRecette));
    navigation.navigate("Suggestion");
  };
  const [recetteData, setRecetteData] = useState([]); //variable d'état des recettes deja en BDD

  //fonction qui recupère les recettes en fonction du nombre de repas sélectionner
  useEffect(() => {
    fetch(`http://10.2.1.12:3000/recettes`)
      .then((response) => response.json())
      .then((data) => {
        if(!recetteRedux.recettes.length>0){
          dispatch(removeAllRecette());
          dispatch(changeRecette(data.data));
        }
      });
  }, []);
  // console.log(recetteData._id);

  //fonction pour ajouter une recette en favoris
  const addRecetteHandler = () => {
    fetch(`${ADDRESSE_BACKEND}/addRecetteFavorite/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recetteFavoris: [recetteData] }),
    });
  };

  
  const recetteAffichées = recetteRedux.recettes.map((data, i) => {
    // dispatch(addRecette(data));
    return (
      <View key={i} style={styles.card}>
        <ImageBackground source={{ uri: data.image }} style={styles.imageCard}>
          <TouchableOpacity
            style={styles.recettefavorite}
            onPress={() => addRecetteHandler()}
          >
            <FontAwesome name="heart-o" size={20} color="black" />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.text}>
          <Text style={styles.title}>{data.nom}</Text>
          <Text style={styles.desc}>{data.description}</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleSuggestion(i)}
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
