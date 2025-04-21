import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { CheckBox } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  toggleItemSelection,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../ReduxTk/cartSlice";

export default function CartScreen() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const navigation = useNavigation();
  //
  // useEffect(() => {
  //   console.log("Cart Items:", cartItems);
  //   console.log(
  //     "Selected Items:",
  //     cartItems.filter((item) => item.selected)
  //   );
  // }, [cartItems]);
  // //

  const pushCart = () => {
    return cartItems.filter((i) => i.selected == true);
  };

  const handleToggleSelect = (itemId) => {
    dispatch(toggleItemSelection(itemId));
  };

  const handleIncrease = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item.quantityy < item.quantity) {
      dispatch(increaseQuantity(itemId));
    } else {
      Alert.alert("Đã vượt quá số lượng sản phẩm");
    }
  };

  const handleDecrease = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item.quantityy > 1) {
      dispatch(decreaseQuantity(itemId));
    } else {
      Alert.alert("Số lượng không thể giảm nữa");
    }
  };

  const handleRemove = (itemId) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa sản phẩm này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xóa",

        onPress: () => dispatch(removeItem(itemId)),
      },
    ]);
  };

  const calculateTotal = () => {
    return cartItems
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantityy, 0);
  };

  const listItem = () => {
    return cartItems.filter((item) => item.selected);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <CheckBox
          checked={item.selected}
          onPress={() => handleToggleSelect(item._id)}
          checkedColor="#5d4037"
          uncheckedColor="#aaa"
          size={24}
          containerStyle={styles.checkbox}
        />

        <Image style={styles.image} source={{ uri: item.image }} />

        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}.000 đ</Text>
          </View>

          <Text style={styles.type}>
            {item.description || "Không có mô tả"}
          </Text>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleDecrease(item._id)}
            >
              <Text style={styles.actionText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{item.quantityy}</Text>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => handleIncrease(item._id)}
            >
              <Text style={styles.actionText}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleRemove(item._id)}
            >
              <Text style={styles.deleteText}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.screenContainer}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContent}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>
              Tổng cộng: {calculateTotal()}.000 đ
            </Text>
            <TouchableOpacity
              style={styles.pay}
              onPress={() =>
                navigation.navigate("Pay", {
                  total: calculateTotal(),
                  listItem: listItem(),
                  cartItems: pushCart(),
                })
              }
            >
              <Text style={styles.texxt}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Giỏ hàng trống</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fefcf9", // nền nhẹ nâu kem
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#a1887f",
  },
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#d7ccc8",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: "#fffaf5",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  checkbox: {
    padding: 0,
    margin: 0,
    marginRight: 8,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#efebe9",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    color: "#5d4037",
  },
  type: {
    fontSize: 14,
    color: "#8d6e63",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: "#6d4c41",
    fontWeight: "bold",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#efebe9",
    borderRadius: 5,
  },
  actionText: {
    fontSize: 18,
    color: "#4e342e",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
    color: "#4e342e",
  },
  deleteBtn: {
    marginLeft: "auto",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#d84315",
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  totalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fffaf5",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#d7ccc8",
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6d4c41",
    marginBottom: 10,
  },
  pay: {
    borderWidth: 1,
    width: "100%",
    padding: 10,
    alignItems: "center",
    borderRadius: 7,
    backgroundColor: "#6d4c41",
    borderColor: "#4e342e",
  },
  texxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
});
