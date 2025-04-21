// HomeScreen.js
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import Flat_tree from "../FLatL/Flat_tree";
import Fl from "../FLatL/Fl";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Plant App!!!</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <View style={styles.cartIcon}>
            <Ionicons name="cart-outline" size={24} color="#5d4037" />
          </View>
        </TouchableOpacity>
      </View>

      <Fl />

      <Flat_tree navigation={navigation} scrollY={scrollY} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6f0",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#5d4037",
    paddingHorizontal: 20,
    height: 70,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 6,
  },
  headerText: {
    fontSize: 22,
    flex: 1,
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#fff",
  },
  cartIcon: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginLeft: 15,
  },
});
