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
   Dimensions,
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

export default function SignUpScreen({ setToken, setId }) {
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [description, setDescription] = useState("");
   const [password, setPassword] = useState("");
   const [passwordConfirmation, setPasswordConfirmation] = useState("");
   const [displayErrorMessage, setDisplayErrorMessage] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async () => {
      setIsLoading(true);
      setDisplayErrorMessage(null);
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
                  setIsLoading(false);
                  setToken(response.data.token);
                  setId(response.data._id);
                  // alert("Successfully signed up!");
               } else {
                  setIsLoading(false);
                  setDisplayErrorMessage(
                     "A server error occurred, please try again later."
                  );
               }
            } catch (error) {
               console.log(error.response.data.error);

               const errorMessage = error.response.data.error;

               if (errorMessage === "This email already has an account.") {
                  setDisplayErrorMessage(
                     "An account is already associated with this email."
                  );
               } else if (
                  errorMessage === "This username already has an account."
               ) {
                  setDisplayErrorMessage(
                     "An account is already associated with this username."
                  );
               }
            }
         } else {
            setDisplayErrorMessage("The two passwords don't match!");
         }
      } else {
         setDisplayErrorMessage("All fields are required!");
      }
   };

   return (
      <SafeAreaView style={styles.safeAreaView}>
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
               {displayErrorMessage && (
                  <Text style={styles.displayErrorMessage}>
                     {displayErrorMessage}
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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
   safeAreaView: {
      width: width,
      height: "100%",
      backgroundColor: white,
   },
   scrollViewContainer: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      width: "100%,",
   },
   headerContainer: {
      alignItems: "center",
      marginTop: 10,
   },
   formContainer: {
      paddingHorizontal: "12%",
      marginTop: 30,
   },
   submitContainer: {
      marginVertical: 50,
      alignItems: "center",
   },
   displayErrorMessage: {
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
