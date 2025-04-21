import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TutorialScreen() {
  const [showBasic, setShowBasic] = useState(false);
  const [showStages, setShowStages] = useState(false);

  const Option = ({ title, show, onPress, children }) => (
    <View style={styles.optionWrapper}>
      <TouchableOpacity style={styles.optionHeader} onPress={onPress}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Ionicons
          name={show ? "chevron-up-outline" : "chevron-down-outline"}
          size={22}
          color="#7a5c42"
        />
      </TouchableOpacity>
      {show && <View style={styles.optionContent}>{children}</View>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: "https://plntd.ae/cdn/shop/files/Money-Tree-150cm-Circle-Chalk-White-Plntd-Lifestyle-40.jpg?crop=center&height=1200&v=1708063656&width=1200",
        }}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Hướng dẫn chăm sóc cây</Text>

        <Option
          title="Kiến thức cơ bản"
          show={showBasic}
          onPress={() => setShowBasic(!showBasic)}
        >
          <Text style={styles.step}>
            • Bước 1: Chuẩn bị vật dụng, cây trồng
          </Text>
          <Text style={styles.step}>• Bước 2: Tiến hành gieo hạt</Text>
          <Text style={styles.step}>• Bước 3: Chăm sóc sau khi gieo hạt</Text>
        </Option>

        <Option
          title=" Các giai đoạn phát triển"
          show={showStages}
          onPress={() => setShowStages(!showStages)}
        >
          <Text style={styles.step}>• Gieo hạt</Text>
          <Text style={styles.step}>• Ra lá</Text>
          <Text style={styles.step}>• Ra hoa</Text>
          <Text style={styles.step}>• Kết trái</Text>
        </Option>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  img: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#7a5c42",
  },
  optionWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  optionTitle: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
  optionContent: {
    padding: 15,
    backgroundColor: "#F1F8E9",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  step: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
});
