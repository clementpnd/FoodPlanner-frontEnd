import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  Dimensions,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { removeUsers } from "../reducers/users";

export default function ProfilsScreen({ navigation }) {
  const [photoProfil, setPhotoProfil] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [mail, setMail] = useState("");
  const [mdp, setMdp] = useState();
  const [editable, setEditable] = useState(false);
  const dispatch  =useDispatch();
  const user = useSelector((state) => state.users.value);


  useEffect(() => {
    fetch(`http://10.2.1.12:3000/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setPrenom(data.user.prenom);
        setPseudo(data.user.pseudo);
        setMail(data.user.mail);
        if (data.user.photoProfil === "") {
          image = require("../assets/User.png")
        }
        else{
          setPhotoProfil(data.user.photoProfil);
        }
      });
  }, [photoProfil]);
  

  let image = {uri:photoProfil};
  if (user.photoProfil !== undefined) {
    image 
    = { uri: user.photoProfil };
    setPhotoProfil(user.photoProfil);
    if (!user.photoProfil) {
      setUser({ ...user, photoProfil: user.photoProfil });
    }
  }


const logout =() =>{
dispatch(removeUsers());
navigation.navigate(" ")
}

const saveData =() =>{
  console.log('user.photoProfil',user.photoProfil);
  setEditable(!editable);
  fetch(`http://10.2.1.12:3000:3000/users/profilUpdate/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
         prenom : prenom,
         pseudo : pseudo,
         photoProfil : user.photoProfil,
       }),
    })
    .then(response=>response.json())
    .then((data) =>{
      if(data.result ===false){
        console.warn(data.error);
      }
    }) 
}


  let colorFont = "black";
  let buttonSubmit ;
  let buttonPhoto;

  if (editable) {
    colorFont = "red";
    buttonSubmit = 
      <View><TouchableOpacity style={styles.saveButton} onPress={() => saveData()}>
          <Text style={styles.picturesText} >Save</Text>
        </TouchableOpacity>
        </View>
      
    // buttonPhoto = 
    // <TouchableOpacity style={styles.pictureButton} onPress={() => navigation.navigate("CameraScreen")}>
    //       <Text style={styles.picturesText}>Photo de profil</Text>
    //     </TouchableOpacity>
  }


  return (
    <View style={styles.profilDiv}>
      <View style={styles.textProfileDiv}>
        <Text style={styles.textProfile}>Profile</Text>
        <Button title="Logout" onPress={() =>logout()}/>
      </View>
      <View style={styles.photoDiv}>
        <Image source={image} style={styles.img} />
        {buttonPhoto}
        
      </View>
      <View style={styles.AllTextInfoDiv}>
        <TouchableOpacity onPress={() => setEditable(!editable)}>
          <FontAwesome name="pencil" size={40} color={colorFont} />
        </TouchableOpacity>
        <View style={[styles.textPrenomDiv, styles.divText]}>
          <TextInput value={prenom} editable={editable} style={styles.text} onChangeText={(e) => setPrenom(e)}/>
        </View>
        <View style={[styles.textPseudoDiv, styles.divText]}>
          <TextInput value={pseudo} editable={editable} style={styles.text} onChangeText={(e) => setPseudo(e)}/>
        </View>
        <View style={[styles.textMailDiv, styles.divText]}>
          <TextInput value={mail} editable={false} style={styles.text} />
        </View>
      </View>
      <View>
        {buttonSubmit}
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  profilDiv: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
  },
  textProfileDiv: {
    marginBottom: 40,
  },
  textProfile: {
    fontSize: 20,
    fontWeight: "bold",
  },
  photoDiv: {
    flex: 1,
    alignItems : "center",
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  AllTextInfoDiv: {
    flex: 1,
    height: 200,
    width: "80%",
  },
  divText: {
    marginTop: 30,
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginBottom: 30,
    width: "100%",
  },
  text: {
    textAlign: "center",
  },
  pictureButton: {
    marginTop: 10,
    width: 130,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(228, 99, 27, 0.6)",
    borderRadius: 10,
  },
  picturesText: {
    fontSize: 20,
  },
  saveButton:{
    marginTop: 10,
    width: 130,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(228, 255, 27, 0.6)",
    borderRadius: 10,
  }
});
