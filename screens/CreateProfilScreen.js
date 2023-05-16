import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Switch,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { useDispatch,useSelector } from "react-redux";
import { addUsers, removeUsers } from "../reducers/users";


export default function CreateProfilScreen({ navigation }) {
  const user = useSelector((state) => state.users.value);

  const [userState, setUserState] = useState({...user});
  // console.log("user first reducer", userState)
  const dispatch = useDispatch();

    let image = require("../assets/User.png");
if(user.photoProfil !==undefined ){
    image = {uri :user.photoProfil}
  }


  //HOOK D'ETAT
  const [aucun, setAucun] = useState(false);
  const [vege, setVege] = useState(false);
  const [hallal, setHallal] = useState(false);
  const [kasher, setKasher] = useState(false);
  const [nbPersonne, setNbPersonne] = useState("1");
  ///
  const pickerRef = useRef();

  //   FUNCTION
  const disabled = () => {
    setVege(false);
    setHallal(false);
    setKasher(false);
    setAucun(!aucun);
  };
  const camera = () => {
    navigation.navigate("CameraScreen");
  };
  
  

  const planifionsSemaine = () => {
    const preference = [];
    vege ===true ? preference.push("vege") : preference.filter(d => d !== vege);
    hallal ===true ? preference.push("hallal") : preference.filter(d => d !== hallal);
    kasher ===true ? preference.push("kasher") : preference.filter(d => d !== kasher);

    console.log(nbPersonne)
    setUserState({...userState, preference : preference, nbPersonne : nbPersonne})
    dispatch(addUsers(userState))
    console.log('user befor fetch', userState )
    fetch("http://10.2.0.221:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userState),
      })
      .then((response) => response.json())
      .then((data) => {
        console.warn(data)
        if(data.result){
          console.warn('in data')
          navigation.navigate("LandingPageScreen")
        }
      })
    };


  //////VARIABLE
  items = [];
  for (let i = 1; i < 11; i++) {
    j = i.toString();
    items.push(<Picker.Item label={j} value={j} />);
  }

 

  return (
    <View style={styles.container}>
      <View style={styles.imgDiv}>
        <Image source={image} style={styles.img} />
        <TouchableOpacity onPress={() => camera()} style={styles.pictureButton}>
        <Text style={styles.picturesText}>Take pictures</Text>
        </TouchableOpacity>
        <Button title="remove" onPress={() => dispatch(removeUsers())}></Button>
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
            <Text>Hallal</Text>
            <Switch
              value={hallal}
              disabled={aucun}
              onValueChange={() => setHallal(!hallal)}
            />
          </View>
          <View style={styles.regime}>
            <Text>Kasher</Text>
            <Switch
              value={kasher}
              disabled={aucun}
              onValueChange={() => setKasher(!kasher)}
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
                <Text>Planifions ma semaine</Text>
              </TouchableOpacity>
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
    marginTop: 40,
    alignItems: "center",
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  pictureButton: {
    marginTop : 10,
    width: 130,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(228, 99, 27, 0.6)',
    borderRadius: 10,
  },
  picturesText : {
    fontSize : 20,
  },
  slogan: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
  },
  regimeDiv: {
    marginTop: 40,
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
    marginTop: 40,
  },
  personneText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  submitDiv: {
    alignItems: "center",
    marginTop: 60,
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
