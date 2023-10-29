import { Image, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";
import { colors } from "../styles/CompStyle";
import { router } from "expo-router";
import { nav } from "../styles/style";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Nav = () => {
  return (
    <View style={nav.contenedor}>
      <TouchableOpacity onPress={() => router.push("/home")} style={nav.icons}>
        <FontAwesome name="home" size={30} color={"rgb(73,39,121)"} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/home/informativa")}
        style={nav.icons}
      >
        <FontAwesome name="info" size={30} color="rgb(73,39,121)" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/home/panico")}
        style={nav.button}
      >
        <FontAwesome
          name="circle"
          size={30}
          color="rgb(73,39,121)"
          style={{
            width: 52,
            height: 52,
            borderWidth: 2,
            borderRadius: 100,
            padding: 11,
            paddingLeft: 13,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/home/mapas")}
        style={nav.icons}
      >
        <FontAwesome name="map-marker" size={30} color="rgb(73,39,121)" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/home/contactos")}
        style={nav.icons}
      >
        <FontAwesome name="address-book" size={30} color="#rgb(73,39,121)" />
      </TouchableOpacity>
    </View>
  );
};

export default Nav;
