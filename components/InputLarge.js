import React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white } = colors;

const InputLarge = ({ placeholder, setFunction }) => {
   return (
      <TextInput
         style={styles.textarea}
         placeholder={placeholder}
         onChangeText={(text) => setFunction(text)}
         multiline={true}
      />
   );
};

const styles = StyleSheet.create({
   textarea: {
      color: darkGrey,
      fontSize: 18,
      fontWeight: "500",
      padding: 8,
      borderColor: red,
      borderWidth: 1,
      marginVertical: 16,
      height: 100,
   },
});

export default InputLarge;
