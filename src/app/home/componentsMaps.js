import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import * as Location from "expo-location";

const ComponentsMaps = () => {
  const [location, setLocation] = useState("");

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permiso de ubicación no otorgado");
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  return (
    <View>
      {location && (
        <View>
          <Text>Latitud: {location.coords.latitude}</Text>
          <Text>Longitud: {location.coords.longitude}</Text>
        </View>
      )}

      <Button title="Obtener Ubicación" onPress={getLocationAsync} />
    </View>
  );
};

export default ComponentsMaps;
