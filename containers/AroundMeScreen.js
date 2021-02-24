// Packages:
import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   Image,
   Text,
   View,
   FlatList,
   ActivityIndicator,
   TouchableOpacity,
   SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import Constants from "expo-constants";
// Colors:
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white, yellow } = colors;
// Components:
import StarRating from "../components/StarRating";

const AroundMeScreen = () => {
   const navigation = useNavigation();
   // const [data, setData] = useState([]);
   // const [isLoading, setIsLoading] = useState(true);

   // Fetch data from API
   // useEffect(() => {
   //    const fetchData = async () => {
   //       try {
   //          const response = await axios.get(
   //             "https://express-airbnb-api.herokuapp.com/rooms"
   //          );
   //          setData(response.data);
   //          setIsLoading(false);
   //       } catch (error) {
   //          console.log(error.response);
   //       }
   //    };
   //    fetchData();
   // }, []);

   return (
      <SafeAreaView style={styles.screenContainer}>
         <Text>Around Me Screen</Text>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   screenContainer: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      height: "100%",
      backgroundColor: white,
   },
});

export default AroundMeScreen;
