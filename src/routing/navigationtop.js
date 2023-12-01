import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { colors } from "../styles/CompStyle";
import { router } from "expo-router";
import useUserStore from "../components/context/UserContext";

const Navigation = () => {


  const user = useUserStore((state) => state.user);
 
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
      <Text style={{ color:colors.CC }}>
        Bienvenido <Text  style={{fontSize:15,fontWeight:700}}> {user?.data?.nombre || "Invitado"}</Text>
      </Text>
  
     <View style={{flexDirection:"row",gap:10}}>
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
        onPress={() => router.replace("/login")}
      />
     </View>
    </View>
  );
};

export default Navigation;
