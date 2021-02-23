import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
   Text,
   TextInput,
   View,
   TouchableOpacity,
   Image,
   StyleSheet,
   ActivityIndicator,
} from "react-native";
import axios from "axios";
import colors from "../assets/colors";
const { red, regularGrey, lighGrey, darkGrey, white } = colors;
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Feather } from "@expo/vector-icons";

export default function SignInScreen({ setToken }) {
   const navigation = useNavigation();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [missingField, setMissingField] = useState(false);
   const [passwordVisible, setPasswordVisible] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   return (
      <KeyboardAwareScrollView style={styles.screenContainer}>
         <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
               <Image
                  style={styles.logo}
                  source={require("../assets/logo.png")}
                  resizeMode={"contain"}
               />
               <Text style={styles.title}>Sign in</Text>
            </View>
            <View style={styles.formContainer}>
               <TextInput
                  style={styles.input}
                  placeholder="email"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  textContentType="emailAddress"
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
            </View>
            <View style={styles.submitContainer}>
               {missingField && (
                  <Text style={styles.missingField}>
                     All fields are required
                  </Text>
               )}
               {isLoading ? (
                  <View style={styles.loaderContainer}>
                     <ActivityIndicator color={red} />
                  </View>
               ) : (
                  <TouchableOpacity
                     style={styles.buttonOutline}
                     activeOpacity="0.5"
                     title="Sign in"
                     onPress={async () => {
                        setIsLoading(true);
                        try {
                           if (email && password) {
                              const response = await axios.post(
                                 "https://express-airbnb-api.herokuapp.com/user/log_in",
                                 { email: email, password: password }
                              );
                              setToken(response.data.token);

                              alert("Login successfully!");
                           } else {
                              setMissingField(true);
                           }
                        } catch (error) {
                           console.log(error.response);
                           alert("Wrong email or password!");
                        }
                        setIsLoading(false);
                     }}
                  >
                     <Text style={styles.buttonText}>Sign in</Text>
                  </TouchableOpacity>
               )}
               <TouchableOpacity
                  activeOpacity="0.5"
                  onPress={() => {
                     navigation.navigate("SignUp");
                  }}
               >
                  <Text style={styles.regularText}>Create an account</Text>
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
   loaderContainer: {
      backgroundColor: white,
      height: "100%",
      paddingTop: 50,
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
   submitContainer: {
      marginVertical: 50,
      alignItems: "center",
   },
   missingField: {
      color: red,
      marginVertical: 16,
   },
   buttonOutline: {
      borderColor: red,
      borderWidth: 2,
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
