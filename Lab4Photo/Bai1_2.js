import React, { useState } from "react";
import { View, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [photo, setPhoto] = useState(null);
  const [lib, setLib] = useState(null);

  // Hàm mở camera để chụp ảnh
  const takePhoto = async () => {
    // Yêu cầu quyền truy cập camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Bạn cần cấp quyền sử dụng camera.");
      return;
    }

    // Mở camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, // Cho phép chỉnh sửa ảnh sau khi chụp
      aspect: [4, 3], // Tỉ lệ khung hình
      quality: 1, // Chất lượng ảnh (0 - 1)
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri); // Lưu ảnh vào state
    }
  };

  const library = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Cần cấp quyền");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Chỉ chọn ảnh, không chọn video
      allowsEditing: true, // Cho phép chỉnh sửa ảnh trước khi chọn
      aspect: [4, 3], // Tỉ lệ khung hình
      quality: 1, // Chất lượng ảnh (0 - 1)
    });
    if (!result.canceled) {
      setLib(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Chụp ảnh" onPress={takePhoto} />
      {photo && <Image source={{ uri: photo }} style={styles.image} />} */}
      <Button title="Mở thư viện" onPress={library} />
      {lib && <Image source={{ uri: lib }} style={styles.image} />}
    </View>
  );
}

// Style đơn giản
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 300,
    // resizeMode: "cover",
    // borderRadius: 150,
    borderRadius: 10,
  },
});
