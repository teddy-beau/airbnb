import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
   Text,
   View,
   TouchableOpacity,
   StyleSheet,
   ActivityIndicator,
   SafeAreaView,
   Platform,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
// Colors:
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white } = colors;
// Components:
import Logo from "../components/Logo";
import TitleLarge from "../components/TitleLarge";
import InputRegular from "../components/InputRegular";
import InputPassword from "../components/InputPassword";

const SignInScreen = ({ setToken }) => {
   const navigation = useNavigation();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [missingField, setMissingField] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   const handleSubmit = async () => {
      setIsLoading(true);
      setError(null);
      try {
         if (email && password) {
            const response = await axios.post(
               "https://express-airbnb-api.herokuapp.com/user/log_in",
               { email: email, password: password }
            );
            setIsLoading(false);
            setToken(response.data.token);

            alert("Login successfully!");
         } else {
            setIsLoading(false);
            setMissingField(true);
         }
      } catch (error) {
         setIsLoading(false);
         console.log(error.response);
         alert("Wrong email or password!");
      }
   };

   return (
      <SafeAreaView style={styles.safeAreaView}>
         <KeyboardAwareScrollView
            contentContainerStylestyle={styles.scrollView}
         >
            <View style={styles.headerContainer}>
               <Logo />
               <TitleLarge content={"Sign in"} />
            </View>
            <View style={styles.formContainer}>
               <InputRegular
                  placeholder={"email"}
                  type={"emailAddress"}
                  setFunction={setEmail}
               />
               <InputPassword
                  placeholder={"password"}
                  type={"password"}
                  setFunction={setPassword}
                  eyeSwitch={true}
               />
            </View>
            <View style={styles.submitContainer}>
               {missingField && (
                  <Text style={styles.missingField}>
                     All fields are required
                  </Text>
               )}
               {isLoading ? (
                  <View>
                     <ActivityIndicator color={red} />
                  </View>
               ) : (
                  <TouchableOpacity
                     style={styles.buttonOutline}
                     activeOpacity="0.5"
                     title="Sign in"
                     onPress={handleSubmit}
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
         </KeyboardAwareScrollView>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   safeAreaView: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      height: "100%",
      backgroundColor: white,
   },
   scrollView: {
      backgroundColor: white,
   },
   headerContainer: {
      alignItems: "center",
      marginTop: 10,
   },
   formContainer: {
      paddingHorizontal: "15%",
      marginTop: 30,
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

export default SignInScreen;
