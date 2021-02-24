// Packages:
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
   SafeAreaView,
   StyleSheet,
   Button,
   Text,
   View,
   ScrollView,
   FlatList,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
// Colors:
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white } = colors;

// Components:
import AdList from "../components/AdList";

const HomeScreen = () => {
   const navigation = useNavigation();

   return (
      <SafeAreaView style={styles.screenContainer}>
         {/* <ScrollView contentContainerStylestyle={styles.scrollViewContainer}>
            <View style={styles.headerContainer}>
               <Logo height={40} />
            </View>
         </ScrollView> */}
         <AdList />
      </SafeAreaView>
   );
};

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
});

export default HomeScreen;
