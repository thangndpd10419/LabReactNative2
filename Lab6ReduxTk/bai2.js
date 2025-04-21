import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from "./redux/slice/apiProducts";

export default function AddProductScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const { data: products = [], isLoading: loadingProducts } =
    useGetProductsQuery();
  const [addProduct, { isLoading: adding, isSuccess, error }] =
    useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAdd = async () => {
    if (!name || !price) return;
    try {
      await addProduct({
        name,
        price: Number(price),
        quantity: 0,
        image,
      }).unwrap();
      setName("");
      setPrice("");
      setImage("");
    } catch (err) {
      console.error("Lỗi thêm sản phẩm:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
    } catch (err) {
      console.error("Lỗi xóa sản phẩm:", err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Form thêm sản phẩm */}
      <TextInput
        placeholder="Tên sản phẩm"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Giá"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Ảnh (URL hoặc để trống)"
        value={image}
        onChangeText={setImage}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button
        title={adding ? "Đang thêm..." : "Thêm sản phẩm"}
        onPress={handleAdd}
      />

      {isSuccess && (
        <Text style={{ marginTop: 10, color: "green" }}>Thêm thành công!</Text>
      )}
      {error && (
        <Text style={{ marginTop: 10, color: "red" }}> Thêm thất bại</Text>
      )}

      {/* Danh sách sản phẩm */}
      <Text style={{ fontSize: 18, marginTop: 20 }}>Danh sách sản phẩm:</Text>
      {loadingProducts ? (
        <Text>Đang tải...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderColor: "#ccc",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text>
                {item.name} - {item.price}đ
              </Text>
              <TouchableOpacity onPress={() => handleDelete(item._id)}>
                <Text style={{ color: "red" }}>Xóa</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
