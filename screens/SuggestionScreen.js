import {
  Button,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeAllRecette } from "../reducers/recettes";
import { useEffect, useState } from "react";
import { addAllRecette } from "../reducers/recettes";

export default function SuggestionScreen({ navigation }) {
  const dispatch = useDispatch();

  const recettesRedux = useSelector((state) => state.recettes.value);

  console.log('recettesRedux', recettesRedux)
  const user = useSelector((state) => state.users.value);

  const [recetteSuggerer, setRecetteSuggerer] = useState([]);
  const [recetteSemainier, setRecetteSemainier] = useState([]);

  useEffect(() => {
    fetch("http://10.2.1.12:3000/recettes/recettePref", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRecetteSuggerer(data.responseRecette);
        setRecetteSemainier(recettesRedux);
      });
  }, []);

  let recetteAffiche = [];
  if (recetteSuggerer.length > 0) {
    recetteAffiche = recetteSuggerer.map((recette, i) => {
      return (
        <TouchableOpacity onPress={() => replace(i)}>
          <View key={i} style={styles.card}>
            <View style={styles.imgDiv}>
              <Image style={styles.img} source={{ uri: recette.image }} />
            </View>
            <View style={styles.textDiv}>
              <Text style={styles.titre}>{recette.nom}</Text>
              <Text style={styles.desc}>{recette.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  }

  const replace = (nb) => {
    console.log('recetteSemainier', recetteSemainier);
    
    // setRecetteSemainier((recetteSemainier[nb] = recetteSuggerer[nb]));
    // dispatch(addAllRecette(recetteSemainier));
    // navigation.navigate("Semainier");
  };

  return (
    <View style={styles.container}>
      <View style={styles.recetteDiv}>
        <ScrollView>{recetteAffiche}</ScrollView>
      </View>
      <Button title="remove" onPress={() => dispatch(removeAllRecette())} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width - 30,
    height: 175,
    borderRadius: 4,
    backgroundColor: "#78CB26",
    margin: 6,
  },
  imageCard: {
    width: "100%",
    height: 90,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  imgDiv: {},
  img: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  desc: { fontWeight: 300, fontSize: 10 },
  recetteDiv: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textDiv: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  // titre: {
  //   fontWeight: 900,
  //   fontSize : 20,
  //   marginBottom : 15,
  // },
});
