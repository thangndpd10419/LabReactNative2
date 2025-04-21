import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { StyleSheet } from "react-native";
import WrapInput from "../components/auth";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../FirebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError1, setHasError1] = useState(false);
  const [hasError2, setHasError2] = useState(false);
  const [check, setCheck] = useState(false);
  const [checkB, setCheckB] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    const loadStoredCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPassword = await AsyncStorage.getItem("password");
        if (storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin đăng nhập:", error);
      }
    };
    loadStoredCredentials();
  }, []);

  const handlerError = (text, setHasError) => {
    if (text.trim() === "") {
      setHasError(true);
    } else {
      setHasError(false);
    }
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setHasError1(!email.trim());
      setHasError2(!password.trim());
      return;
    }

    setIsLoading(true);

    try {
      // Đăng nhập với Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (checkB) {
        try {
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("password", password);
        } catch (error) {
          console.error("Lỗi khi lưu thông tin đăng nhập:", error);
        }
      } else {
        // Nếu không chọn "Remember me", xóa thông tin cũ
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("password");
      }

      Alert.alert("Thành công", "Đăng nhập thành công!");
      navigation.navigate("TabScreen");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      let errorMessage = "Đăng nhập thất bại. Vui lòng thử lại.";

      Alert.alert("Lỗi", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <Image style={style.image} source={require("../assets/login.png")} />
      <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 10 }}>
        Chào mừng bạn
      </Text>

      <Text style={{ fontSize: 25, marginBottom: 20 }}>
        Đăng nhập tài khoản
      </Text>
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
        check={check}
        setCheck={setCheck}
        icon={true}
        placeholder="Mật khẩu"
        value={password}
        hasError={hasError2}
        secureTextEntry={!check}
        autoCapitalize="none"
        onChangText={(text) => {
          setPassword(text);
          handlerError(text, setHasError2);
        }}
      />
      <View style={style.container2}>
        <View style={style.checkboxContainer}>
          <Checkbox
            value={checkB}
            onValueChange={() => setCheckB(!checkB)}
            color={checkB ? "#7a5c42" : undefined}
          />
          <Text style={{ fontSize: 16, marginLeft: 8 }}>
            Ghi nhớ đăng nhập?
          </Text>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate("GetPass")}>
          <Text style={style.forgotPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity> */}
      </View>

      <TouchableOpacity
        style={[style.but, isLoading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
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
      <Text style={style.tk} onPress={() => navigation.navigate("SignUp")}>
        Tạo tài khoản mới?
      </Text>
      <StatusBar />
    </View>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff8f3" }, // nền nhẹ
  image: {
    height: "34%",
    width: "100%",
    resizeMode: "stretch",
  },
  but: {
    marginHorizontal: 30,
    padding: 15,
    width: "86%",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#8B5E3C", // màu nâu đậm
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
  line: {
    height: 1,
    backgroundColor: "#B08B6E", // đường phân cách màu nâu nhạt
    flex: 1,
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#5C4033", // nâu sẫm
  },
  logoContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    marginBottom: 25,
  },
  gg: {
    width: 40,
    height: 50,
    resizeMode: "contain",
    marginRight: 15,
  },
  fb: {
    width: 40,
    height: 50,
    resizeMode: "contain",
    marginLeft: 15,
  },
  tk: {
    fontSize: 18,
    color: "#8B5E3C", // màu nâu
    fontWeight: "bold",
  },
  container2: {
    width: "86%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  forgotPassword: {
    fontSize: 15,
    color: "#8B5E3C",
    fontWeight: "bold",
  },
});
