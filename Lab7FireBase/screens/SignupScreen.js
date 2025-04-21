import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Firebase_auth } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth"; // ✅ import hàm tạo tài khoản

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState(""); // ✅ sửa seName -> setName
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = Firebase_auth;

  const signUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        name,
        pass
      );
      console.log("Đăng ký thành công:", userCredential.user);
      alert("Đăng ký thành công!");
      navigation.navigate("Login"); //  chuyển về Login sau khi đăng ký
    } catch (error) {
      console.error("Signup error:", error.message);
      alert("Đăng ký thất bại: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput
        value={name}
        onChangeText={(text) => setName(text)} //  sửa đúng tên setName
        placeholder="Enter your email"
        style={styles.input}
      />
      <TextInput
        value={pass}
        onChangeText={(text) => setPass(text)}
        placeholder="Enter your password"
        secureTextEntry
        style={styles.input}
      />
      <Button
        title={loading ? "Loading..." : "Sign Up"} //  sửa lại title
        onPress={signUp} // thêm onPress
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 20,
    margin: 15,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
