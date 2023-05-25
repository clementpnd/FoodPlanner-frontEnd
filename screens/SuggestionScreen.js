import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeAllRecette } from "../reducers/recettes";
import { useEffect, useState } from "react";
import { addAllRecette } from "../reducers/recettes";
import { changeRecette } from "../reducers/recettes";
import { ADDRESSE_BACKEND } from "@env";

export default function SuggestionScreen({ navigation }) {
  const dispatch = useDispatch();
  const recettesRedux = useSelector((state) => state.recettes.value);
  const user = useSelector((state) => state.users.value);
  const [recetteSuggerer, setRecetteSuggerer] = useState([]);
  const [recetteSemainier, setRecetteSemainier] = useState([]);

  //USE EFFECT
  useEffect(() => {
    fetch(`${ADDRESSE_BACKEND}/recettes/recettePref`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecetteSuggerer(data.responseRecette);
        setRecetteSemainier(recettesRedux.recettes);
      });
  }, []);

  //RETURN CART RECETTE
  let recetteAffiche = [];
  if (recetteSuggerer.length > 0) {
    recetteAffiche = recetteSuggerer.map((recette, i) => {
      return (
        <View key={i} style={styles.card}>
          <TouchableOpacity style={styles.touchable} onPress={() => replace(i)}>
            <ImageBackground
              style={styles.img}
              source={{ uri: recette.image }}
            />
            <View style={styles.textDiv}>
              <Text style={styles.title}>{recette.nom}</Text>
              <Text style={styles.desc}>{recette.description}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  }
  // FUNCTION REPLACE RECETTE DANS LE SEMAINIER
  const replace = (nb) => {
    const updateRecetteSemainier = [...recetteSemainier];
    updateRecetteSemainier.splice(
      user.idRecette.idRecette,
      1,
      recetteSuggerer[nb]
    );
    dispatch(changeRecette(updateRecetteSemainier));
    navigation.navigate("Semainier");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scrollContent}>{recetteAffiche}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#78CB26",
    width: Dimensions.get("window").width - 20,
    height: 185,
    borderRadius: 4,
    margin: 10,
  },
  scrollContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  touchable: { width: "100%", height: "100%" },
  img: {
    alignItems: "center",
    width: "100%",
    height: 80,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  textDiv: {
    justifyContent: "center",
  },
  title: { fontWeight: 900, fontSize: 17, margin: 2 },
  desc: { fontWeight: 300, fontSize: 10 },
});
