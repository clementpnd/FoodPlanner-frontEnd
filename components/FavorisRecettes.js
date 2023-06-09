import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Modal,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ADDRESSE_BACKEND } from "@env";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteRecette,
  removeFavoriteRecette,
} from "../reducers/recettesFavorites";
import FontAwesome from "react-native-vector-icons/FontAwesome";

function FavorisRecettes() {
  const dispatch = useDispatch();
  const recetteRedux = useSelector((state) => state.recettesFavorites.value);
  const user = useSelector((state) => state.users.value);
  const [isModalVisible, setIsModalVisible] = useState(false); // variable d'état qui gère la modale

  useEffect(() => {
    fetch(
      `food-planner-back-end.vercel.app/users/recetteFavorites/${user.token}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(addFavoriteRecette(data));
      });
  }, [isModalVisible]);

  //fonction qui gère l'affichage de la modale
  let showModal = () => {
    setIsModalVisible(true);
  };
  console.log("recetteRedux", recetteRedux);

  //fonction qui supprime une recette des favoris
  // const handleDeleteFavorite = (nb) => {
  //   console.log(
  //     "recette redux index dans le tableau ",
  //     recetteRedux.recettesFavorites[nb]._id
  //   );
  //   fetch(`${ADDRESSE_BACKEND}/users/deleteFavorisRecette/${user.token}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       recetteFavoris: recetteRedux.recettesFavorites[nb]._id,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.result) {
  //         dispatch(removeFavoriteRecette(data.nom));
  //       }
  //     });
  // };

  const displayedRecette = recetteRedux.recettesFavorites.map((data, i) => {
    return (
      <View key={i} style={styles.card}>
        <TouchableOpacity
          style={styles.modalOPening}
          onPress={() => showModal()}
        >
          <ImageBackground
            source={{ uri: data.image }}
            style={styles.imageCard}
          />
          <TouchableOpacity
            // onPress={() => handleDeleteFavorite(i)}
            onPress={() => dispatch(removeFavoriteRecette(data.nom))}
            style={styles.closebuttonCard}
          >
            <FontAwesome name="times" size={30} color="#000000" />
          </TouchableOpacity>
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
          <View style={styles.text}>
            <Text style={styles.recetteTitle}>{data.nom}</Text>
            <Text numberOfLines={4} style={styles.desc}>
              {data.description}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.title}>Recettes favorites</Text>
      <ScrollView>{displayedRecette}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 4,
  },
  title: {
    fontFamily: "Fredoka",
    fontSize: 30,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#78CB26",
    width: Dimensions.get("window").width - 20,
    height: 185,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  imageCard: {
    alignItems: "center",
    width: "100%",
    height: 80,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  recetteTitle: { fontWeight: 900, fontSize: 17, margin: 2 },
  desc: { fontWeight: 300, fontSize: 10 },

  modalOPening: { width: "100%", height: "100%" },
  modal: {
    flex: 1,
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
