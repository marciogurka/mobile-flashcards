import React from "react";
import PropTypes from "prop-types";
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";

export default function TextButton({children, onPress, txtStyle = {}}) {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.btnText, txtStyle]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnText: {
    fontSize: 18,
  },
  btnContainer: {
    alignItems: "center",
    marginBottom: 18,
  },
});

TextButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  txtStyle: PropTypes.object,
};
