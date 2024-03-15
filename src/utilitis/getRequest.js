import { http } from "./http";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const peticionGet = async (url, tokenLoguet) => {
  const response = await fetch(http + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: tokenLoguet ? tokenLoguet : "",
    },
  });
  console.log(response);
  if (response.ok) {
    const json = await response.json();
      await AsyncStorage.setItem(url, JSON.stringify(json));
      const cachedData = await AsyncStorage.getItem(url);
      console.log("datos enviados a cache ", JSON.parse(cachedData));
    return json;
  }
  return response;
};

export const getRequestWithCache = async (url, tokenLoguet) => {
  try {
    const cachedData = await AsyncStorage.getItem(url);
    if (cachedData !== null) {
      return JSON.parse(cachedData);
    }
    await peticionGet(url, tokenLoguet);
  } catch (error) {
    console.error("Error al obtener datos de caché:", error);
    throw error;
  }
};
