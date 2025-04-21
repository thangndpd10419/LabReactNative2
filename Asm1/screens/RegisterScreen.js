import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { StyleSheet } from "react-native";
import WrapInput from "../components/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../FirebaseConfig"; // Import app từ file cấu hình Firebase

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [hasError1, setHasError1] = useState(false);
  const [hasError2, setHasError2] = useState(false);
  const [hasError3, setHasError3] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth(app);

  const handlerError = (text, setHasError) => {
    setHasError(text.trim() === "");
  };

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !rePassword.trim()) {
      setHasError1(!email.trim());
      setHasError2(!password.trim());
      setHasError3(!rePassword.trim());
      return;
    }

    if (password !== rePassword) {
      Alert.alert("Lỗi", "Mật khẩu nhập lại không khớp!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    try {
      // Tạo tài khoản mới với Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Lưu thông tin đăng nhập nếu cần
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);

      Alert.alert("Thành công", "Đăng ký thành công!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      let errorMessage = "Đăng ký thất bại. Vui lòng thử lại.";

      Alert.alert("Lỗi", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Image style={style.image} source={require("../assets/signup.png")} />
      <Text style={style.title}>Đăng ký</Text>

      <WrapInput
        icon={false}
        check={true}
        placeholder="Email"
        hasError={hasError1}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        onChangText={(text) => {
          setEmail(text);
          handlerError(text, setHasError1);
        }}
      />

      <WrapInput
        check={showPass}
        setCheck={setShowPass}
        icon={true}
        placeholder="Mật khẩu"
        value={password}
        hasError={hasError2}
        secureTextEntry={!showPass}
        autoCapitalize="none"
        onChangText={(text) => {
          setPassword(text);
          handlerError(text, setHasError2);
        }}
      />

      <WrapInput
        check={showRePass}
        setCheck={setShowRePass}
        icon={true}
        placeholder="Nhập lại mật khẩu"
        value={rePassword}
        hasError={hasError3}
        secureTextEntry={!showRePass}
        autoCapitalize="none"
        onChangText={(text) => {
          setRePassword(text);
          handlerError(text, setHasError3);
        }}
      />

      <TouchableOpacity
        style={[style.but, isLoading && { opacity: 0.7 }]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        <Text style={style.butText}>
          {isLoading ? "Đang đăng ký..." : "Đăng ký"}
        </Text>
      </TouchableOpacity>

      <View style={style.lineContainer}>
        <View style={style.line}></View>
        <Text style={style.text}>hoặc</Text>
        <View style={style.line}></View>
      </View>

      {/* <View style={style.logoContainer}>
        <TouchableOpacity>
          <Image style={style.gg} source={require("../assets/logogg.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={style.fb} source={require("../assets/logofb2.png")} />
        </TouchableOpacity>
      </View> */}

      <Text style={style.tk} onPress={() => navigation.navigate("Login")}>
        Đã có tài khoản?
      </Text>

      <StatusBar />
    </View>
  );
};

export default RegisterScreen;

const style = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  image: { height: "34%", width: "100%", resizeMode: "stretch" },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#795548",
  },
  but: {
    marginHorizontal: 30,
    padding: 15,
    width: "86%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#795548",
  },
  butText: { color: "white", fontSize: 25, fontWeight: "bold" },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
  line: { height: 1, backgroundColor: "black", flex: 1 },
  text: { paddingHorizontal: 10, fontSize: 16 },
  logoContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    marginBottom: 25,
  },
  gg: { width: 40, height: 50, resizeMode: "contain", marginRight: 15 },
  fb: { width: 40, height: 50, resizeMode: "contain", marginLeft: 15 },
  tk: { fontSize: 18, color: "#795548", fontWeight: "bold" },
});
