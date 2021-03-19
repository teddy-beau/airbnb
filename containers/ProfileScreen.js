// Packages:
import React, { useState, useEffect, useCallback } from "react";
import {
   Text,
   View,
   TouchableOpacity,
   StyleSheet,
   ScrollView,
   SafeAreaView,
   Image,
   ActivityIndicator,
   Dimensions,
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

// Colors:
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white, yellow } = colors;

// Components:
import TitleLarge from "../components/TitleLarge";
import InputRegular from "../components/InputRegular";
import InputLarge from "../components/InputLarge";
import InlineErrorMessage from "../components/InlineErrorMessage";

const ProfileScreen = ({ setToken, setId, userToken, userId }) => {
   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [description, setDescription] = useState("");
   const [picture, setPicture] = useState(null);
   const [isPictureModified, setIsPictureModified] = useState(false);
   const [isInfoModified, setIsInfoModified] = useState(false);
   const [displayMessage, setDisplayMessage] = useState(null); // For error messages

   // Fetch data from API when screen is mounted:
   useEffect(() => {
      fetchData();
   }, []);

   // Function kept outside of useEffect to be called elsewhere:
   const fetchData = async () => {
      try {
         // Fetching user data:
         const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/user/${userId}`,
            {
               headers: {
                  Authorization: `Bearer ${userToken}`,
               },
            }
         );
         setEmail(response.data.email);
         setUsername(response.data.username);
         setDescription(response.data.description);
         // Only if a picture is available:
         if (response.data.photo) {
            setPicture({ uri: response.data.photo[0].url });
         }
         // Data loaded.
         setIsLoading(false);
      } catch (error) {
         console.log(error.response);
         setDisplayMessage("An error occured");
         setIsLoading(false);
      }
   };

   // Update profile info and/or picture :
   const updateProfile = async () => {
      setDisplayMessage(false);

      // On press, if picture/info have been modified, start loading:
      if (isPictureModified || isInfoModified) {
         setIsLoading(true);

         // If picture is modified, send request to update:
         if (isPictureModified) {
            try {
               const uri = picture.uri;
               const uriParts = uri.split(".");
               const fileType = uriParts[1];

               const formData = new FormData();
               formData.append("photo", {
                  uri,
                  name: `userPicture`,
                  type: `image/${fileType}`,
               });

               const response = await axios.put(
                  `https://express-airbnb-api.herokuapp.com/user/upload_picture`,
                  formData,
                  {
                     headers: {
                        Authorization: "Bearer " + userToken,
                     },
                  }
               );

               if (response.data) {
                  console.log("res", response.data);
                  // New picture will be shown on screen:
                  setPicture({ uri: response.data.photo[0].url });
                  setDisplayMessage("Your profile has been updated");
               }
            } catch (error) {
               setDisplayMessage("Your profile has been successfully updated");
            }
         }
         // If info is modified, send a request to update:
         if (isInfoModified) {
            try {
               const objToSend = {
                  email: email,
                  username: username,
                  description: description,
               };

               const response = await axios.put(
                  `https://express-airbnb-api.herokuapp.com/user/update`,
                  objToSend,
                  {
                     headers: {
                        Authorization: "Bearer " + userToken,
                     },
                  }
               );

               if (response.data) {
                  setDisplayMessage(
                     "Your profile has been successfully updated"
                  );
               }
            } catch (error) {
               setDisplayMessage(`${error.response.data.error}`);
            }
         }

         // Reset these states:
         isPictureModified && setIsPictureModified(false);
         isInfoModified && setIsInfoModified(false);
         setIsLoading(false);

         // Refresh with the new data:
         fetchData();
      } else {
         setDisplayMessage("Change at least one information");
      }
   };

   const getFromLibrary = async () => {
      // Ask permission to access camera roll:
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryPermission.status === "granted") {
         const pickerResult = await ImagePicker.launchImageLibraryAsync();
         setPicture(pickerResult);
         setIsPictureModified(true);
      }
   };

   const getFromCamera = async () => {
      // Ask permission to access camera and camera roll:
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (
         cameraPermission.status === "granted" &&
         libraryPermission.status === "granted"
      ) {
         const pickerResult = await ImagePicker.launchCameraAsync();
         setPicture(pickerResult);
         setIsPictureModified(true);
      }
   };

   // Hide the message after 2.5 seconds:
   if (displayMessage) {
      setTimeout(() => setDisplayMessage(false), 2500);
   }

   return (
      <SafeAreaView style={styles.safeAreaView}>
         <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={{ alignItems: "center", marginTop: 26 }}>
               <TitleLarge
                  content={`Hello${username ? `, ${username}` : ""}`}
               />
               <View style={styles.pictureContainer}>
                  <TouchableOpacity onPress={getFromLibrary}>
                     <MaterialIcons
                        name="add-photo-alternate"
                        size={40}
                        color={regularGrey}
                     />
                  </TouchableOpacity>
                  <Image
                     style={styles.avatar}
                     source={
                        picture === null
                           ? require("../assets/no-avatar.png")
                           : { uri: picture.uri }
                     }
                  />
                  <TouchableOpacity onPress={getFromCamera}>
                     <MaterialIcons
                        name="add-a-photo"
                        size={36}
                        color={regularGrey}
                     />
                  </TouchableOpacity>
               </View>
            </View>
            <View style={styles.formContainer}>
               <InputRegular
                  placeholder={"email"}
                  type={"emailAddress"}
                  setFunction={setEmail}
                  value={email}
                  setDisplayMessage={setDisplayMessage}
                  setIsInfoModified={setIsInfoModified}
               />
               <InputRegular
                  placeholder={"username"}
                  type={"username"}
                  setFunction={setUsername}
                  value={username}
                  setDisplayMessage={setDisplayMessage}
                  setIsInfoModified={setIsInfoModified}
               />
               <InputLarge
                  placeholder={"describe yourself in a few words..."}
                  setFunction={setDescription}
                  value={description}
                  setDisplayMessage={setDisplayMessage}
                  setIsInfoModified={setIsInfoModified}
               />
               {displayMessage && (
                  <InlineErrorMessage content={displayMessage} />
               )}
            </View>
            <View style={styles.buttonContainer}>
               {isLoading ? (
                  <View style={{ justifyContent: "center" }}>
                     <ActivityIndicator color={red} />
                  </View>
               ) : (
                  <TouchableOpacity
                     style={styles.buttonBox1}
                     onPress={updateProfile}
                     activeOpacity={0.5}
                  >
                     <Text style={styles.buttonText1}>Update</Text>
                  </TouchableOpacity>
               )}
               <TouchableOpacity
                  style={styles.buttonBox2}
                  onPress={() => {
                     setToken(null);
                     setId(null);
                  }}
               >
                  <Text style={styles.buttonText2}>Log out</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
   safeAreaView: {
      width: width,
      height: "100%",
      backgroundColor: white,
   },
   scrollView: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      width: "100%",
   },
   pictureContainer: {
      marginTop: 26,
      flexDirection: "row",
      alignItems: "center",
   },
   avatar: {
      width: 120,
      height: 120,
      borderRadius: 75,
      borderColor: red,
      borderWidth: 2,
      marginHorizontal: 16,
   },
   formContainer: {
      paddingHorizontal: "12%",
      marginTop: 10,
   },
   buttonContainer: {
      alignItems: "center",
   },
   buttonBox1: {
      borderColor: red,
      borderWidth: 2,
      borderRadius: 30,
      width: 100,
      marginVertical: 12,
   },
   buttonText1: {
      textAlign: "center",
      color: regularGrey,
      fontSize: 16,
      fontWeight: "500",
      padding: 6,
   },
   buttonBox2: {
      borderColor: red,
      borderWidth: 2,
      backgroundColor: red,
      borderRadius: 30,
      width: 100,
      marginVertical: 12,
   },
   buttonText2: {
      textAlign: "center",
      color: white,
      fontSize: 16,
      fontWeight: "500",
      padding: 6,
   },
});

export default ProfileScreen;
