import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

const AuthLoadingScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //  Nếu đã đăng nhập → vào app
        navigation.replace("TabScreen");
      } else {
        // Nếu chưa đăng nhập → về màn Login
        navigation.replace("Login");
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#3f8f58" />
    </View>
  );
};

export default AuthLoadingScreen;
