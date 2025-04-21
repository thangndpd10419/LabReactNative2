import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSearchProductsQuery } from "../ReduxTk/apiSlice";
import { useNavigation } from "@react-navigation/native";

const FindScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useSearchProductsQuery(searchTerm, {
    skip: searchTerm.length < 2,
  });

  const shouldShowResults = searchTerm.length >= 2 && !isLoading;
  const noResults = shouldShowResults && products?.length === 0;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder=" Tìm kiếm sản phẩm..."
        placeholderTextColor="#8d6e63"
        value={searchTerm}
        onChangeText={setSearchTerm}
        clearButtonMode="while-editing"
      />

      {isError && (
        <Text style={styles.errorText}>
          Lỗi: {error?.data?.message || "Không thể tải dữ liệu"}
        </Text>
      )}

      {shouldShowResults ? (
        <FlatList
          data={products || []}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Detail", { item })}
              style={styles.card}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDesc} numberOfLines={2}>
                  {item.description}
                </Text>
                <Text style={styles.productPrice}>
                  {item.price.toLocaleString()} .000đ
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            noResults && (
              <Text style={styles.emptyText}>Không tìm thấy sản phẩm</Text>
            )
          }
        />
      ) : null}

      {searchTerm.length === 0 && (
        <View style={styles.initialStateContainer}>
          <Text style={styles.initialStateText}>
            Nhập từ khóa để tìm kiếm sản phẩm
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf6f0", // tone nền nâu sáng
    padding: 16,
  },
  searchInput: {
    height: 45,
    borderColor: "#8d6e63",
    borderWidth: 1.2,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#4e342e",
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productInfo: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3e2723",
    marginBottom: 4,
  },
  productDesc: {
    fontSize: 14,
    color: "#6d4c41",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#795548",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#8d6e63",
    fontSize: 16,
  },
  initialStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  initialStateText: {
    fontSize: 16,
    color: "#8d6e63",
  },
});

export default FindScreen;
