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
      style={{ padding: 20, flexDirection: "row", flexWrap: "wrap", gap: 11 }}
    >
      <Text style={{ fontSize: 18 }}>Ubicaciones ayuda mas cercana </Text>
      <Text style={{ fontSize: 14 }}>Ingrese un punto de partida</Text>
      <TextInput
        placeholder="partida"
        style={{ borderBottomWidth: 1, width: "100%" }}
        value={origen}
        onChangeText={(text) => setOrigen(text)}
      />

      <Text style={{ fontSize: 14 }}> Elija punto de llegada</Text>

      <Picker
        selectedValue={destino}
        onValueChange={(itemValue) => setDestino(itemValue)}
        style={{ width: "100%", elevation: 10, marginBottom: 10 }}
      >
        <Picker.Item label="SLIM - epi sur" value="EPI SUR slim" />
        <Picker.Item label="SLIM - DISTRITO 14 " value="SLIM - DISTRITO 14 " />
        <Picker.Item
          label="SLIM - PUNTO ADELA ZAMUDIO"
          value=" PUNTO ADELA ZAMUDIO"
        />
        <Picker.Item
          label="SLIM - SI ALEJO CALATAYUD"
          value="SLIM - SI ALEJO CALATAYUD"
        />
        <Picker.Item label="SLIM - JAIHUAYCO" value="SLIM-JAIHUAYCO" />
        <Picker.Item label="SLIM - EPI NORTE" value="SLIM-EPI NORTE" />
        <Picker.Item label="SLIM - ITOCTA" value="SLIM-ITOCTA" />
        <Picker.Item label="SLIM - PALTA ORKO" value="SLIM-PALTA ORKO" />
        <Picker.Item label="SLIM - JEFATURA" value="SLIM-JEFATURA" />
        <Picker.Item label="SLIM - OD.6" value="SLIM-OD.6" />
        <Picker.Item label="SLIM - D.7" value="SLIM-D.7" />
        <Picker.Item label="SLIM - VILLA MEXICO" value="SLIM-VILLA MEXICO" />
        <Picker.Item label="FLCV" value="FLCV COCHABAMBA" />
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
            handleMapDirect("SLIM - JAIHUAYCO");
          }}
        >
          <Text> ver mapa </Text>
        </TouchableOpacity>
      </View>
      <View style={mapButton.map}>
        <FontAwesome name="map" size={30} color="rgb(73,39,121)" />
        <Text>FELCV mas cercano</Text>
        <TouchableOpacity
          style={mapButton.button}
          onPress={() => {
            handleMapDirect(
              " FELCV fuerza especial contra la violenica"
            );
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
