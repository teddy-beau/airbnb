import React, { useState } from "react";
import {
   Text,
   TextInput,
   View,
   TouchableOpacity,
   Image,
   StyleSheet,
} from "react-native";
import axios from "axios";
import colors from "../assets/colors";
const { red, regularGrey, lighGrey, darkGrey, white } = colors;
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";

export default function SignUpScreen({ setToken }) {
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [description, setDescription] = useState("");
   const [password, setPassword] = useState("");
   const [passwordConfirmation, setPasswordConfirmation] = useState("");
   //  const [differentPasswords, setDifferentPasswords] = useState(false);
   const [missingField, setMissingField] = useState(false);
   const [passwordVisible, setPasswordVisible] = useState(false);

   return (
      <KeyboardAwareScrollView style={styles.screenContainer}>
         <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
               <Image
                  style={styles.logo}
                  source={require("../assets/logo.png")}
                  resizeMode={"contain"}
               />
               <Text style={styles.title}>Sign up</Text>
            </View>
            <View style={styles.formContainer}>
               <TextInput
                  style={styles.input}
                  placeholder="email"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  textContentType="emailAddress"
               />
               <TextInput
                  style={styles.input}
                  placeholder="username"
                  onChangeText={(text) => setUsername(text)}
                  value={username}
                  textContentType="username"
               />
               <TextInput
                  style={styles.textarea}
                  placeholder="describe yourself in a few words..."
                  onChangeText={(text) => setDescription(text)}
                  value={description}
                  multiline={true}
                  numberOfLines={3}
               />
               <View
                  style={{
                     flexDirection: "row",
                     justifyContent: "space-between",
                     alignItems: "flex-end",
                  }}
               >
                  <TextInput
                     style={[styles.input, { width: "90%" }]}
                     placeholder="password"
                     onChangeText={(text) => setPassword(text)}
                     value={password}
                     secureTextEntry={passwordVisible ? false : true}
                     textContentType="password"
                  />
                  <View style={[styles.input, { width: "10%" }]}>
                     <Feather
                        name={passwordVisible ? "eye-off" : "eye"}
                        size={20}
                        onPress={() => {
                           if (passwordVisible) {
                              setPasswordVisible(false);
                           } else {
                              setPasswordVisible(true);
                           }
                        }}
                     />
                  </View>
               </View>
               <TextInput
                  style={styles.input}
                  placeholder="confirm password"
                  onChangeText={(text) => setPasswordConfirmation(text)}
                  value={passwordConfirmation}
                  secureTextEntry={true}
                  textContentType="password"
               />
            </View>
            <View style={styles.submitContainer}>
               {passwordConfirmation !== password && (
                  <Text style={styles.missingField}>
                     The 2 passwords don't match!
                  </Text>
               )}
               {missingField && (
                  <Text style={styles.missingField}>
                     All fields are required
                  </Text>
               )}
               <TouchableOpacity
                  style={styles.buttonOutline}
                  activeOpacity="0.5"
                  title="Sign up"
                  onPress={async () => {
                     try {
                        if (
                           email &&
                           username &&
                           description &&
                           password &&
                           passwordConfirmation
                        ) {
                           const response = await axios.post(
                              "https://express-airbnb-api.herokuapp.com/user/sign_up",
                              {
                                 email: email,
                                 username: username,
                                 description: description,
                                 password: password,
                              }
                           );
                           setToken(response.data.token);
                           alert("Signed up successfully!");
                        } else {
                           setMissingField(true);
                        }
                     } catch (error) {
                        console.log(error.response);
                        alert("An error occured!");
                     }
                  }}
               >
                  <Text style={styles.buttonText}>Sign up</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  activeOpacity="0.5"
                  onPress={() => {
                     navigation.navigate("SignUp");
                  }}
               >
                  <Text style={styles.regularText}>
                     Already have an account? Sign in!
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      </KeyboardAwareScrollView>
   );
}

const styles = StyleSheet.create({
   screenContainer: {
      backgroundColor: white,
      height: "100%",
   },
   mainContainer: {
      alignItems: "center",
   },
   headerContainer: {
      alignItems: "center",
      marginTop: 10,
   },
   logo: {
      width: 100,
      height: 150,
   },
   title: {
      color: regularGrey,
      fontSize: 26,
      fontWeight: "700",
   },
   formContainer: {
      width: "75%",
      marginTop: 30,
   },
   input: {
      color: darkGrey,
      fontSize: 18,
      fontWeight: "500",
      paddingVertical: 8,
      borderBottomColor: red,
      borderBottomWidth: 1,
      marginVertical: 20,
   },
   textarea: {
      color: darkGrey,
      fontSize: 18,
      fontWeight: "500",
      padding: 8,
      borderColor: red,
      borderWidth: 1,
      marginVertical: 20,
      height: 100,
   },
   submitContainer: {
      marginTop: 60,
      alignItems: "center",
   },
   missingField: {
      color: red,
      marginVertical: 16,
   },
   buttonOutline: {
      borderColor: red,
      borderWidth: 3,
      borderRadius: 30,
      width: 200,
   },
   buttonText: {
      textAlign: "center",
      color: regularGrey,
      fontSize: 20,
      fontWeight: "500",
      padding: 10,
   },
   regularText: {
      color: regularGrey,
      marginVertical: 16,
   },
});
