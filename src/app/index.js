import React, { useEffect, useState } from "react";
import Login from "./login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreens from "./home";
import Carga from "./carga";
import { router } from "expo-router";
import useUserStore from "../components/context/UserContext";

const Index = () => {
  const { updateUser, setToken } = useUserStore();
  const [state, setState] = useState("Cargando");
  const verificarCache = async () => {
    try {
      const cachedData = await AsyncStorage.getItem("userDataLogin");
      if (cachedData) {
        const user = JSON.parse(cachedData);
        console.log("llegando", user);
        updateUser(user);
        setToken(user.tokenLogauth);
        setState("Cargado");
      } else {
        setState("No encontrado");
      }
    } catch (error) {
      console.error("Error al obtener datos de caché:", error);
    }
  };
  useEffect(() => {
    verificarCache();
  }, []);

  if (state === "Cargado") {
    router.replace("/home");
  } else if (state === "No encontrado") {
    router.replace("/login");
  }
  return <Carga />;
};

export default Index;
