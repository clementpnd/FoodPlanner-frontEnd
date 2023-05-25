import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
//import des composants
import FavorisRecettes from "../components/FavorisRecettes";
import FavorisSemaine from "../components/FavorisSemaine";

export default function FavorisScreen({ navigation }) {
  const [recetteActive, setRecetteActive] = useState(true); //variable d'état pour gérer l'affichage du composant recette
  const [semaineActive, setSemaineActive] = useState(false); //variable d'état pour gérer l'affichage du composant semaine

  //au clic sur le bouton recette
  const handleRecetteClick = () => {
    setRecetteActive(true);
    setSemaineActive(false);
  };
  //au click sur le bouton semaine
  const handleSemaineClick = () => {
    setRecetteActive(false);
    setSemaineActive(true);
  };

  const affichage = () => {
    if (recetteActive === true) {
      return <FavorisRecettes />;
    } else {
      return <FavorisSemaine />;
    }
  };

  return (
    <View style={styles.container}>
      {affichage()}
      <View style={styles.buttonContainer}>
        <View style={styles.recetteButtonView}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => handleRecetteClick()}
          >
            <Text style={styles.text}>Recette</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.semaineButtonView}>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => handleSemaineClick()}
          >
            <Text>Semaine</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 360,
    height: 74,
    marginBottom: 10,
  },
  recetteButtonView: {
    display: "flex",
    borderRadius: 4,
    backgroundColor: "green",
    width: 175,
    height: 70,
  },
  semaineButtonView: {
    display: "flex",
    borderRadius: 4,
    backgroundColor: "green",
    width: 175,
    height: 70,
  },
  Button: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { display: "flex", alignItems: "center", justifyContent: "center" },
});
