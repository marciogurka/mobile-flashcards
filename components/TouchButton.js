import React from "react";
import PropTypes from "prop-types";
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";
import {white, darkGray, gray} from "../utils/colors";

export default function TouchButton({
  btnStyle = {},
  txtStyle = {},
  children,
  onPress,
  disabled = false,
}) {
  const disabledButton = disabled ? styles.btnDisabled : {};
  const disabledButtonText = disabled ? styles.btnTextDisabled : {};
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={[styles.btn, btnStyle, disabledButton]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.btnText, txtStyle, disabledButtonText]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    marginBottom: 18,
    alignItems: "center",
  },
  btn: {
    justifyContent: `center`,
    alignItems: `center`,
    borderWidth: 1,
    borderColor: "#999",
    width: 180,
    height: 50,
    backgroundColor: "red",
    borderRadius: 5,
  },
  btnDisabled: {
    backgroundColor: gray,
    borderColor: darkGray,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: white,
  },
  btnTextDisabled: {
    color: darkGray,
  },
});

TouchButton.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  btnStyle: PropTypes.object,
  txtStyle: PropTypes.object,
  disabled: PropTypes.bool,
};
