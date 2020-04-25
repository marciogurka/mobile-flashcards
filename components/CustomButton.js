import React from "react";
import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {lightPurp, white} from "../utils/colors";

export default function CustomButton({children, onPress, style = {}}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.reset, style]}> {children} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: lightPurp,
    margin: 10,
    padding: 15,
    width: 300,
  },
  reset: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: white,
  },
});
