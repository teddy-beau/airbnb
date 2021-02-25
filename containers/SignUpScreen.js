// Packages:
import React, { useState } from "react";
import {
   Text,
   View,
   TouchableOpacity,
   StyleSheet,
   ActivityIndicator,
   SafeAreaView,
   StatusBar,
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
import InputLarge from "../components/InputLarge";
import InputPassword from "../components/InputPassword";
import RedirectButton from "../components/RedirectButton";

export default function SignUpScreen({ setToken }) {
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [description, setDescription] = useState("");
   const [password, setPassword] = useState("");
   const [passwordConfirmation, setPasswordConfirmation] = useState("");
   const [inputError, setInputError] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async () => {
      setIsLoading(true);
      setInputError(null);
      if (
         email &&
         username &&
         description &&
         password &&
         passwordConfirmation
      ) {
         if (password === passwordConfirmation) {
            try {
               const response = await axios.post(
                  "https://express-airbnb-api.herokuapp.com/user/sign_up",
                  {
                     email,
                     username,
                     description,
                     password,
                  }
               );
               if (response.data) {
                  setToken(response.data.token);
                  alert("Successfully signed up!");
               } else {
                  setInputError(
                     "A server error occurred, please try again later."
                  );
               }
            } catch (error) {
               console.log(error.response.data.error);

               const errorMessage = error.response.data.error;

               if (errorMessage === "This email already has an account.") {
                  setInputError(
                     "An account is already associated with this email."
                  );
               } else if (
                  errorMessage === "This username already has an account."
               ) {
                  setInputError(
                     "An account is already associated with this username."
                  );
               }
            }
         } else {
            setInputError("The two passwords don't match!");
         }
      } else {
         setInputError("All fields are required!");
      }
      setIsLoading(false);
   };

   return (
      <SafeAreaView style={styles.screenContainer}>
         <KeyboardAwareScrollView
            contentContainerStylestyle={styles.scrollViewContainer}
         >
            <View style={styles.headerContainer}>
               <Logo />
               <TitleLarge content={"Sign up"} />
            </View>
            <View style={styles.formContainer}>
               <InputRegular
                  placeholder={"email"}
                  type={"emailAddress"}
                  setFunction={setEmail}
               />
               <InputRegular
                  placeholder={"username"}
                  type={"username"}
                  setFunction={setUsername}
               />
               <InputLarge
                  placeholder={"describe yourself in a few words..."}
                  setFunction={setDescription}
               />
               <InputPassword
                  placeholder={"password"}
                  type={"password"}
                  setFunction={setPassword}
                  eyeSwitch={true}
               />
               <InputPassword
                  placeholder={"confirm password"}
                  type={"password"}
                  setFunction={setPasswordConfirmation}
                  eyeSwitch={false}
               />
            </View>
            <View style={styles.submitContainer}>
               {inputError && (
                  <Text style={styles.inputError}>{inputError}</Text>
               )}
               {isLoading ? (
                  <View>
                     <ActivityIndicator color={red} />
                  </View>
               ) : (
                  <TouchableOpacity
                     style={styles.buttonOutline}
                     activeOpacity="0.5"
                     title="Sign up"
                     onPress={handleSubmit}
                  >
                     <Text style={styles.buttonText}>Sign up</Text>
                  </TouchableOpacity>
               )}
               <RedirectButton
                  content={"Already have an account? Sign in!"}
                  screen={"SignIn"}
               />
            </View>
         </KeyboardAwareScrollView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   screenContainer: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      height: "100%",
      backgroundColor: white,
   },
   scrollViewContainer: {
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
   inputError: {
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
});
