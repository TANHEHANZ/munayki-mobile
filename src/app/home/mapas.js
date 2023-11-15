import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Picker } from "@react-native-picker/picker";
import { loginstyle, mapButton } from "../../styles/style";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import useLocationStore from "../../components/context/UbicacionContext";
const mapas = () => {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");

  const setLocation = useLocationStore((state) => state.setLocation);
  const location = useLocationStore((state) => state.location);
  const handleVerMapa = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origen}&destination=${destino}&travelmode=walking`;
    Linking.openURL(googleMapsUrl);
  };
  const handleMapDirect = (destino) => {
    if (location) {
      const { latitude, longitude } = location.coords;
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destino}&travelmode=walking`;
      Linking.openURL(googleMapsUrl);
    }
  };

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
    <View
      style={{ padding: 20, flexDirection: "row", flexWrap: "wrap", gap: 20 }}
    >
      <Text style={{ fontSize: 18 }}>Ubicaciones ayuda mas cercana </Text>
      <Text style={{ fontSize: 14 }}>
        Ingrese tu direccion o punto de partida
      </Text>
      <TextInput
        placeholder="partida"
        style={{ borderBottomWidth: 1, width: "100%" }}
        value={origen}
        onChangeText={(text) => setOrigen(text)}
      />

      <Text style={{ fontSize: 14 }}> Escoga punto de llegada</Text>

      <Picker
        selectedValue={destino}
        onValueChange={(itemValue) => setDestino(itemValue)}
        style={{ width: "100%", elevation: 10, marginBottom: 10 }}
      >
        <Picker.Item label="SLIM" value="slim_area_de_muejers" />
        <Picker.Item label="FELCC" value="FELCC " />
        <Picker.Item label="FELCN" value="FELCN" />
      </Picker>

      <TouchableOpacity style={loginstyle.button} onPress={handleVerMapa}>
        <Text>Trazar mapa </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 14 }}> Accesos rapidos</Text>

      <View style={mapButton.map}>
        <FontAwesome name="map" size={30} color="rgb(73,39,121)" />
        <Text>Slim mas cercano</Text>
        <TouchableOpacity
          style={mapButton.button}
          onPress={() => {
            handleMapDirect("Slim_area_de_muejeres");
          }}
        >
          <Text> ver mapa </Text>
        </TouchableOpacity>
      </View>
      <View style={mapButton.map}>
        <FontAwesome name="map" size={30} color="rgb(73,39,121)" />
        <Text>FELCN mas cercano</Text>
        <TouchableOpacity
          style={mapButton.button}
          onPress={() => {
            handleMapDirect("Fuerza Especial de Lucha Contra el Narcotráfico (FELCN)");
          }}
        >
          <Text> ver mapa </Text>
        </TouchableOpacity>
      </View>
      <View style={mapButton.map}>
        <FontAwesome name="map" size={30} color="rgb(73,39,121)" />
        <Text>FELCC mas cercano</Text>
        <TouchableOpacity
          style={mapButton.button}
          onPress={() => {
            handleMapDirect(
              "FUERZA ESPECIAL DE LUCHA CONTRA EL CRIMEN (FELCC)"
            );
          }}
        >
          <Text> ver mapa </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default mapas;
