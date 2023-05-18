import { Button, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeAllRecette } from "../reducers/recettes";
export default function SuggestionScreen({ navigation }) {

  const recettes = useSelector((state) => state.recettes.value);

  const user = useSelector((state) => state.users.value);

  console.log(user);

  const dispatch = useDispatch();

  console.log("redux", recettes);
  return(

  <View style={styles.container}>
    <Text>Suggestion</Text>
    <Button  title ="remove" onPress={() =>dispatch(removeAllRecette())}/>
  </View>
  )
}

const styles = StyleSheet.create({
  container : {
    width : "100%",
    flex: 1,
    justifyContent : "center",
    alignItems: "center", 
  }
})
