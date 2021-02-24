import React from "react";
import { StyleSheet, Image } from "react-native";

const Logo = ({ width, height }) => {
   const styles = StyleSheet.create({
      logo: {
         width: width ? width : 100,
         height: height ? height : 150,
      },
   });

   return (
      <Image
         style={styles.logo}
         source={require("../assets/logo.png")}
         resizeMode={"contain"}
      />
   );
};

export default Logo;
