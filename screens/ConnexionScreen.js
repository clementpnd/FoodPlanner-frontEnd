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
} from "react-native";

export default function ConnexionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoDiv}>
        <Image source={require("../assets/icon.png")} style={styles.logo} />
      </View>
      <KeyboardAvoidingView>
      <View style={styles.content}>
        <Text style={styles.label}>Prenom</Text>
        <View style={styles.inputDiv}>
          <TextInput placeholder="Prenom" style={styles.input}></TextInput>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Pseudo</Text>
        <View style={styles.inputDiv}>
          <TextInput placeholder="Pseudo" style={styles.input}></TextInput>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Adresse mail</Text>
        <View style={styles.inputDiv}>
          <TextInput placeholder="Adresse mail" style={styles.input}></TextInput>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Mot de passe</Text>
        <View style={styles.inputDiv}>
          <TextInput placeholder="Mot de passe" style={styles.input}></TextInput>
        </View>
      </View>
      </KeyboardAvoidingView>
      <View style={styles.submitDiv}>
        <TouchableOpacity style={styles.submit}>
            <Text>Let's go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop : 20,
    marginBottom : 20,
  },
  inputDiv: {
    alignItems: "center",
    borderBottomWidth : 1

  },
  input: {
    borderColor: "red",
    height: 40,
    width: Dimensions.get("window").width - 40,
  },
  label: {
        marginLeft : 20,    
  },
  submitDiv: {
    alignItems : "center"
  },
  submit: {
    backgroundColor : "#78CB26",
    width: 200,
    height : 40,
    alignItems : "center",
    justifyContent:  "center",
    borderRadius: 20,
    
  }
});
