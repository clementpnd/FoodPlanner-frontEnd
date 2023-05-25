import { View, StyleSheet, Dimensions } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function Header() {
  return (
    <View style={styles.header}>
      <FontAwesome name="arrow-left" size={20} color="#000000" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 70,
    marginLeft: 25,
    width: Dimensions.get("window").width,
  },
});
