// HomeScreen.js
import { Button, StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Firebase_auth } from "../FirebaseConfig"; // Import auth instance từ file cấu hình
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await signOut(Firebase_auth);
      Alert.alert("Thông báo", "Đăng xuất thành công");
      navigation.replace("Login"); // Chuyển về màn hình Login và không thể quay lại
    } catch (error) {
      Alert.alert("Lỗi", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trang Chủ</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Đăng xuất"
          onPress={handleSignOut}
          color="#FF3B30" // Màu đỏ cho nút đăng xuất
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "80%",
  },
});
