import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Bai1 from "./bai1";

export default function App() {
  return (
    <View style={styles.container}>
      <Bai1 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
