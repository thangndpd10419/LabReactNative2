import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Bai1 from "./bai1";
import Bai2 from "./bai2";
import store from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Bai2 />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
