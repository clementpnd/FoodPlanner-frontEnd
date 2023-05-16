import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
//import des hooks d'effets
import { useState, useEffect } from "react";

//import du module map
import MapView, { Marker } from "react-native-maps";
//import du module de geoloc
import * as Location from "expo-location";

export default function AccueilScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(""); //variable d'état de location de l'utilisateur
  //Attente d'autorisation de la géoloc
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.semaineEnCours}>
        <TouchableOpacity
          style={styles.buttonAccessSemainier}
          onPress={() => navigation.navigate("Semainier")}
        >
          <Text>Ma semaine en cours</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.creationSemaine}>
        <TouchableOpacity
          style={styles.buttonCreationSemaine}
          onPress={() => navigation.navigate("Ma Semaine")}
        >
          <Text>Créer ma semaine</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.map}>
        <MapView style={styles.map}>
          {currentPosition && <Marker coordinate={currentPosition}></Marker>}
        </MapView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  semaineEnCours: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#78CB26",
    width: 360,
    height: 100,
    marginBottom: 5,
    borderRadius: 4,
  },
  creationSemaine: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "purple",
    width: 360,
    height: 100,
    marginBottom: 5,
    borderRadius: 4,
  },
  map: {
    display: "flex",
    backgroundColor: "green",
    width: 360,
    height: 350,
    borderRadius: 4,
  },
  buttonCreationSemaine: {
    height: 100,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 9,
  },
  buttonAccessSemainier: {
    height: 100,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 9,
  },
});
