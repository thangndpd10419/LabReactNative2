import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeInfor, selectInfor } from "../ReduxTk/infoSlice";

export default function SetPersonScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const info = useSelector(selectInfor); // Lấy thông tin hiện tại từ Redux
  const [name, setName] = useState(info.name);
  const [address, setAddress] = useState(info.address);
  const [phone, setPhone] = useState(info.phone);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chỉnh sửa thông tin",
      headerStyle: {
        backgroundColor: "#7a5c42",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerBackTitleVisible: false,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 15 }}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSave = () => {
    if (!name || !address || !phone) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    dispatch(changeInfor({ name, address, phone }));
    Alert.alert("Thành công", "Thông tin đã được cập nhật.");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Họ và tên</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên của bạn"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập địa chỉ"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) => {
          const numericText = text.replace(/[^0-9]/g, "");
          setPhone(numericText);
        }}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Lưu thông tin</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  saveBtn: {
    marginTop: 30,
    backgroundColor: "#7a5c42",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
