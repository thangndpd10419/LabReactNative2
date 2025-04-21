import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import FindScreen from "./FindScreen";
import NotifiScreen from "./NotifiScreen";
import PersonScreen from "./PersonScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { View, TouchableOpacity } from "react-native";
import NotiContext from "../useContext/NotiContext";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation }) {
  const { notiCount } = useContext(NotiContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabel: () => null,
        tabBarActiveTintColor: "#4e342e",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#f8f8f8",
          marginBottom: 15,
          marginHorizontal: 15,
          borderRadius: 12,
          height: 60,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#7a5c42",
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 22,
          color: "#fff",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Find"
        component={FindScreen}
        options={{
          title: "Tìm kiếm",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart")}
              style={{
                marginRight: 16,
                backgroundColor: "#fff",
                padding: 6,
                borderRadius: 20,
              }}
            >
              <AntDesign name="shoppingcart" size={22} color="##7a5c42" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Notifi"
        component={NotifiScreen}
        options={{
          title: "Thông báo",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="bell" size={size} color={color} />
          ),
          tabBarBadge: notiCount > 0 ? notiCount : null,
        }}
      />

      <Tab.Screen
        name="Person"
        component={PersonScreen}
        options={{
          headerShown: false,
          title: "Cá nhân",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
