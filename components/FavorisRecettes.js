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
import { useDispatch, useSelector } from "react-redux";
import recettesFavorites, {
  addFavoriteRecette,
  removeFavoriteRecette,
  displayFavoriteRecette,
  findId,
} from "../reducers/recettesFavorites";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function FavorisRecettes() {
  const dispatch = useDispatch();
  // const recetteRedux = useSelector((state) => state.recettesFavorites.value);
  const user = useSelector((state) => state.users.value);

  const [recetteToDisplay, setRecetteToDisplay] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // variable d'état qui gère la modale

  useEffect(() => {
    fetch(`http://192.168.1.51:3000/users/recetteFavorites/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setRecetteToDisplay(data);
        dispatch(addFavoriteRecette(recetteToDisplay));
      });
  }, [isModalVisible]);

  //fonction qui gère l'affichage de la modale
  let showModal = () => {
    dispatch(findId());
    setIsModalVisible(true);
  };
  //fonction qui supprime une recette des favoris
  // const handleDeleteFavorite = () => {
  //   fetch(`http://192.168.1.51:3000/users/deleteFav`, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ recetteFavoris: recetteRedux }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       data.result && dispatch(removeFavoriteRecette(recetteToDisplay));
  //     });
  // };

  const displayedRecette = recetteToDisplay.map((data, i) => {
    return (
      <View key={i} style={styles.card}>
        <TouchableOpacity
          // onPress={() => handleDeleteFavorite()}
          style={styles.closebuttonCard}
        >
          <FontAwesome name="times" size={20} color="#000000" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.modalOPening}
          onPress={() => showModal()}
        >
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
                  style={styles.closebuttonModal}
                  onPress={() => setIsModalVisible(!isModalVisible)}
                >
                  <FontAwesome name="times" size={20} color="#000000" />
                </TouchableOpacity>
                <Text>{data.nom}</Text>
                <Text>Ingrédients</Text>
                {/* <Text>{displayedIngredients}</Text> */}
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
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "green",
    width: Dimensions.get("window").width - 20,
    height: 160,
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 4,
  },
  imageCard: {
    width: 100,
    height: 70,
    marginLeft: 4,
    borderRadius: 4,
  },
  text: {},
  modalOPening: { width: "85%", height: "100%" },
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
  },
  closebuttonModal: { position: "relative", marginLeft: 330 },
  closebuttonCard: { position: "absolute", marginLeft: 330 },
});

export default FavorisRecettes;
