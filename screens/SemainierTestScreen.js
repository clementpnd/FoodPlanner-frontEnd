import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    ImageBackground,
  } from "react-native";
  //import fontawesome pour les icones
  import FontAwesome from "react-native-vector-icons/FontAwesome";
  //import des hooks
  import { useState, useEffect, useRef } from "react";
  import { useDispatch, useSelector } from "react-redux";

  

  
  export default function SemainierTestScreen({ navigation }) {
    const semaines = useSelector((state) => state.semaines.value);
    const semainesAffichées = semaines.allCheckBoxSelected.map((data, i) => {
        return (
          <View key={i}>
            <View >
              <Text>Semaines</Text>
              <Text>{data.jour}</Text>
              <Text>{data.value}</Text>
              <Text>{data.nbPersonne}</Text>
            </View>
          </View>
        );
      });
  console.log("semaines:", semaines.allCheckBoxSelected)
    return (
      <View>
      {semainesAffichées}
      </View>
    );
  }
  