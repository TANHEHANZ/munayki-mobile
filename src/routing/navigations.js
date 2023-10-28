import { Text, View } from "react-native";
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
        style={{
          ...nav.icons,
          width: 100,
          height: 100,
          //   backgroundColor: colors.primary,
        }}
      >
        <FontAwesome name="circle" size={30} color="rgb(73,39,121)" />
    
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/home/mapas")}
        style={nav.icons}
      >
        <FontAwesome name="user" size={30} color="rgb(73,39,121)" />
      
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/home/contactos")}
        style={nav.icons}
      >
        <FontAwesome name="user" size={30} color="#rgb(73,39,121)" />
     
      </TouchableOpacity>
    </View>
  );
};

export default Nav;
