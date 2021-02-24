import React from "react";
import { Entypo } from "@expo/vector-icons";
// Colors
import colors from "../assets/colors";
const { red, regularGrey, lightGrey, darkGrey, white, yellow } = colors;

const StarRating = (rating) => {
   let stars = [];
   for (let i = 0; i < 5; i++) {
      if (i < Number(rating.rating)) {
         stars.push(yellow);
      } else {
         stars.push(lightGrey);
      }
   }
   return stars.map((e, index) => {
      return (
         <Entypo
            name="star"
            size={22}
            color={e}
            key={index}
            style={{ marginRight: 5 }}
         />
      );
   });
};

export default StarRating;
