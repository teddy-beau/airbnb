import React from "react";
import { Image, Dimensions, StyleSheet, View } from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const PhotoCarousel = ({ photos }) => {
   return (
      <View style={styles.container}>
         <SwiperFlatList
            autoplay
            autoplayDelay={2}
            index={0}
            showPagination={false}
            data={photos}
            renderItem={({ item }) => (
               <View style={styles.child}>
                  <Image source={{ uri: item.url }} style={styles.image} />
               </View>
            )}
         />
      </View>
   );
};
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
   container: { flex: 1, height: 280 },
   child: { width: width, justifyContent: "center" },
   image: {
      width: "100%",
      height: "100%",
   },
});

export default PhotoCarousel;
