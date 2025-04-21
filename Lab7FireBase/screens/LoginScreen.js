// import {
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Button,
//   View,
//   TextInput,
// } from "react-native";
// import { Firebase_auth } from "../FirebaseConfig";
// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";

// export default function LoginScreen({ navigation }) {
//   const [name, setName] = useState("");
//   const [pass, setPass] = useState("");
//   const [loading, setLoading] = useState(false);
//   const auth = Firebase_auth;

//   const signIn = async () => {
//     setLoading(true);
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, name, pass);
//       //   console.log("Logged in:", userCredential.user);
//       console.log("dang nhap thanh cong");
//       navigation.navigate("Home");
//     } catch (error) {
//       console.error("Login error:", error.message);
//       alert("Login failed: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         value={name}
//         onChangeText={(text) => setName(text)}
//         placeholder="Enter your email"
//         style={styles.input}
//       />
//       <TextInput
//         value={pass}
//         onChangeText={(text) => setPass(text)}
//         placeholder="Enter your password"
//         secureTextEntry
//         style={styles.input}
//       />
//       <Button
//         title={loading ? "Loading..." : "Login"}
//         onPress={signIn}
//         disabled={loading}
//       />
//       <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
//         <Text style={{ margin: 20, color: "blue" }}>Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     justifyContent: "center",
//   },
//   input: {
//     height: 50,
//     borderColor: "gray",
//     borderWidth: 1,
//     paddingHorizontal: 20,
//     margin: 15,
//     borderRadius: 10,
//     backgroundColor: "white",
//   },
// });

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Firebase_auth } from "../FirebaseConfig";
import { useAuthRequest } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = Firebase_auth;

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "416166835887-lqui5m5bpnsf4h89shjqonapb6cupfps.apps.googleusercontent.com",
    androidClientId:
      "416166835887-lqui5m5bpnsf4h89shjqonapb6cupfps.apps.googleusercontent.com",
    webClientId:
      "416166835887-lqui5m5bpnsf4h89shjqonapb6cupfps.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          console.log("Đăng nhập bằng Google thành công");
          navigation.navigate("Home");
        })
        .catch((err) => {
          console.log("Google login error:", err);
          alert("Login failed: " + err.message);
        });
    }
  }, [response]);

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      console.log("Đăng nhập thành công");
      navigation.navigate("Home");
    } catch (error) {
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        style={styles.input}
      />
      <TextInput
        value={pass}
        onChangeText={setPass}
        placeholder="Enter your password"
        secureTextEntry
        style={styles.input}
      />
      <Button
        title={loading ? "Loading..." : "Login with Email"}
        onPress={signIn}
        disabled={loading}
      />

      <View style={{ height: 20 }} />

      <Button
        title="Login with Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={{ margin: 20, color: "blue" }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
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
