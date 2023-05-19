import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

function FavorisSemaine() {
  return (
    <View style={styles.main}>
      <Text>Favoris Semaine</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "green", height: 100, width: 300 },
});

export default FavorisSemaine;
