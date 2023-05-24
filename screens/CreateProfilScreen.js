import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, removeUsers } from "../reducers/users";
import { removeAllRecette } from "../reducers/recettes";
import { removeAllSemaine } from "../reducers/semaines";
//import de .env front
import { ADDRESSE_BACKEND } from "@env";

export default function CreateProfilScreen({ navigation }) {
  const user = useSelector((state) => state.users.value);

  const [userState, setUserState] = useState({ ...user });
  const dispatch = useDispatch();

  //HOOK D'ETAT
  const [aucun, setAucun] = useState(false);
  const [vege, setVege] = useState(false);
  const [poulet, setPoulet] = useState(false);
  const [poisson, setPoisson] = useState(false);
  const [feculent, setFeculent] = useState(false);
  const [nbPersonne, setNbPersonne] = useState("1");
  ///
  const pickerRef = useRef();

  //   FUNCTION
  const disabled = () => {
    setVege(false);
    setPoulet(false);
    setPoisson(false);
    setFeculent(false);
    setAucun(!aucun);
  };
  const camera = () => {
    navigation.navigate("CameraScreen");
  };

  ///HOOK D'EFFET
  useEffect(() => {
    setUserState({
      ...userState,
      preference: preference,
      nbPersonne: nbPersonne,
    });
  }, [preference, nbPersonne]);

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

  const planifionsSemaine = () => {
    fetch(`${ADDRESSE_BACKEND}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userState),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(addUsers({ token: data.token }));
          navigation.navigate("TabNavigator", { screen: "Accueil" });
        }
      });
  };

  //////VARIABLE
  items = [];
  for (let i = 1; i < 11; i++) {
    j = i.toString();
    items.push(<Picker.Item label={j} value={j} />);
  }

  let image = require("../assets/User.png");

  if (user.photoProfil !== undefined) {
    image = { uri: user.photoProfil };
    if (!userState.photoProfil) {
      setUserState({ ...userState, photoProfil: user.photoProfil });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgDiv}>
        <Image source={image} style={styles.img} />
        <TouchableOpacity onPress={() => camera()} style={styles.pictureButton}>
          <Text style={styles.picturesText}>Photo de profil</Text>
        </TouchableOpacity>

        <Text style={styles.slogan}>Apprenons à nous connaitre</Text>
      </View>
      
      <View style={styles.regimeDiv}>
        <Text style={styles.regimeText}>
          Avez-vous un régime alimentaire particulier ?
        </Text>
        <View style={styles.switchDiv}>
          <View style={styles.regime}>
            <Text>Aucun</Text>
            <Switch value={aucun} onValueChange={() => disabled()} />
          </View>
          <View style={styles.regime}>
            <Text>Végé</Text>
            <Switch
              value={vege}
              disabled={aucun}
              onValueChange={() => setVege(!vege)}
            />
          </View>
          <View style={styles.regime}>
            <Text>poulet</Text>
            <Switch
              value={poulet}
              disabled={aucun}
              onValueChange={() => setPoulet(!poulet)}
            />
          </View>
          <View style={styles.regime}>
            <Text>poisson</Text>
            <Switch
              value={poisson}
              disabled={aucun}
              onValueChange={() => setPoisson(!poisson)}
            />
          </View>
          <View style={styles.regime}>
            <Text>feculent</Text>
            <Switch
              value={feculent}
              disabled={aucun}
              onValueChange={() => setFeculent(!feculent)}
            />
          </View>
          <View style={styles.personneDiv}>
            <Text style={styles.personneText}>
              On cuisine pour combien de personne ?
            </Text>
            <Picker
              ref={pickerRef}
              selectedValue={nbPersonne}
              onValueChange={(itemValue, itemIndex) => setNbPersonne(itemValue)}
            >
              {items}
            </Picker>

            <View style={styles.submitDiv}>
              <TouchableOpacity
                style={styles.submit}
                onPress={() => planifionsSemaine()}
              >
                {items}
                </TouchableOpacity>
            
              <View style={styles.submitDiv}>
                <TouchableOpacity
                  style={styles.submit}
                  onPress={() => planifionsSemaine()}
                >
                  <Text>Planifions ma semaine</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imgDiv: {
    marginTop: 30,
    alignItems: "center",
  },
  img: {
    width: 170,
    height: 170,
    borderRadius: 100,
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
  slogan: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },
  regimeDiv: {
    marginTop: 0,
  },
  regimeText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  switchDiv: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: Dimensions.get("window").width - 80,
    height: 50,
    marginTop: 20,
  },
  personneDiv: {
    marginTop: 30,
  },
  personneText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  submitDiv: {
    alignItems: "center",
    marginTop: 20,
  },
  submit: {
    backgroundColor: "#78CB26",
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
