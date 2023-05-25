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
import { useDispatch, useSelector } from "react-redux";
//import des reducers
import { addRecette, changeRecette } from "../reducers/recettes";
import { addIndexRecette } from "../reducers/users";
import { removeAllRecette } from "../reducers/recettes";
import Header from "../components/Header";

//import de .env front
import { ADDRESSE_BACKEND } from "@env";

export default function SemainierScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  const recetteRedux = useSelector((state) => state.recettes.value);
  const semaineRedux = useSelector((state) => state.semaines.value);

  //fonction pour basculer vers la page de suggestion
  const handleSuggestion = (nb) => {
    const idRecette = {
      idRecette: nb,
    };
    dispatch(addIndexRecette(idRecette));
    navigation.navigate("Suggestion");
  };

  //fonction qui recupère les recettes en fonction du nombre de repas sélectionner
  useEffect(() => {
    const nbJour = semaineRedux.allCheckBoxSelected.length;

    fetch(`http://10.2.1.12:3000/recettes`)
      .then((response) => response.json())
      .then((data) => {
        const nbRecette = data.data.slice(0, nbJour);
        if (!recetteRedux.recettes.length > 0) {
          dispatch(removeAllRecette());
          dispatch(changeRecette(nbRecette));
        }
      });
  }, []);

  //fonction pour ajouter une recette en favoris
  const addRecetteHandler = (_id) => {
    fetch(`http://10.2.1.12:3000/users/addRecetteFavorite/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recetteFavoris: _id }),
    })
      .then((response) => response.json)
      .then((data) => {
        if (data.result) {
          dispatch(addRecette(data));
        }
      });
  };

  //fonction qui affiche les recettes ajoutées en favoris
  const recetteAffichées = recetteRedux.recettes.map((data, i) => {
    return (
      <View key={i} style={styles.card}>
        <View style={styles.headCard}>
          <TouchableOpacity
            style={styles.recettefavorite}
            onPress={() => addRecetteHandler(data._id)}
          >
            <FontAwesome name="heart-o" size={18} color="black" />
          </TouchableOpacity>
          <Text style={styles.jourText}>
            {semaineRedux.allCheckBoxSelected[i].jour} :{" "}
            {semaineRedux.allCheckBoxSelected[i].repas}
          </Text>
        </View>
        <ImageBackground
          source={{ uri: data.image }}
          style={styles.imageCard}
        ></ImageBackground>
        <View style={styles.text}>
          <Text style={styles.title}>{data.nom}</Text>
          <Text numberOfLines={6} style={styles.desc}>
            {data.description}
          </Text>
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
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Header />
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.scrollContent}>{recetteAffichées}</View>
      </ScrollView>
      <View style={styles.listeButton}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("ShoppingList")}
        >
          <Text>Faisons une liste de courses</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ marginBottom: 30 }}
        onPress={() =>
          navigation.navigate("TabNavigator", { screen: "Accueil" })
        }
      >
        <FontAwesome name="home" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  main: { flex: 1, alignItems: "center", fontFamily: "Fredoka" },
  card: {
    display: "flex",
    alignItems: "center",
    width: 175,
    height: 280,
    borderRadius: 4,
    backgroundColor: "#78CB26",
    margin: 6,
  },
  headCard: {
    display: "flex",
    flexDirection: "row",
  },
  recettefavorite: { margin: 1, marginRight: 20 },
  jourText: {
    fontSize: 16,
  },
  scrollContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  listeButton: {
    backgroundColor: "#78CB26",
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
  title: { fontWeight: 900, fontSize: 17, margin: 2 },
  desc: { fontWeight: 300, fontSize: 10 },
  text: { width: "100%", margin: 3 },
  modifierRecette: {
    position: "absolute",
    marginTop: 255,
    paddingLeft: 150,
  },
});
