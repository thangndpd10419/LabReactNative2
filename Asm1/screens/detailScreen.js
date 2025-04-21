import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../ReduxTk/cartSlice";
import { useUpdateProductMutation } from "../ReduxTk/apiSlice";

export default function DetailScreen({ route }) {
  const { item } = route.params;

  const statee = useSelector((state) => state.cart);
  const [quantityy, setQuantity] = useState(1);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // const [updateProduct, { isLoading, error }] = useUpdateProductMutation();

  // useEffect(() => {
  //   setQuantity(item.quantity);
  // }, [item]);

  const decreaseQuantity = () => {
    if (quantityy > 1) {
      setQuantity(quantityy - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantityy >= item.quantity) {
      Alert.alert("Thông báo", "Bạn đã chọn tối đa số lượng sản phẩm có sẵn");
      return;
    }

    setQuantity(quantityy + 1);
  };

  const handlerAdd = () => {
    const cartItem = {
      ...item,
      quantityy,
      selected: true,
    };
    const a = statee.find((i) => i._id === cartItem._id);
    if (a) {
      if (a.quantityy + cartItem.quantityy > a.quantity) {
        Alert.alert(" Đã quá số lượng trong kho");
        return;
      }
    }
    if (item.quantity === 0) {
      Alert.alert("Thông báo", "Hết hàng");
      navigation.goBack();
      return;
    }

    dispatch(addToCart(cartItem));

    navigation.navigate("Cart");

    Alert.alert("Thành công", "Sản phẩm đã được thêm vào giỏ hàng");
  };

  const totalPrice = item.price * quantityy;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.container2}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Text style={styles.price}>{item.price}.000đ</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Kích cỡ</Text>
          <Text style={styles.detailValue}>Nhỏ</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Xuất xứ</Text>
          <Text style={styles.detailValue}>Việt Nam</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Tình trạng</Text>
          <Text style={styles.detailValue}>Còn {item.quantity} sp</Text>
        </View>
      </View>

      <View style={styles.quantityContainer}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            onPress={decreaseQuantity}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantityy}</Text>
          <TouchableOpacity
            onPress={increaseQuantity}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceLabel}>Thành tiền:</Text>
          <Text style={styles.totalPriceValue}>{totalPrice}.000đ</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={handlerAdd}>
        <Text style={styles.addToCartButtonText}>THÊM VÀO GIỎ HÀNG</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffaf5", // tone nền ấm
    flex: 1,
    paddingBottom: 30,
  },
  container2: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 60,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d7ccc8",
  },
  detailLabel: {
    fontSize: 16,
    color: "#5d4037",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3e2723", // nâu đậm
  },
  image: {
    backgroundColor: "#efebe9", // nền ảnh xám nâu nhẹ
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: "contain",
  },
  name: {
    fontSize: 21,
    marginBottom: 10,
    backgroundColor: "#5d4037", // nâu trung
    color: "white",
    height: 45,
    width: 150,
    borderRadius: 5,
    textAlign: "center",
    lineHeight: 45,
    marginLeft: 40,
  },
  description: {
    fontSize: 21,
    marginBottom: 10,
    backgroundColor: "#5d4037", // nâu sữa
    color: "white",
    height: 45,
    width: 150,
    borderRadius: 5,
    textAlign: "center",
    lineHeight: 45,
    marginLeft: 30,
  },
  price: {
    fontSize: 30,
    color: "#6d4c41", // nâu đỏ
    marginTop: 15,
    marginLeft: 60,
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d7ccc8",
    borderRadius: 5,
    marginLeft: 30,
  },
  quantityButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#efebe9", // nền nâu rất nhẹ
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3e2723",
  },
  quantityText: {
    fontSize: 18,
    paddingHorizontal: 15,
    color: "#3e2723",
  },
  totalPriceContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 30,
  },
  totalPriceLabel: {
    fontSize: 16,
    color: "#5d4037",
  },
  totalPriceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6d4c41", // nâu đỏ
    marginTop: 5,
  },
  addToCartButton: {
    marginHorizontal: 50,
    backgroundColor: "#6d4c41", // nâu đỏ
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
});
