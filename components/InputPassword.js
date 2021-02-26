import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white } = colors;

const InputPassword = ({
   placeholder,
   type,
   setFunction,
   secure,
   eyeSwitch,
   value,
}) => {
   const [passwordVisible, setPasswordVisible] = useState(false);

   return (
      <View
         style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
         }}
      >
         <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder={placeholder}
            onChangeText={(text) => setFunction(text)}
            secureTextEntry={passwordVisible ? false : true}
            textContentType={type}
            value={value && value}
         />
         {eyeSwitch && (
            <View style={[styles.input, { width: "10%" }]}>
               <Feather
                  name={passwordVisible ? "eye-off" : "eye"}
                  size={20}
                  color={regularGrey}
                  onPress={() => {
                     if (passwordVisible) {
                        setPasswordVisible(false);
                     } else {
                        setPasswordVisible(true);
                     }
                  }}
               />
            </View>
         )}
      </View>
   );
};

const styles = StyleSheet.create({
   input: {
      color: darkGrey,
      fontSize: 18,
      fontWeight: "500",
      paddingVertical: 8,
      borderBottomColor: red,
      borderBottomWidth: 1,
      marginVertical: 16,
   },
});

export default InputPassword;
