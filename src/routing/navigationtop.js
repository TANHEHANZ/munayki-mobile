import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../styles/CompStyle";
import { router } from "expo-router";
import useUserStore from "../components/context/UserContext";
import { peticionDelete } from "../utilitis/deleteRequest";
import { peticionPost } from "../utilitis/postRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginstyle } from "../styles/style";

const handdleDeleteData = async () => {
  await AsyncStorage.removeItem("userDataLogin");
  console.log("Elemento eliminado de la caché correctamente");
};
export const handleUpdate = async (id, tokenLoguet) => {
  const res = await peticionDelete("tokenNot/" + id, tokenLoguet);
  const ress = await peticionPost(
    "logout",
    { token: tokenLoguet },
    "POST",
    tokenLoguet
  );
  console.log(res, ress);
  res &&
  res.message === "Token de notificación eliminada correctamente" &&
  ress.message === "Token eliminado correctamente"
    ? (handdleDeleteData(), router.replace("/login"), alert("Secion cerrada"))
    : alert(res.message);
};
const Navigation = () => {
  const { user, token } = useUserStore();
  const tokenLoguet = token;
  console.log(tokenLoguet);
  let idUser = user.login[0].id ? user.login[0].id : null;
  const salir = async () => {
    if (idUser) {
      await handleUpdate(idUser, tokenLoguet);
    } else {
      console.log(
        "No se puede cerrar sesión porque no hay un ID de usuario válido"
      );
    }
  };
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
        position:"relative"
      }}
    >
    {/* <View  style={{position:"absolute",left:"50%" ,top:40}}>
    <FontAwesome
          name="heart"
          size={40}
          color="rgb(73,39,121)"
          onPress={() => salir()}
        />
    </View> */}
      <Image
        source={require("../../assets/fondo/logoA.png")}
        style={{ ...loginstyle.logos, width: 120, height: 40 }}
      />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <FontAwesome
          name="cog"
          size={30}
          color="rgb(73,39,121)"
          onPress={() => router.push("/home/config")}
        />

        <FontAwesome
          name="sign-in"
          size={30}
          color="rgb(73,39,121)"
          onPress={() => salir()}
        />
      </View>
    </View>
  );
};

export default Navigation;
