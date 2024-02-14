// LocationComponent.js
import { useEffect } from "react";
import useLocationStore from "../context/UbicacionContext";
import * as Location from "expo-location";

const LocationComponent = () => {
  const setLocation = useLocationStore((state) => state.setLocation);

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permiso de ubicación no otorgado");
        return;
      }
      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);
      console.log("Pedir Permisos", locationData);
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  return null;
};

export default LocationComponent;
