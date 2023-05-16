import { createStackNavigator } from "react-navigation-stack";

import MaSemaineScreen from "./MaSemaineScreen";
import ShoppingListScreen from "./ShoppingListScreen";

const AppNavigator = createStackNavigator(
  {
    MaSemaine: MaSemaineScreen,
    ShoppingList: ShoppingListScreen,
  },
  {
    initialRouteName: "MaSemaine",
  }
);

export default AppNavigator;
