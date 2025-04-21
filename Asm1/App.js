import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Login from "./screens/LoginScreen";
// import SignUp from "./screens/RegisterScreen";
// import TabScreen from "./screens/TabNaviScreen";
// import { StatusBar } from "expo-status-bar";
import FirstScreen from "./screens/FirstScreen";
import { Provider } from "react-redux";
import store from "./ReduxTk/store";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <FirstScreen />
    </Provider>
  );
}
