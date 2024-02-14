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
    return json;
  }
  return null;
};

export const getRequestWithCache = async (url) => {
  try {
    const cachedData = await AsyncStorage.getItem(http + url);
    if (cachedData !== null) {
      console.log("retorna datos desde el cache", cachedData);
      return JSON.parse(cachedData);
    } else {
      const response = await fetch(http + url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();

      await AsyncStorage.setItem(http + url, JSON.stringify(data));
      console.log("peticion de la api", data);
      return data;
    }
  } catch (error) {
    console.error("Error al obtener datos de caché:", error);
    throw error;
  }
};

// const getCacheKey = await AsyncStorage.getAllKeys();
// console.log(getCacheKey);
