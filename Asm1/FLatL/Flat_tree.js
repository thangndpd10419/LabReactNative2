import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useGetProductsQuery } from "../ReduxTk/apiSlice";

export default function Flat_tree({ scrollY, navigation }) {
  const {
    data: products = [],
    isLoading: loadingProducts,
    error,
  } = useGetProductsQuery();

  if (loadingProducts) {
    return <Text style={styles.loading}>Đang tải...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cây trồng</Text>

      <Animated.FlatList
        data={products}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail", { item })}
            activeOpacity={0.8}
          >
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
                <Text style={styles.price}>{item.price}.000đ</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        // ListFooterComponent={
        //   <TouchableOpacity onPress={() => navigation.navigate("Detail")}>
        //     <Text style={styles.titleFooter}>Xem thêm</Text>
        //   </TouchableOpacity>
        // }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf6f0",
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white", // nâu đậm
    backgroundColor: "#7a5c42",
    borderRadius: 5,
    paddingLeft: 30,
    paddingVertical: 5,
  },
  loading: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#5c3a21",
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#d8c3a5", // nâu sáng
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5c3a21",
  },
  description: {
    color: "#7a5c42",
    fontSize: 14,
    marginVertical: 4,
  },
  price: {
    color: "#5c3a21",
    fontWeight: "bold",
    fontSize: 16,
  },
  titleFooter: {
    fontSize: 18,
    color: "#5c3a21",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 10,
  },
});
