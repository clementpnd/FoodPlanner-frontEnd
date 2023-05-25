import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

function FavorisSemaine() {
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Semaine type</Text>
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
  title: {
    fontFamily: "Fredoka",
    fontSize: 30,
  },
});

export default FavorisSemaine;
