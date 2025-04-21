import React, { useContext, useCallback } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import NotiContext from "../useContext/NotiContext";

export default function NotifiScreen() {
  const orders = useSelector((state) => state.Notifi);
  const { resetNoti } = useContext(NotiContext);

  const renderOrder = ({ item }) => {
    const date = new Date(item.createdAt).toLocaleString("vi-VN");

    return (
      <View style={styles.orderContainer}>
        <Text style={styles.orderTime}> {date}</Text>
        {item.items.map((product, index) => (
          <View key={product._id + index} style={styles.itemContainer}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.description}>{product.description}</Text>
              <Text style={styles.price}>
                {product.quantityy} x {product.price}.000 đ
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  //
  useFocusEffect(
    useCallback(() => {
      resetNoti();
      return () => {};
    }, [resetNoti])
  );

  return (
    <View style={styles.container}>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.emptyText}>Không có sản phẩm nào được đặt.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#f3ece7", // nền màu be nhẹ giống Flat_tree
  },
  listContent: {
    paddingBottom: 20,
  },
  orderContainer: {
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#a1887f", // nâu sáng
  },
  orderTime: {
    fontSize: 14,
    color: "#5d4037", // nâu vừa
    marginBottom: 10,
    fontStyle: "italic",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fffaf5", // nền be sáng
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#bcaaa4", // nâu nhạt viền
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#d7ccc8", // giống imageContainer ở Flat_tree
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#3e2723", // nâu đậm
  },
  description: {
    color: "#6d4c41", // nâu vừa
    fontSize: 14,
  },
  price: {
    color: "#4e342e", // nâu tối
    fontWeight: "bold",
    marginTop: 5,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#8d6e63", // nâu trung bình
  },
});
