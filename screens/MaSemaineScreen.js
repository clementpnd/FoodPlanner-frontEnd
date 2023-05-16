import { Button, StyleSheet, Text, View } from "react-native";
//import des hooks d'effets
import { useState, useEffect } from "react";

//import du module map
import MapView, { Marker } from "react-native-maps";
//import du module de geoloc
import * as Location from "expo-location";

export default function MaSemaineScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState(null); //variable d'état de location de l'utilisateur
  //Attente d'autorisation de la géoloc
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
        console.log(currentPosition);
      }
    })();
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.creationSemaine}>
        <Text>CREATION SEMAINE</Text>
      </View>
      <View style={styles.maSemaine}>
        <Text>MA SEMAINE</Text>
      </View>
      <View style={styles.map}>
        <MapView
          initialRegion={{
            latitude: currentPosition.latitude,
            longitude: currentPosition.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        ></MapView>
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
  creationSemaine: {
    display: "flex",
    backgroundColor: "blue",
    width: 360,
    height: 100,
    marginBottom: 5,
    borderRadius: 4,
  },
  maSemaine: {
    display: "flex",
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
});
