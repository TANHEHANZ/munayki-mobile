import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../styles/CompStyle";
import { router } from "expo-router";

const Navigation = () => {
  return (
    <View
      style={{
        height: 70,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 2,
        padding: 20,
        backgroundColor: colors.primary,
        borderBottomColor: "#0002",
      }}
    >
      <Text style={{ color: "#000" }}>Hola hanz bienvenido! </Text>
      {/* <Image
        source={require("../../assets/fondo/munayki.png")}
        style={{ width: 100, height:50 }}
      /> */}
      <FontAwesome
        name="cog"
        size={30}
        color="rgb(73,39,121)"
        onPress={() => router.push("/home/config")}
      />
      <FontAwesome
        name="map"
        size={30}
        color="rgb(73,39,121)"
        onPress={() => router.push("/home/componentsMaps")}
      />
    </View>
  );
};

export default Navigation;
