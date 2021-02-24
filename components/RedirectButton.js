import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white } = colors;

const RedirectButton = ({ content, screen }) => {
   const navigation = useNavigation();
   return (
      <TouchableOpacity
         activeOpacity="0.5"
         onPress={() => {
            navigation.navigate(screen);
         }}
      >
         <Text style={styles.regularText}>{content}</Text>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   regularText: {
      color: regularGrey,
      marginVertical: 16,
   },
});

export default RedirectButton;
