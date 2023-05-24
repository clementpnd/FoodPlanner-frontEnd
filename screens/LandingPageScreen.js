//import react-native
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  View,
  Modal,
  TextInput,
  SafeAreaView,
} from "react-native";
//import React
import { useState } from "react";
//import fontawesome pour les icones
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { addUsers } from "../reducers/users";
//.env du front
import { ADDRESSE_BACKEND } from "@env";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { removeAllRecette } from "../reducers/recettes";
import { removeAllSemaine } from "../reducers/semaines";

export default function LandingPageScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false); // variable d'état qui gère la modale
  const [email, setEmail] = useState(""); //variable d'état pour le mail
  const [password, setPassword] = useState(""); //variable d'état pour le mdp
  const [emailError, setEmailError] = useState(false); // variable d'état pour la vérification de l'adresse mail
  // regex pour la validation de l'email
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //fonction qui gère l'affichage de la modale
  let showModal = () => {
    setIsModalVisible(true);
  };
  //fonction qui gère la connexion de l'utilisateur
  const handleConnection = () => {
    if (EMAIL_REGEX.test(email)) {
      fetch(`${ADDRESSE_BACKEND}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mail: email, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            setEmail("");
            setPassword("");
            setIsModalVisible(false);
            console.log(data);
            user = {
              token: data.token,
            };
            dispatch(addUsers(user));
            navigation.navigate("TabNavigator", { screen: "Accueil" });
          }
        });
    } else {
      setEmailError(true);
    }
  };
  dispatch(removeAllRecette());
  dispatch(removeAllSemaine());
  return (
    <SafeAreaView style={styles.main}>
      <Image source={require("../assets/logo.jpg")} style={styles.logo}></Image>
      <Text style={styles.title}>Food Planner</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.connexionButton}
          onPress={() => showModal()}
        >
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
                {emailError && (
                  <Text style={styles.error}>Format du mail invalide</Text>
                )}
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
          style={styles.inscriptionButton}
          onPress={() => navigation.navigate("ConnexionScreen")}
        >
          <Text>Inscription</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
  },
  logo: { width: 200, height: 200, borderRadius: 100, margin: 10 },
  title: {
    display: "flex",
    fontSize: 80,
    fontWeight: 900,
    fontFamily: "FredokaBold",
    color: "#263238",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "7%",
    backgroundColor: "#E4631B",
    borderRadius: 4,
    marginBottom: 25,
  },
  connexionButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  inscriptionButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 215,
    alignItems: "center",
  },
  modalView: {
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
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 15,
  },
  emailSection: {
    fontFamily: "Fredoka",
    justifyContent: "center",
    backgroundColor: "rgba(239, 239, 239, 0.8)",
    width: 300,
    height: 40,
    borderRadius: 4,
    marginTop: 5,
    marginBottom: 10,
  },
  passwordSection: {
    fontFamily: "Fredoka",
    justifyContent: "center",
    backgroundColor: "rgba(239, 239, 239, 0.8)",
    marginBottom: 20,
    marginTop: 20,
    width: 300,
    height: 40,
    borderRadius: 4,
  },
  input: {
    fontFamily: "Fredoka",
    color: "black",
  },
  connectButton: {
    fontFamily: "Fredoka",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#78CB26",
    borderRadius: 4,
    width: 200,
    height: 50,
    margin: 10,
  },
  closebutton: {
    marginLeft: 260,
  },
  error: {
    fontFamily: "Fredoka",
    color: "red",
    marginBottom: 10,
  },
});
