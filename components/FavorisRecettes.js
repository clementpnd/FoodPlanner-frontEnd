import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

function FavorisRecettes() {
  return (
    <View style={styles.main}>
      <Text>Favoris Recettes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: "blue", height: 100, width: 300 },
});

export default FavorisRecettes;
