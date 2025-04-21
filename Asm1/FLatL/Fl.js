// Flat_tree.js
import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useGetProductsQuery } from "../ReduxTk/apiSlice";
import { useNavigation } from "@react-navigation/native";

export default function Fl() {
  const {
    data: products = [],
    isLoading: loadingProducts,
    error,
  } = useGetProductsQuery();

  const { width } = Dimensions.get("window");
  const ITEM_WIDTH = width * 0.7;
  const ITEM_HEIGHT = 330;

  const navigation = useNavigation();

  const SPACING = 20;
  const SIDE_PADDING = (width - ITEM_WIDTH) / 2;

  const scrollX = useRef(new Animated.Value(0)).current;

  if (loadingProducts) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Lỗi khi tải dữ liệu</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={products}
        keyExtractor={(item) => item._id}
        horizontal={true}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate={0.9}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIDE_PADDING,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1.1, 0.9],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: "clamp",
          });

          // const translateY = scrollY.interpolate({
          //   inputRange: [0, ITEM_HEIGHT],
          //   outputRange: [0, -ITEM_HEIGHT],
          //   extrapolate: "clamp",
          // });

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Detail", { item })}
            >
              <Animated.View
                style={[
                  styles.itemContainer,
                  {
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT,
                    marginRight: SPACING,
                    transform: [{ scale }],
                    opacity,
                  },
                ]}
              >
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.image }}
                    resizeMode="contain"
                  />
                </View>
                <View style={[styles.textContainer, { flexDirection: "row" }]}>
                  <View style={{}}>
                    <Text style={styles.name} numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text style={styles.description} numberOfLines={2}>
                      {item.description}
                    </Text>
                  </View>
                  <Text style={styles.price}>
                    {item.price.toLocaleString()} .000đ
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 5,
    backgroundColor: "#fdf6f0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    backgroundColor: "#fffaf5",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#4e342e",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    paddingTop: 20,
    borderWidth: 1,
    marginVertical: 20,
    borderColor: "#3e2723",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    backgroundColor: "#d8c3a9",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    padding: 20,
    justifyContent: "space-around",
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3e2723", //đậmm
  },
  description: {
    fontSize: 14,
    color: "#5d4037", //nâu vừavừa
    marginVertical: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6d4c41", // nâu đỏ
    marginTop: 6,
  },
});
