import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Modal,
} from "react-native";
//import des hooks d'effets
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import React from "react";
//import du module map
import MapView, { Marker } from "react-native-maps";
//import du module de geoloc
import * as Location from "expo-location";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function AccueilScreen({ navigation }) {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 43.29,
    longitude: 5.37,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }); //variable d'état de location de l'utilisateur
  const [apiData, setApiData] = useState([]); //variable d'état qui recupère les données de l'api
  const [modalErrorSemainier, setModalErrorSemainier] = useState(false);
  const semaineRedux = useSelector((state) => state.semaines.value);
  //Attente d'autorisation de la géoloc
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
          fetchData();
        });
      }
    })();
  }, []);

  //fonction qui fetch l'API en fonction de ta localisation
  const fetchData = async () => {
    fetch(
      `https://opendata.agencebio.org/api/gouv/operateurs/?activite=Distribution&lat=${currentPosition.latitude}&lng=${currentPosition.longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.items);
      });
  };

  const maSemaine = () => {
    if (semaineRedux.allCheckBoxSelected !== undefined) {
      navigation.navigate("Semainier");
    } else {
      setModalErrorSemainier(true);
    }
  };
  //ajout des marqueurs graces aux données en dur récupéré via l'api du gouvernement sur le bio
  const markers = apiData.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{
          latitude: data.adressesOperateurs[0].lat,
          longitude: data.adressesOperateurs[0].long,
        }}
        title={data.denominationcourante}
      />
    );
  });

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.semaineEnCours}>
          <View>
            <TouchableOpacity
              style={styles.buttonAccessSemainier}
              onPress={() => maSemaine()}
            >
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalErrorSemainier}
                onRequestClose={() => {
                  setIsModalVisible(!modalErrorSemainier);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text>Aucune semaine n'est actuellement en cours</Text>
                    <Text>Allons en créer une !</Text>
                    <View style={{ marginTop: 50 }}>
                      <TouchableOpacity
                        style={styles.buttonCLose}
                        onPress={() => setModalErrorSemainier(false)}
                      >
                        <Text>Fermer</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <FontAwesome name="calendar" size={40} color="#979797" />
              <Text style={styles.buttonTextEnCours}>Ma semaine en cours</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.creationSemaine}>
          <TouchableOpacity
            style={styles.buttonCreationSemaine}
            onPress={() => navigation.navigate("Ma Semaine")}
          >
            <Text style={styles.buttonTextCreate}>Créer ma semaine</Text>

            <FontAwesome name="calendar" size={40} color="#E4631B" />
          </TouchableOpacity>
        </View>

        <View style={styles.mapContainer}>
          <MapView region={currentPosition} style={styles.mapview}>
            {currentPosition && (
              <Marker coordinate={currentPosition} pinColor="blue"></Marker>
            )}
            {markers}
          </MapView>
          <Text style={styles.mapText}>Où faires ses courses ?</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    fontFamily: "Fredoka",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "95%",
  },
  semaineEnCours: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "rgba(    120, 203, 38, 0.4)r",
    width: "100%",
    height: "20%",
    marginBottom: "2%",
    borderRadius: 4,
  },
  buttonClose: {
    backgroundColor: "#E4631B",
  },
  creationSemaine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "rgba(    120, 203, 38, 0.4)r",
    width: "100%",
    height: "20%",
    marginBottom: "2%",
    borderRadius: 4,
    paddingTop: "1%",
  },
  mapContainer: {
    display: "flex",
    height: "55%",
    flexDirection: "column",
    backgroundColor: "rgba(    228, 97, 27, 1, 0.6)",
    borderRadius: 4,
  },
  mapview: {
    height: "90%",
  },
  mapText: {
    fontFamily: "FredokaBold",
    alignSelf: "center",
    marginTop: "2%",
  },
  buttonCreationSemaine: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "space-around",
    alignItems: "center",
    marginRight: 9,
    paddingRight: "10%",
  },
  buttonAccessSemainier: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "space-around",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 9,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 215,
    alignItems: "center",
  },
  modalView: {
    fontFamily: "Fredoka",
    backgroundColor: "#ffff",
    borderRadius: 4,
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  buttonCLose: {
    fontFamily: "Fredoka",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#78CB26",
    borderRadius: 4,
    width: 200,
    height: 50,
  },
  textButton: {
    fontFamily: "Fredoka",
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTextCreate: {
    fontFamily: "FredokaBold",
    marginRight: "30%",
    fontSize: 20,
  },

  buttonTextEnCours: {
    fontFamily: "FredokaBold",
    marginLeft: "30%",
    fontSize: 20,
  },
});
