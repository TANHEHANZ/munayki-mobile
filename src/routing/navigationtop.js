import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Navigation = () => {
  return (
    <View
      style={{
        height: 70,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 2,
        padding:20,
        borderBottomColor: "#0002",
      }}
    >
      <Text style={{ color: "#000" }}>Hola hanz bienvenido! </Text>
      {/* <Image
        source={require("../../assets/fondo/munayki.png")}
        style={{ width: 100, height:50 }}
      /> */}
        <FontAwesome name="user" size={30} color="rgb(73,39,121)" />

    </View>
  );
};

export default Navigation;
