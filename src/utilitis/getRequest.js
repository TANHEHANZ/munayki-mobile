import { http } from "./http";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const peticionGet = async (url) => {
  const response = await fetch(http + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (response.ok) {
    const json = await response.json();
    await AsyncStorage.setItem(http + url, JSON.stringify(json));
    const cachedData = await AsyncStorage.getItem(http + url);

    console.log("datos enviados a cache ", JSON.parse(cachedData));
    return json;
  }
  return null;
};

export const getRequestWithCache = async (url) => {
  try {
    const cachedData = await AsyncStorage.getItem(http + url);
    if (cachedData !== null) {
      console.log("datos de caché");
      return JSON.parse(cachedData);
    }
    await peticionGet(url);
  } catch (error) {
    console.error("Error al obtener datos de caché:", error);
    throw error;
  }
};
