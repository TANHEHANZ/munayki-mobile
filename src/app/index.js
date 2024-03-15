import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Carga from "./carga";
import { router } from "expo-router";
import NotificationComponent from "../components/permisos/camera";

const Index = () => {

  const [state, setState] = useState("Cargando");

  const verificarCache = async () => {
    try {
      const cachedData = await AsyncStorage.getItem("userData");
      if (cachedData) {
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
  return (
    <>
      <Carga />
    </>

  );
};

export default Index;
