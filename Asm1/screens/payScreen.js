import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addNotifi } from "../ReduxTk/notifiSlice";
import { changeInfor } from "../ReduxTk/infoSlice";
import NotiContext from "../useContext/NotiContext";
import { useUpdateProductMutation } from "../ReduxTk/apiSlice";
import { updateStock } from "../ReduxTk/cartSlice";

const formatCurrency = (number) => {
  return Number(number).toLocaleString("vi-VN") + " .000 đ";
};

export default function PayScreen({ route }) {
  const dispatch = useDispatch();
  const { total, listItem, cartItems } = route.params;
  const item = useSelector((state) => state.Infor);
  const shippingFee = 15;
  const totalAmount = Number(total) + shippingFee;
  const navigation = useNavigation();
  const info = useSelector((state) => state.Infor);

  const [updateProduct, { isLoading, isSuccess, error }] =
    useUpdateProductMutation();

  const { addNoti } = useContext(NotiContext);

  const [name, setName] = useState(info.name);
  const [ad, setAd] = useState(info.address);
  const [p, setP] = useState(info.phone);
  const ob = { name, address: ad, phone: p };

  const isInfoComplete = name && ad && p;

  const updateP = async (cartItems) => {
    try {
      await Promise.all(
        //thực thithi các hàm bất đồng bộ độc lập và không phụ thuộc nhau, để chạy song song và tăng hiệu suất.
        cartItems.map(async (cartItem) => {
          if (cartItem.quantity - cartItem.quantityy < 0) {
            return;
          } else {
            const dt = {
              name: cartItem.name,
              quantity: cartItem.quantity - cartItem.quantityy,
              price: cartItem.price,
              image: cartItem.image,
              description: cartItem.description,
            };

            await updateProduct({
              id: cartItem._id,
              ...dt,
            }).unwrap();

            dispatch(
              updateStock({
                itemId: cartItem._id,
                soldQuantity: cartItem.quantityy,
              })
            );
          }
        })
      );
      return true;
    } catch (error) {
      console.log("Error:", error);
      return false;
    }
  };

  const handlePayment = async () => {
    if (!isInfoComplete) {
      Alert.alert("Thiếu thông tin", "Bạn cần nhập đầy đủ thông tin cá nhân.");
      return;
    }
    const invalidItem = cartItems.find(
      (item) => item.quantityy > item.quantity
    );

    if (invalidItem) {
      Alert.alert(
        "Lỗi",
        `Sản phẩm "${invalidItem.name}" không đủ số lượng trong kho. Vui lòng điều chỉnh lại giỏ hàng.`
      );
      return;
    }

    try {
      listItem.forEach((item) => {
        dispatch(addNotifi(item));
      });
      addNoti();
      dispatch(changeInfor(ob));

      const updateSuccess = await updateP(cartItems);

      if (updateSuccess) {
        navigation.goBack();
        Alert.alert("Thanh toán thành công", "Cảm ơn bạn đã đặt hàng!");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi thanh toán");
    }
  };

  return (
    <View style={styles.container}>
      {/* Thông tin khách hàng */}
      <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
      <View style={styles.infoBox}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={`Tên: ${item.name}`}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            value={ad}
            onChangeText={setAd}
            style={styles.input}
            placeholder={`Địa chỉ: ${item.address}`}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            value={p}
            onChangeText={setP}
            style={styles.input}
            placeholder={`Số điện thoại: ${item.phone}`}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Phương thức vận chuyển</Text>
      <View style={styles.infoBox}>
        <View style={styles.row}>
          <Text style={styles.label}>Giao hàng nhanh</Text>
          <Text style={[styles.value, { color: "#3f8f58" }]}>
            {formatCurrency(shippingFee)}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Chi tiết thanh toán</Text>
      <View style={styles.infoBox}>
        <View style={styles.row}>
          <Text style={styles.label}>Tạm tính</Text>
          <Text style={styles.value}>{formatCurrency(total)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phí vận chuyển</Text>
          <Text style={[styles.value, { color: "#3f8f58" }]}>
            {formatCurrency(shippingFee)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            style={[styles.label, { color: "#3f8f58", fontWeight: "bold" }]}
          >
            Tổng cộng
          </Text>
          <Text
            style={[styles.value, { color: "#3f8f58", fontWeight: "bold" }]}
          >
            {formatCurrency(totalAmount)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.payButton,
          { backgroundColor: isInfoComplete ? "#5d4037" : "#ccc" },
        ]}
        onPress={handlePayment}
        disabled={!isInfoComplete} // vô hiệu hóa nut bấm
      >
        <Text style={styles.payButtonText}>Thanh toán</Text>
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
  input: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5d4037",
    marginBottom: 10,
    marginTop: 20,
  },
  infoBox: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    color: "#5d4037",
  },
  value: {
    fontSize: 16,
    color: "#888",
  },
  payButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 20,
    left: 20,
  },
  payButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
