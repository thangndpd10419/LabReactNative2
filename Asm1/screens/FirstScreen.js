import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./LoginScreen";
import SignUp from "./RegisterScreen";
import TabScreen from "./TabNaviScreen";
import { StatusBar } from "expo-status-bar";
import DetailScreen from "./detailScreen";
import HomeScreen from "./HomeScreen";
import CartScreen from "../screens/cartScreen";
import Notifi from "../screens/NotifiScreen";
import Pay from "../screens/payScreen";
import SetPerson from "../screens/setPersonScreen";
import { NotiProvider } from "../useContext/NotiContext";
import SetPassScreen from "../screens/SetPassScreen";
import AuthLoadingScreen from "./loadScreen";
import TutorialScreen from "./TutorialScreen";
import Home from "./Home";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function FirstScreen() {
  return (
    <NotiProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {/* <Stack.Screen
            name="Load"
            component={AuthLoadingScreen}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="Ho"
            component={Home}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Tuto"
            component={TutorialScreen}
            options={{ headerShown: true, title: "Tutorial" }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabScreen"
            component={TabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: "#795548" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="Notifi"
            component={Notifi}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Pay"
            component={Pay}
            options={{
              headerShown: true,
              headerStyle: { backgroundColor: "#795548" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="SetPerson"
            component={SetPerson}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="SetPass"
            component={SetPassScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
        <StatusBar />
      </NavigationContainer>
    </NotiProvider>
  );
}
