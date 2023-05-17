import {
  Button,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
const BACKEND_ADDRESS = 'http://10.2.1.16:3000'; //10.2.1.16
import { useDispatch, useSelector } from "react-redux";
import { addUsers, removeUsers } from "../reducers/users";


export default function ConnexionScreen({ navigation }) {
  const dispatch = useDispatch();
  //HOOK D'ETAT
  const [prenom, setPrenom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [mailError, setMailError] = useState(false);

  // regex pour la validation de l'email
  const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const letsGo = () => {
    const data = {
      mail: mail,
    };
  //  if(EMAIL_REGEX.test(mail)) {
    fetch("http://10.2.1.12:3000/users/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          setMailError(true);
        } else {
          const user = {
            prenom: prenom,
            pseudo: pseudo,
            mail: mail,
            password: password,
          };
          dispatch(addUsers(user));
          navigation.navigate("CreateProfilScreen");
        }
      });
    // }
    // else{
    //     setMailError(true);
    // }
};

console.log(mailError);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboard}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.logoDiv}>
              <Image
                source={require("../assets/logo.jpg")}
                style={styles.logo}
              />
        <Button title="remove" onPress={() => dispatch(removeUsers())}></Button>

            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Prenom</Text>
              <View style={styles.inputDiv}>
                <TextInput
                  placeholder="Prenom"
                  style={styles.input}
                  onChangeText={(e) => setPrenom(e)}
                ></TextInput>
              </View>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Pseudo</Text>
              <View style={styles.inputDiv}>
                <TextInput
                  placeholder="Pseudo"
                  style={styles.input}
                  onChangeText={(e) => setPseudo(e)}
                ></TextInput>
              </View>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Adresse mail</Text>
              <View style={styles.inputDiv}>
              
                <TextInput
                  placeholder="Adresse mail"
                  style={styles.input}
                  onChangeText={(e) => setMail(e)}
                ></TextInput>
                {mailError && 
                  <Text style={styles.error}>Format du mail invalide</Text>
                }
                
              </View>
            </View>
            <View style={styles.content}>
              <Text style={styles.label}>Mot de passe</Text>
              <View style={styles.inputDiv}>
                <TextInput
                secureTextEntry={true}
                type="password"
                  placeholder="Mot de passe"
                  style={styles.input}
                  textContentType="password"
                  onChangeText={(e) => setPassword(e)}
                ></TextInput>
              </View>
            </View>
            <View style={styles.submitDiv}>
              <TouchableOpacity style={styles.submit} onPress={() => letsGo()}>
                <Text>Let's go</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    height: "100%",
  },
  logoDiv: {
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  content: {
    padding: 45,
    flex: 1,
    justifyContent: "flex-end",
  },
  inputDiv: {
    alignItems: "center",
    borderBottomWidth: 1,
  },
  input: {
    borderColor: "red",
    height: 40,
    width: Dimensions.get("window").width - 40,
  },
  label: {
    marginLeft: 20,
  },
  submitDiv: {
    alignItems: "center",
  },
  submit: {
    backgroundColor: "#78CB26",
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  error: {
    color: "red",
    marginBottom: 10,
    backgroundColor : "red"
  },
});
