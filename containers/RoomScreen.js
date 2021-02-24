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
// import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import Constants from "expo-constants";
// Colors:
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white } = colors;
// Components:
import StarRating from "../components/StarRating";

const RoomScreen = ({ route }) => {
   // const navigation = useNavigation();
   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   console.log(route.params);

   // Fetch data from API
   // useEffect(() => {
   //    const fetchData = async () => {
   //       try {
   //          const response = await axios.get(
   //             `https://express-airbnb-api.herokuapp.com/rooms/${route.params.roomId}`
   //          );
   //          // console.log(response.data);
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
         {isLoading ? (
            <View>
               <ActivityIndicator color={red} />
            </View>
         ) : (
            <View>
               <Text>Coucou {data.title}</Text>
            </View>
         )}
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   screenContainer: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      height: "100%",
      backgroundColor: white,
   },
   flatListContainer: {
      paddingHorizontal: "5%",
   },
   separator: {
      borderBottomWidth: 1,
      borderBottomColor: lightGrey,
      marginTop: 12,
      marginBottom: 16,
   },
   image: {
      width: "100%",
      height: 210,
   },
   price: {
      position: "absolute",
      top: 150,
      width: 110,
      height: 50,
      paddingVertical: 12,
      backgroundColor: "#000000",
      color: white,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "300",
   },
   adDetails: {
      marginTop: 12,
      flexDirection: "row",
   },
   adDetailsTextSection: {
      justifyContent: "center",
      flex: 1,
   },
   title: {
      fontSize: 20,
      color: darkGrey,
      marginBottom: 10,
   },
   reviewsSection: {
      flexDirection: "row",
      alignItems: "center",
   },
   rewiewsText: {
      color: lightGrey,
      fontSize: 14,
      alignSelf: "flex-end",
      marginLeft: 5,
   },
   userPhoto: {
      width: 70,
      height: 70,
      borderRadius: 40,
      marginLeft: 10,
   },
});

export default RoomScreen;
