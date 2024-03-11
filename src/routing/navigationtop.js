import { View, Image } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../styles/CompStyle";
import { router } from "expo-router";
import useUserStore from "../components/context/UserContext";
import { peticionDelete } from "../utilitis/deleteRequest";


import { loginstyle } from "../styles/style";


export const handleUpdate = async (tokenLoguet, clearAsyncStorage) => {
  const res = await peticionDelete(
    "logaut",
    tokenLoguet
  );
  console.log(res);
  res &&
    res.message === "Token de notificación eliminada correctamente"
    ? (clearAsyncStorage(), router.replace("/login"), alert("Secion cerrada"))
    : alert(res.message);
};
const Navigation = () => {
  const { clearAsyncStorage, token } = useUserStore();

  const salir = async () => {
    if (token) {
      await handleUpdate(token, clearAsyncStorage);
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
        position: "relative"
      }}
    >
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
