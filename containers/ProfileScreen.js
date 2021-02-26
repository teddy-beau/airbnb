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
   Message,
} from "react-native";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
// Colors:
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white, yellow } = colors;
// Components:
import TitleLarge from "../components/TitleLarge";
import InputRegular from "../components/InputRegular";
import InputLarge from "../components/InputLarge";
import InlineErrorMessage from "../components/InlineErrorMessage";
import axios from "axios";

const ProfileScreen = ({ setToken, setId, userToken, userId }) => {
   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [description, setDescription] = useState("");
   const [picture, setPicture] = useState(null);
   // const [uploading, setUploading] = useState(false);
   const [isPictureModified, setIsPictureModified] = useState(false);
   const [isInfoModified, setIsInfoModified] = useState(false);
   const [displayErrorMessage, setDisplayErrorMessage] = useState(null); // For error messages

   // Fetch data from API
   useEffect(() => {
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
            setDisplayErrorMessage("An error occured");
         }
      };
      fetchData();
   }, []);

   // Update profile info and/or picture :
   const updateProfile = async () => {
      setDisplayErrorMessage(false);
      // On press, if picture/info have been modified, start loading:
      if (isPictureModified || isInfoModified) {
         setIsLoading(true);

         // Send request to update picture:
         if (isPictureModified) {
         }
      }
   };

   const handleImagePicked = useCallback(async (pickerResult) => {
      try {
         let uploadResponse, uploadResult;
         setIsLoading(true);
         if (!pickerResult.cancelled) {
            const uri = pickerResult.uri;
            const uriParts = uri.split(".");
            const fileType = uriParts[uriParts.length - 1];
            const formData = new FormData();
            formData.append("photo", {
               uri,
               name: `photo.${fileType}`,
               type: `image/${fileType}`,
            });
            uploadResponse = await axios.put(
               `https://express-airbnb-api.herokuapp.com/user/upload_picture/${userId}`,
               formData,
               {
                  headers: {
                     Authorization: `Bearer ${userToken}`,
                     Accept: "application/json",
                     "Content-Type": "multipart/form-data",
                  },
               }
            );
            if (
               Array.isArray(uploadResponse.data.photo) === true &&
               uploadResponse.data.photo.length > 0
            ) {
               setPicture(uploadResponse.data.photo[0].url);
            }
         }
      } catch (error) {
         alert("File upload failed, please try again later.");
      } finally {
         setIsLoading(false);
      }
   });

   const getFromLibrary = async () => {
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryPermission.status === "granted") {
         const pickerResult = await ImagePicker.launchImageLibraryAsync();
         handleImagePicked(pickerResult);
      }
   };

   const getFromCamera = async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log(cameraPermission, libraryPermission);
      if (
         cameraPermission.status === "granted" &&
         libraryPermission.status === "granted"
      ) {
         const pickerResult = await ImagePicker.launchCameraAsync();
         handleImagePicked(pickerResult);
      }
   };

   return (
      <SafeAreaView style={styles.safeAreaView}>
         <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={{ alignItems: "center", marginTop: 26 }}>
               <TitleLarge content={`Hello, ${username} :)`} />
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
                           : { uri: picture }
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
                  setDisplayErrorMessage={setDisplayErrorMessage}
                  setIsInfoModified={setIsInfoModified}
               />
               <InputRegular
                  placeholder={"username"}
                  type={"username"}
                  setFunction={setUsername}
                  value={username}
                  setDisplayErrorMessage={setDisplayErrorMessage}
                  setIsInfoModified={setIsInfoModified}
               />
               <InputLarge
                  placeholder={"describe yourself in a few words..."}
                  setFunction={setDescription}
                  value={description}
                  setDisplayErrorMessage={setDisplayErrorMessage}
                  setIsInfoModified={setIsInfoModified}
               />
               {displayErrorMessage && (
                  <InlineErrorMessage content={displayErrorMessage} />
               )}
            </View>
            <View style={styles.buttonContainer}>
               {isLoading ? (
                  <View style={{ justifyContent: "center" }}>
                     <ActivityIndicator color={red} />
                  </View>
               ) : (
                  <TouchableOpacity style={styles.buttonBox1}>
                     <Text style={styles.buttonText1} onPress={updateProfile}>
                        Update
                     </Text>
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
