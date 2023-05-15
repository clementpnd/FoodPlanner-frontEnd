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
//import fontawesome pour les icones
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function LandingPageScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false); // variable d'état qui gère la modale
  const [email, setEmail] = useState(""); //variable d'état pour le mail
  const [password, setPassword] = useState(""); //variable d'état pour le mdp

  //fonction qui gère l'affichage de la modale
  let showModal = () => {
    setIsModalVisible(true);
  };

  //fonction qui gère la connexion de l'utilisateur
  const handleConnection = () => {
    fetch("http://10.2.0.221:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mail: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          setEmail("");
          setPassword("");
          setIsModalVisible(false);
          navigation.navigate("TabNavigator", { screen: "Ma Semaine" });
        }
      });
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
                <TouchableOpacity
                  style={styles.closebutton}
                  onPress={() => setIsModalVisible(!isModalVisible)}
                >
                  <FontAwesome name="times" size={20} color="#000000" />
                </TouchableOpacity>
                <View style={styles.emailSection}>
                  <TextInput
                    type="text"
                    placeholder="Email"
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                    style={styles.input}
                  />
                </View>
                <View style={styles.passwordSection}>
                  <TextInput
                    secureTextEntry={true}
                    type="password"
                    placeholder="Password"
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                  />
                </View>

                <TouchableOpacity
                  style={styles.connectButton}
                  onPress={() => handleConnection()}
                >
                  <Text>Connexion</Text>
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
        // onPress={() =>}
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
  logo: { height: "30%", width: "55%", borderRadius: 100, margin: 10 },
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
    margin: 3,
    backgroundColor: "#ffff",
    borderRadius: 4,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 15,
  },
  emailSection: {
    justifyContent: "center",
    backgroundColor: "rgba(239, 239, 239, 0.8)",
    width: 300,
    height: 40,
    borderRadius: 4,
    marginBottom: 30,
  },
  passwordSection: {
    justifyContent: "center",
    backgroundColor: "rgba(239, 239, 239, 0.8)",
    width: 300,
    height: 40,
    borderRadius: 4,
  },
  input: {
    color: "black",
  },
  connectButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#78CB26",
    borderRadius: 4,
    width: 80,
    height: 30,
    margin: 10,
  },
  closebutton: {
    marginLeft: 260,
    marginBottom: 15,
  },
});
