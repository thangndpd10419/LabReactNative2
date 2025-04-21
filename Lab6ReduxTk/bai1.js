import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { tang, giam, binhPhuong, set } from "./redux/slice/counterSlice";

export default function Bai1() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  return (
    <View>
      <Text>{count}</Text>
      <Button title="Tăng" onPress={() => dispatch(tang())} />
      <Button title="Giảm" onPress={() => dispatch(giam())} />
      <Button title="Binh phuong" onPress={() => dispatch(binhPhuong())} />
      <Button title="Set" onPress={() => dispatch(set())} />
    </View>
  );
}

const styles = StyleSheet.create({});
