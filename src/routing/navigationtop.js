import { View, Text } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../styles/CompStyle";
import { router } from "expo-router";
import useUserStore from "../components/context/UserContext";
import { peticionDelete } from "../utilitis/deleteRequest";

export const handleUpdate = async (id) => {
  const res = await peticionDelete("tokenNot/" + id);
  res && res.message === "Token de notificación eliminada correctamente"
    ? (router.replace("/login"), alert("Secion cerrada"))
    : alert(res.message);
};

const Navigation = () => {
  const user = useUserStore((state) => state.user);
  const idUser = +user.login[0].id;
  const salir = async () => {
    await handleUpdate(idUser);
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
      }}
    >
      <Text style={{ color: colors.CC }}>
        Bienvenido{" "}
        <Text style={{ fontSize: 15, fontWeight: 700 }}>
          {" "}
          {user?.login[0]?.nombre || "Invitado"}
        </Text>
      </Text>

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
