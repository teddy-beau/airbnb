import React from "react";
import {
   Text,
   View,
   TouchableOpacity,
   StyleSheet,
   ScrollView,
   SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
// Colors:
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white, yellow } = colors;
import TitleLarge from "../components/TitleLarge";

const ProfileScreen = ({ setToken }) => {
   return (
      <SafeAreaView style={styles.safeAreaView}>
         <ScrollView contentContainerStyle={styles.scrollView}>
            <TitleLarge content={`Hello user :)`} />
            <TouchableOpacity
               style={styles.buttonOutline}
               onPress={() => {
                  setToken(null);
               }}
            >
               <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
         </ScrollView>
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
      alignItems: "center",
   },
   buttonOutline: {
      // borderColor: red,
      // borderWidth: 2,
      backgroundColor: red,
      borderRadius: 30,
      width: 150,
      // alignSelf: "center",
      marginVertical: 20,
   },
   buttonText: {
      textAlign: "center",
      color: white,
      fontSize: 20,
      fontWeight: "500",
      padding: 10,
   },
});

export default ProfileScreen;
