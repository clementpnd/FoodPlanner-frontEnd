import { Button, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeAllRecette } from "../reducers/recettes";
export default function SuggestionScreen({ navigation }) {

  const recettes = useSelector((state) => state.recettes.value);

  const dispatch = useDispatch();

  console.log("redux", recettes);
  <View>
    <Text>Suggestion</Text>
    <Button  title ="remove" onPress={() =>dispatch(removeAllRecette())}/>
  </View>;
}
