// Packages:
import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   Text,
   View,
   ActivityIndicator,
   SafeAreaView,
   Alert,
   ImageBackground,
   Dimensions,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import * as Location from "expo-location";
import MapView, { Callout } from "react-native-maps";

// Colors:
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white, yellow } = colors;

const AroundMeScreen = ({ navigation }) => {
   const [data, setData] = useState();
   const [userCoords, setUserCoords] = useState({
      latitude: 48.856614,
      longitude: 2.3522219,
   });
   const [isLoading, setIsLoading] = useState(true);

   // Request to use user location:
   useEffect(() => {
      const askPermission = async () => {
         try {
            // Request access to geolocation:
            const { status } = await Location.requestPermissionsAsync();

            // Will receive the data from requests:
            let response;

            if (status === "granted") {
               // Request user's coordinates:
               const location = await Location.getCurrentPositionAsync();

               setUserCoords({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
               });

               response = await axios.get(
                  `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${userCoords.latitude}&longitude=${userCoords.longitude}`
               );
            } else {
               Alert.alert(
                  `Geolocation deactivated`,
                  `The following ads won't be based on your location. You can allow geolocation in your device's settings at any time for a better experience.`
               );

               response = await axios.get(
                  `https://express-airbnb-api.herokuapp.com/rooms/around`
               );
            }
            let tab = [];
            for (let i = 0; i < response.data.length; i++) {
               tab.push({
                  latitude: response.data[i].location[1],
                  longitude: response.data[i].location[0],
                  _id: response.data[i]._id,
                  photo: response.data[i].photos[0].url,
                  title: response.data[i].title,
                  price: response.data[i].price,
               });
            }
            setData(tab);
            setIsLoading(false);
         } catch (error) {
            alert("An error occured!");
            console.log(error.response);
         }
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
                  return (
                     <MapView.Marker
                        key={ad._id}
                        coordinate={{
                           latitude: ad.latitude,
                           longitude: ad.longitude,
                        }}
                        image={require("../assets/pin.png")}
                     >
                        <Callout
                           style={styles.callout}
                           onPress={() =>
                              navigation.navigate("Room", { roomId: ad._id })
                           }
                        >
                           <ImageBackground
                              style={styles.calloutImage}
                              source={{ uri: ad.photo }}
                           >
                              <Text style={styles.price}>{ad.price} €</Text>
                           </ImageBackground>
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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
   screenContainer: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      height: "100%",
      width: width,
      backgroundColor: white,
   },
   scrollView: {
      height: "100%",
      width: width,
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
      fontSize: 15,
   },
   calloutImage: {
      width: "100%",
      height: 100,
   },
   price: {
      marginTop: 10,
      alignSelf: "flex-start",
      paddingVertical: 4,
      paddingHorizontal: "5%",
      backgroundColor: "#000000",
      color: white,
      textAlign: "center",
      fontSize: 15,
      fontWeight: "600",
   },
});

export default AroundMeScreen;
