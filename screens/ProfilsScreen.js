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
  ScrollView,
  Switch,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { removeUsers } from "../reducers/users";
import Header from "../components/Header";

export default function ProfilsScreen({ navigation }) {
  const [photoProfil, setPhotoProfil] = useState("");
  const [prenom, setPrenom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [mail, setMail] = useState("");
  const [mdp, setMdp] = useState();
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);

  const [aucun, setAucun] = useState(false);
  const [vege, setVege] = useState(false);
  const [poulet, setPoulet] = useState(false);
  const [poisson, setPoisson] = useState(false);
  const [feculent, setFeculent] = useState(false);
  const [userState, setUserState] = useState({ ...user });

  useEffect(() => {
    fetch(`http://10.2.1.12:3000/users/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setPrenom(data.user.prenom);
        setPseudo(data.user.pseudo);
        setMail(data.user.mail);
        if (data.user.photoProfil === "") {
          image = require("../assets/User.png");
        } else {
          setPhotoProfil(data.user.photoProfil);
        }
      });
  }, [photoProfil]);

  let image = { uri: photoProfil };
  if (user.photoProfil !== undefined) {
    image = { uri: user.photoProfil };
    if (!user.photoProfil) {
      setPhotoProfil({ ...user, photoProfil: user.photoProfil });
    }
  }

  const logout = () => {
    dispatch(removeUsers());
    navigation.navigate(" ");
  };

  const saveData = () => {
    setEditable(!editable);
    fetch(`http://10.2.1.12:3000/users/profilUpdate/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prenom: prenom,
        pseudo: pseudo,
        photoProfil: user.photoProfil,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === false) {
        }
      });
  };

  let colorFont = "black";
  let buttonSubmit;
  let buttonPhoto;

  if (editable) {
    colorFont = "#E4631B";
    buttonSubmit = (
      <View>
        <TouchableOpacity style={styles.saveButton} onPress={() => saveData()}>
          <Text style={styles.picturesText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
    buttonPhoto = (
      <TouchableOpacity
        style={styles.pictureButton}
        onPress={() => navigation.navigate("CameraScreen")}
      >
        <Text style={styles.picturesText}>Photo de profil</Text>
      </TouchableOpacity>
    );
  }

  const disabled = () => {
    setVege(false);
    setPoulet(false);
    setPoisson(false);
    setFeculent(false);
    setAucun(!aucun);
  };

  ///HOOK D'EFFET
  useEffect(() => {
    setUserState({
      ...userState,
      preference: preference,
    });
  }, [preference]);

  const preference = [];
  vege === true
    ? preference.push("vege")
    : preference.filter((d) => d !== vege);
  poulet === true
    ? preference.push("poulet")
    : preference.filter((d) => d !== poulet);
  poisson === true
    ? preference.push("poisson")
    : preference.filter((d) => d !== poisson);
  feculent === true
    ? preference.push("feculent")
    : preference.filter((d) => d !== feculent);

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Header />
      </TouchableOpacity>
      <View style={styles.profilDiv}>
        <View style={styles.titleDiv}>
          <Text style={styles.textProfile}>Profil</Text>
        </View>
        <View style={styles.logout}>
          <TouchableOpacity
            style={styles.pictureButton}
            onPress={() => logout()}
          >
            <Text style={styles.picturesText}>Log out</Text>
          </TouchableOpacity>
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
            <TextInput
              value={prenom}
              placeholder="Prénom"
              editable={editable}
              style={styles.text}
              onChangeText={(e) => setPrenom(e)}
            />
          </View>
          <View style={[styles.textPseudoDiv, styles.divText]}>
            <TextInput
              value={pseudo}
              editable={editable}
              style={styles.text}
              placeholder="Pseudo"
              onChangeText={(e) => setPseudo(e)}
            />
          </View>
          <View style={[styles.textMailDiv, styles.divText]}>
            <TextInput value={mail} editable={false} style={styles.text} />
          </View>
          <View style={styles.preferenceDiv}>
            <View>
              <Text style={styles.preferenceTitle}>Vos préférences</Text>
            </View>
            <View style={styles.switchDiv}>
              <View style={styles.switch}>
                <Text>Aucun</Text>
                <Switch value={aucun} onValueChange={() => disabled()} />
              </View>
              <View style={styles.switch}>
                <Text>Végé</Text>
                <Switch
                  value={vege}
                  disabled={aucun}
                  onValueChange={() => setVege(!vege)}
                />
              </View>
              <View style={styles.switch}>
                <Text>Poulet</Text>
                <Switch
                  value={poulet}
                  disabled={aucun}
                  onValueChange={() => setPoulet(!poulet)}
                />
              </View>
              <View style={styles.switch}>
                <Text>Poisson</Text>
                <Switch
                  value={poisson}
                  disabled={aucun}
                  onValueChange={() => setPoisson(!poisson)}
                />
              </View>
              <View style={styles.switch}>
                <Text>Feculent</Text>
                <Switch
                  value={feculent}
                  disabled={aucun}
                  onValueChange={() => setFeculent(!feculent)}
                />
              </View>
            </View>
          </View>
        </View>
        <View>{buttonSubmit}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profilDiv: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
  },

  textProfile: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logout: {
    marginBottom: 40,
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
  photoDiv: {
    width: Dimensions.get("window").width,
    height: 220,
    alignItems: "center",
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  AllTextInfoDiv: {
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

  picturesText: {
    fontSize: 20,
  },

  preferenceDiv: {
    alignItems: "center",
  },
  preferenceTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  saveButton: {
    marginTop: 10,
    width: 130,
    height: 40,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(228, 255, 27, 0.6)",
    borderRadius: 10,
  },
  switchDiv: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: 300,
    height: 50,
    marginTop: 20,
    backgroundColor: "red",
  },
  switch: { width: 60, height: 60 },
});
