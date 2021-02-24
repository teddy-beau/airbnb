// Packages
import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   Image,
   Text,
   View,
   FlatList,
   ActivityIndicator,
   TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
// Colors
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white } = colors;
// Components:
import StarRating from "./StarRating";

const AdList = () => {
   const navigation = useNavigation();

   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(
               "https://express-airbnb-api.herokuapp.com/rooms"
            );
            // console.log(response.data[0]);
            setData(response.data);
            setIsLoading(false);
         } catch (error) {
            console.log(error.response);
         }
      };
      fetchData();
   }, []);

   return (
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
                  <ActivityIndicator color={red} />
               </View>
            ) : (
               <TouchableOpacity
                  activeOpacity="0.5"
                  onPress={() => navigation.navigate("Room")}
               >
                  <Image
                     source={{ uri: item.photos[index].url }}
                     style={styles.image}
                  />
                  <Text style={styles.price}>{item.price} €</Text>
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
   );
};

const styles = StyleSheet.create({
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

export default AdList;
