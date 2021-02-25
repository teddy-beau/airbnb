// Packages:
import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   Image,
   Text,
   View,
   ActivityIndicator,
   TouchableOpacity,
   SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import Constants from "expo-constants";
import * as Location from "expo-location";
import MapView from "react-native-maps";
// Colors:
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white, yellow } = colors;
// Components:
import StarRating from "../components/StarRating";

const AroundMeScreen = () => {
   const navigation = useNavigation();
   const [error, setError] = useState();
   const [data, setData] = useState();
   const [userCoords, setUserCoords] = useState({
      latitude: 48.856614,
      longitude: 2.3522219,
   });
   const [isLoading, setIsLoading] = useState(true);

   // Request to use user location:
   useEffect(() => {
      const askPermission = async () => {
         let { status } = await Location.requestPermissionsAsync();
         if (status === "granted") {
            let location = await Location.getCurrentPositionAsync();
            setUserCoords({
               latitude: location.coords.latitude,
               longitude: location.coords.longitude,
            });
            // console.log(location);
         } else {
            setError(true);
         }
         const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${userCoords.latitude}&longitude=${userCoords.longitude}`
         );
         setData(response.data);
         console.log("data", data);
         setIsLoading(false);
      };
      askPermission();
   }, []);

   // // Fetch coords from API
   // useEffect(() => {
   //    const fetchData = async () => {
   //       try {
   //          const response = await axios.get(
   //             `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${userCoords.latitude}&longitude=${userCoords.longitude}`
   //          );
   //          setData(response.data);
   //          setIsLoading(false);
   //       } catch (error) {
   //          console.log(error.response);
   //       }
   //    };
   //    fetchData();
   // }, [userCoords]);

   return (
      <SafeAreaView style={styles.screenContainer}>
         {isLoading ? (
            <View style={{ justifyContent: "center", height: "100%" }}>
               <ActivityIndicator color={red} />
            </View>
         ) : error ? (
            <View style={{ justifyContent: "center", height: "100%" }}>
               <Text style={styles.deniedMain}>
                  Permission to use location denied!
               </Text>
               <Text style={styles.deniedDetails}>
                  To use the "Around me" feature please allow geolocation in
                  your device's settings.
               </Text>
            </View>
         ) : (
            <MapView
               initialRegion={{
                  latitude: userCoords.latitude,
                  longitude: userCoords.longitude,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
               }}
               showsUserLocation={true}
               style={styles.mapContainer}
            >
               {/* {data.map((ad, index) => {
                  return (
                     <MapView.Marker
                        key={ad._id}
                        coordinate={{
                           latitude: ad.location[0],
                           longitude: ad.location[1],
                        }}
                     />
                  );
               })} */}
            </MapView>
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
   mapContainer: {
      flex: 1,
   },
   deniedMain: {
      textAlign: "center",
      fontSize: 22,
      color: red,
      fontWeight: "700",
      paddingHorizontal: "5%",
      marginBottom: 10,
   },
   deniedDetails: {
      textAlign: "center",
      fontSize: 16,
      color: regularGrey,
      paddingHorizontal: "5%",
   },
});

export default AroundMeScreen;
