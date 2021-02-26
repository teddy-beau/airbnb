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
   Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import axios from "axios";
import Constants from "expo-constants";
import { FontAwesome } from "@expo/vector-icons";
import MapView from "react-native-maps";
// Colors:
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white, yellow } = colors;
// Components:
import StarRating from "../components/StarRating";
import PhotoCarousel from "../components/PhotoCarousel";

const RoomScreen = () => {
   const navigation = useNavigation();
   const route = useRoute();
   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [clipDescription, setClipDescription] = useState(3);

   // Fetch data from API
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(
               `https://express-airbnb-api.herokuapp.com/rooms/${route.params.roomId}`
            );
            // console.log(response.data);
            setData(response.data);
            setIsLoading(false);
         } catch (error) {
            console.log(error.response);
         }
      };
      fetchData();
   }, []);

   return (
      <SafeAreaView style={styles.safeAreaView}>
         {isLoading ? (
            <View style={{ justifyContent: "center", height: "100%" }}>
               <ActivityIndicator color={red} />
            </View>
         ) : (
            <ScrollView style={styles.scrollView}>
               <PhotoCarousel photos={data.photos} />
               <Text style={styles.price}>{data.price} €</Text>
               <View style={styles.adDetails}>
                  <View style={styles.adDetailsTop}>
                     <View style={styles.adDetailsTextSection}>
                        <Text
                           style={styles.title}
                           ellipsizeMode="tail"
                           numberOfLines={1}
                        >
                           {data.title}
                        </Text>
                        <View style={styles.reviewsSection}>
                           <StarRating rating={data.ratingValue} />
                           <Text style={styles.rewiewsText}>
                              {data.reviews} reviews
                           </Text>
                        </View>
                     </View>
                     <Image
                        source={{ uri: data.user.account.photo.url }}
                        style={styles.userPhoto}
                     />
                  </View>
                  <Text
                     style={styles.adDetailsBottom}
                     ellipsizeMode="tail"
                     numberOfLines={clipDescription ? 3 : null}
                  >
                     {data.description}
                  </Text>
                  <TouchableOpacity
                     activeOpacity={0.5}
                     onPress={() => {
                        setClipDescription(!clipDescription);
                     }}
                  >
                     {clipDescription ? (
                        <Text style={styles.showMore}>
                           Show more{"  "}
                           <FontAwesome
                              name="caret-down"
                              size={16}
                              color={lightGrey}
                              style={{
                                 alignSelf: "flex-end",
                              }}
                           />
                        </Text>
                     ) : (
                        <Text style={styles.showMore}>
                           Show less{"  "}
                           <FontAwesome
                              name="caret-up"
                              size={16}
                              color={lightGrey}
                           />
                        </Text>
                     )}
                  </TouchableOpacity>
               </View>
               <MapView
                  initialRegion={{
                     latitude: data.location[1],
                     longitude: data.location[0],
                     latitudeDelta: 0.01,
                     longitudeDelta: 0.01,
                  }}
                  showsUserLocation={true}
                  style={styles.map}
               >
                  <MapView.Marker
                     coordinate={{
                        latitude: data.location[1],
                        longitude: data.location[0],
                     }}
                  />
               </MapView>
            </ScrollView>
         )}
      </SafeAreaView>
   );
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
   safeAreaView: {
      // marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      height: "100%",
      backgroundColor: white,
   },
   scrollView: {},
   image: {
      width: width,
      height: 280,
   },
   price: {
      position: "absolute",
      top: 210,
      paddingVertical: 12,
      paddingHorizontal: "5%",
      backgroundColor: "#000000",
      color: white,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "300",
   },
   adDetails: {
      paddingHorizontal: "5%",
      marginBottom: 24,
   },
   adDetailsTop: {
      marginTop: 12,
      flexDirection: "row",
   },
   adDetailsBottom: {
      marginTop: 12,
      fontSize: 16,
      color: darkGrey,
   },
   showMore: {
      color: lightGrey,
      fontSize: 16,
      marginTop: 6,
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
   map: { flex: 1, height: 300 },
});

export default RoomScreen;
