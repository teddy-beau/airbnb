import React from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white } = colors;

const InputLarge = ({
   placeholder,
   setFunction,
   value,
   setDisplayMessage,
   setIsInfoModified,
}) => {
   return (
      <TextInput
         style={styles.textarea}
         placeholder={placeholder}
         multiline={true}
         value={value && value}
         onChangeText={(text) => {
            setFunction(text);
            if (setDisplayMessage) {
               setDisplayMessage(false);
            }
            if (setIsInfoModified) {
               setIsInfoModified(true);
            }
         }}
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
