import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white } = colors;

const Logo = ({ content }) => {
   return <Text style={styles.title}>{content}</Text>;
};

const styles = StyleSheet.create({
   title: {
      color: regularGrey,
      fontSize: 26,
      fontWeight: "700",
   },
});

export default Logo;
