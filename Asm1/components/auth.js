import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
const WrapInput = ({
  value,
  placeholder,
  onChangText,
  hasError,
  icon,
  check,
  setCheck,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ width: "100%" }}>
      <TextInput
        check={check}
        setCheck={setCheck}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangText}
        hasError={hasError}
        style={[
          style.input,
          isFocused && style.isFocused,
          hasError && style.isError,
        ]}
        secureTextEntry={!check}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      />

      {icon && (
        <TouchableOpacity
          style={{ display: { icon } }}
          onPress={() => setCheck(!check)}
        >
          <FontAwesome
            name={check ? "eye" : "eye-slash"}
            style={style.secureTextEntry}
          />
        </TouchableOpacity>
      )}
      {hasError && (
        <Text style={style.errorText}>Vui lòng kiểm tra lại thông tin</Text>
      )}
    </View>
  );
};
export default WrapInput;

const style = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    marginHorizontal: 30,
    marginBottom: 10,
    paddingLeft: 20,
  },
  isFocused: {
    borderColor: "#1ce8e8",
    backgroundColor: "#f2fafa",
  },
  isError: {
    borderColor: "red",
    backgroundColor: "#f8d7da",
  },
  secureTextEntry: {
    position: "absolute",
    right: 35,
    right: 40,
    top: -50,
    fontSize: 17,
  },
  errorText: {
    color: "red",
    marginLeft: 40,
    marginBottom: 5,
  },
});
