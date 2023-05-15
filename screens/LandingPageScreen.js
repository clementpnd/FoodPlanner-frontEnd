//import react-native
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Modal,
  TextInput,
} from "react-native";
//import React
import { useState } from "react";

export default function LandingPageScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false); // variable d'état qui gère la modale
  const [email, setEmail] = useState(""); //variable d'état pour le mail
  const [password, setPassword] = useState(""); //variable d'état pour le mdp

  //fonction qui gère l'affichage de la modale
  let showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <View style={styles.main}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo}></Image>
      <Text style={styles.title}>Food Planner</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => showModal()}>
          <Text>Connexion</Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
              setIsModalVisible(!isModalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.registerSection}>
                  <TextInput
                    type="text"
                    placeholder="Email"
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                  />
                  <TextInput
                    type="password"
                    placeholder="Password"
                    id="signUpPassword"
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setIsModalVisible(!isModalVisible)}
                >
                  <Text style={styles.textStyle}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setIsModalVisible(true)}
          ></TouchableOpacity>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "MaSemaineScreen" })
          }
        >
          <Text>Inscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
  },
  logo: { height: "40%", width: "60%" },
  title: { fontSize: 70 },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "5%",
    backgroundColor: "#E4631B",
    borderRadius: 4,
    marginBottom: "5%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 5,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 120,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
