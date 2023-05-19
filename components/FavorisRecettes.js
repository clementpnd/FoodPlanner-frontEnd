import React, { Component, useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { ADDRESSE_BACKEND } from "@env";
import { useSelector } from "react-redux";

function FavorisRecettes() {
  const user = useSelector((state) => state.users.value);
  const [recetteToDisplay, setRecetteToDisplay] = useState([]);
  const affichageRecetteFavorite = () => {
    fetch(`${ADDRESSE_BACKEND}/users/recetteFavorites/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setRecetteToDisplay(data);
      });
  };

  useEffect(() => {
    affichageRecetteFavorite(recetteToDisplay);
  }, []);

  // console.log("varible d etat : ", recetteToDisplay);
  const displayedRecette = recetteToDisplay.map((data, i) => {
    return (
      <View key={i} style={styles.card}>
        <Text>{data.title}</Text>
        <Text>{data.description}</Text>
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
    backgroundColor: "blue",
    height: 100,
    width: 370,
    alignItems: "center",
    marginBottom: 4,
  },
  title: { fontFamily: "Fredoka", fontSize: 30 },
  card: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "purple",
    width: 350,
    height: 120,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default FavorisRecettes;
