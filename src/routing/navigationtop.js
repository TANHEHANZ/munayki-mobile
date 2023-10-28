import { View, Text } from "react-native";
import React from "react";
import { colors } from "../styles/CompStyle";
import { Image } from "react-native";

const Navigation = () => {
  return (
    <View style={{ height: 60, backgroundColor: colors.CC , justifyContent:"center", alignItems:"center",flexDirection:"row",gap:50,}}>
      <Text style={{color:"#fff",}}>Hola ususario  bienvenido! </Text>
      <Image
          source={require("../../assets/LOGOS/logo_Unifranz.png")}
          style={{width:140 , height:50}}
        />
    </View>
  );
};

export default Navigation;
