// Flat_tree.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { useGetPotQuery } from "../ReduxTk/apiSlice";

export default function Flat_tree({ scrollY }) {
  const {
    data: products = [],
    isLoading: loadingProducts,
    error,
  } = useGetPotQuery();

  if (loadingProducts) {
    return <Text>Đang tải...</Text>;
  }

  return (
    <Animated.FlatList
      data={products}
      keyExtractor={(item) => item._id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={{
        padding: 10,
        paddingTop: 30, // Thêm paddingTop bằng chiều cao header + khoảng cách title
      }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}.000đ</Text>
        </View>
      )}
      ListHeaderComponent={
        <Text style={[styles.title, { marginTop: 10 }]}>Chậu cây</Text>
      }
      ListFooterComponent={<Text style={styles.titleFooter}>Xem thêm</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    marginLeft: 30,
  },
  card: {
    flex: 1,
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 160,
    height: 140,
    borderRadius: 6,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
  price: {
    fontSize: 15,
    color: "green",
    marginTop: 4,
  },
  titleFooter: {
    fontSize: 20,
    textDecorationLine: "underline",
    paddingLeft: 300,
  },
});
