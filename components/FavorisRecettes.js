import React, { Component, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ADDRESSE_BACKEND } from "@env";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function FavorisRecettes() {
  const user = useSelector((state) => state.users.value);
  const [recetteToDisplay, setRecetteToDisplay] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // variable d'état qui gère la modale

  //fonction qui gère l'affichage de la modale
  let showModal = () => {
    setIsModalVisible(true);
  };

  const affichageRecetteFavorite = () => {
    fetch(`${ADDRESSE_BACKEND}/users/recetteFavorites/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setRecetteToDisplay(data);
      });
  };

  useEffect(() => {
    affichageRecetteFavorite();
  }, []);

  const displayedRecette = recetteToDisplay.map((data, i) => {
    return (
      <View key={i} style={styles.card}>
        <TouchableOpacity onPress={() => showModal()}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setIsModalVisible(!isModalVisible);
            }}
          >
            <View style={styles.modal}>
              <ScrollView style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closebutton}
                  onPress={() => setIsModalVisible(!isModalVisible)}
                >
                  <FontAwesome name="times" size={20} color="#000000" />
                </TouchableOpacity>
                <Text>{data.nom}</Text>
                <Text>Ingrédients</Text>
                <Text></Text>
                <Text>Instruction</Text>
                <Text>{data.instruction}</Text>
              </ScrollView>
            </View>
          </Modal>
          <Image source={{ uri: data.image }} style={styles.imageCard}></Image>
          <View style={styles.text}>
            <Text>{data.nom}</Text>
            <Text numberOfLines={4}>{data.description}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  });
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Favoris Recettes</Text>
      <ScrollView>{displayedRecette}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,

    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 4,
  },
  title: { fontFamily: "Fredoka", fontSize: 30 },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    width: Dimensions.get("window").width - 20,
    height: 160,
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 4,
  },
  imageCard: {
    width: 100,
    height: 100,
    marginLeft: 4,
    borderRadius: 4,
  },
  text: {},
  modal: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 50,
  },
  modalContent: {
    backgroundColor: "#ffff",
    borderRadius: 4,
    paddingHorizontal: 10,
    shadowColor: "#000",
    //   shadowOffset: {
    //     width: 0,
    //     height: 0,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 6,
    //   elevation: 15,
  },
});

export default FavorisRecettes;
