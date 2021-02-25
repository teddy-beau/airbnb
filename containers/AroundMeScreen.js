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
   ScrollView,
   Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import Constants from "expo-constants";
import * as Location from "expo-location";
import MapView, { Callout } from "react-native-maps";
// Colors:
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white, yellow } = colors;
// Components:

const AroundMeScreen = () => {
   const navigation = useNavigation();
   // const [error, setError] = useState();
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
            try {
               const response = await axios.get(
                  `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${userCoords.latitude}&longitude=${userCoords.longitude}`
               );
               setData(response.data);
               // console.log("data", data);
            } catch (error) {
               console.log(error.response);
            }
         } else {
            // setError(true);
            Alert.alert(
               `Geolocation deactivated`,
               `The following ads won't be based on your location. You can allow geolocation in your device's settings at any time for a better experience.`
            );
            try {
               const response = await axios.get(
                  `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${userCoords.latitude}&longitude=${userCoords.longitude}`
               );
               setData(response.data);
               // console.log("data", data);
            } catch (error) {
               console.log(error.response);
            }
         }

         setIsLoading(false);
      };
      askPermission();
   }, []);

   return (
      <SafeAreaView style={styles.screenContainer}>
         {isLoading ? (
            <View style={{ justifyContent: "center", height: "100%" }}>
               <ActivityIndicator color={red} />
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
               {data.map((ad) => {
                  // console.log(ad);
                  return (
                     <MapView.Marker
                        key={ad._id}
                        coordinate={{
                           latitude: ad.location[1],
                           longitude: ad.location[0],
                        }}
                        // title={ad.title}
                        // onPress={() =>
                        //    navigation.navigate("Room", { roomId: ad._id })
                        // }
                     >
                        <Callout
                           style={styles.callout}
                           onPress={() =>
                              navigation.navigate("Room", { roomId: ad._id })
                           }
                        >
                           <Image
                              style={styles.calloutImage}
                              source={{ uri: ad.photos[0].url }}
                           />
                           <Text
                              style={styles.calloutText}
                              ellipsizeMode="tail"
                              numberOfLines={2}
                           >
                              {ad.title}
                           </Text>
                        </Callout>
                     </MapView.Marker>
                  );
               })}
            </MapView>
         )}
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   screenContainer: {
      // marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      height: "100%",
      width: "100%",
      backgroundColor: white,
   },
   scrollView: {
      // marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      // backgroundColor: "#1A1A1A",
      height: "100%",
      width: "100%",
   },
   mapContainer: {
      flex: 1,
      height: "100%",
   },
   callout: {
      width: 150,
      height: 150,
   },
   calloutText: {
      marginVertical: 10,
      textAlign: "center",
      fontSize: 16,
   },
   calloutImage: {
      width: "100%",
      height: 100,
   },
});

export default AroundMeScreen;
