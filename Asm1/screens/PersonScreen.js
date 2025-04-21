import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React from "react";
import { app } from "../FirebaseConfig";
import { signOut, getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function PersonScreen() {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
            navigation.replace("Login");
          } catch (error) {
            Alert.alert("Lỗi", "Không thể đăng xuất!");
          }
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fdf6f0" }}>
      <View style={styles.profileContainer}>
        <Image style={styles.img} source={require("../assets/person.jpg")} />
        <Text style={styles.username}>{user?.email || "Không có email"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chung</Text>

        <OptionItem
          title="Chỉnh sửa thông tin"
          icon="person-outline"
          onPress={() => navigation.navigate("SetPerson")}
        />
        <OptionItem
          title="Cẩm nang trồng cây"
          icon="book-outline"
          onPress={() => navigation.navigate("Tuto")}
        />
        <OptionItem title="Q&A" icon="help-circle-outline" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bảo mật & điều khoản</Text>

        <OptionItem title="Điều khoản" icon="document-text-outline" />
        <OptionItem
          title="Chính sách quyền riêng tư"
          icon="shield-checkmark-outline"
          onPress={() => navigation.navigate("SetPass")}
        />
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const OptionItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.option} onPress={onPress}>
    <Ionicons
      name={icon}
      size={22}
      color="#4e342e"
      style={{ marginRight: 15 }}
    />
    <Text style={styles.optionText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#fff8f2",
    marginBottom: 10,
  },
  img: {
    height: 90,
    width: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4e342e",
  },
  section: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
    borderRadius: 12,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    color: "#8d6e63",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#4e342e",
  },
  logoutBtn: {
    marginHorizontal: 20,
    marginTop: "auto",
    marginBottom: 30,
    backgroundColor: "#6d4c41", // nâu trung tính
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
});
