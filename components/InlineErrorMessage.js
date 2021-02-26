import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white } = colors;

const InlineErrorMessage = ({ content }) => {
   return <Text style={styles.text}>{content}</Text>;
};

const styles = StyleSheet.create({
   text: { color: red, marginVertical: 16, textAlign: "center" },
});

export default InlineErrorMessage;
