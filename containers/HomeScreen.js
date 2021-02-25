// Packages:
import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   Image,
   ImageBackground,
   Text,
   View,
   FlatList,
   ActivityIndicator,
   TouchableOpacity,
   SafeAreaView,
   ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import Constants from "expo-constants";
// Colors:
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white, yellow } = colors;
// Components:
import StarRating from "../components/StarRating";

const HomeScreen = () => {
   const navigation = useNavigation();
   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   // Fetch data from API
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(
               "https://express-airbnb-api.herokuapp.com/rooms"
            );
            setData(response.data);
            setIsLoading(false);
         } catch (error) {
            console.log(error.response);
         }
      };
      fetchData();
   }, []);

   return (
      <SafeAreaView style={styles.screenContainer}>
         <FlatList
            style={styles.flatListContainer}
            data={data}
            keyExtractor={(item) => String(item._id)}
            ItemSeparatorComponent={() => {
               return <View style={styles.separator} />;
            }}
            renderItem={({ item, index }) =>
               isLoading ? (
                  <View>
                     <ActivityIndicator
                        color={red}
                        style={{ justifyContent: "center", height: 210 }}
                     />
                  </View>
               ) : (
                  <TouchableOpacity
                     activeOpacity="0.5"
                     style={{ paddingTop: 12 }}
                     onPress={() =>
                        navigation.navigate("Room", { roomId: item._id })
                     }
                  >
                     <ImageBackground
                        source={{ uri: item.photos[index].url }}
                        style={styles.image}
                     >
                        <Text style={styles.price}>{item.price} €</Text>
                     </ImageBackground>
                     <View style={styles.adDetails}>
                        <View style={styles.adDetailsTextSection}>
                           <Text
                              style={styles.title}
                              ellipsizeMode="tail"
                              numberOfLines={1}
                           >
                              {item.title}
                           </Text>
                           <View style={styles.reviewsSection}>
                              <StarRating rating={item.ratingValue} />
                              <Text style={styles.rewiewsText}>
                                 {item.reviews} reviews
                              </Text>
                           </View>
                        </View>
                        <Image
                           source={{ uri: item.user.account.photo.url }}
                           style={styles.userPhoto}
                        />
                     </View>
                  </TouchableOpacity>
               )
            }
         />
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
   screenContainer: {
      // marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      height: "100%",
      backgroundColor: white,
   },
   flatListContainer: {
      paddingHorizontal: "5%",
   },
   separator: {
      borderBottomWidth: 1,
      borderBottomColor: lightGrey,
      marginBottom: 16,
   },
   image: {
      width: "100%",
      height: 210,
   },
   price: {
      marginTop: 150,
      alignSelf: "flex-start",
      height: 50,
      paddingVertical: 12,
      paddingHorizontal: "5%",
      backgroundColor: "#000000",
      color: white,
      textAlign: "center",
      fontSize: 20,
      fontWeight: "300",
   },
   adDetails: {
      marginVertical: 12,
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

export default HomeScreen;
