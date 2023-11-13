import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Picker } from "@react-native-picker/picker";
import { loginstyle, mapButton } from "../../styles/style";
const mapas = () => {
  const [selectedValue, setSelectedValue] = useState("item1");

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
      />

      <Text style={{ fontSize: 14 }}> Escoga punto de llegada</Text>

      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        style={{ width: "100%", elevation: 10, marginBottom: 10 }}
      >
        <Picker.Item label="Item 1" value="item1" />
        <Picker.Item label="Item 2" value="item2" />
        <Picker.Item label="Item 3" value="item3" />
      </Picker>

      <TouchableOpacity style={loginstyle.button}>
        <Text>Ver mapa </Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 14 }}> Accesos rapidos</Text>

      <View style={mapButton.map}>
        <FontAwesome name="map" size={30} color="rgb(73,39,121)" />
        <Text>Slim mas cercano</Text>
        <TouchableOpacity style={mapButton.button}>
          <Text> ver mapa </Text>
        </TouchableOpacity>
      </View>
      <View style={mapButton.map}>
        <FontAwesome name="map" size={30} color="rgb(73,39,121)" />
        <Text>Fcc mas cercano</Text>
        <TouchableOpacity style={mapButton.button}>
          <Text> ver mapa </Text>
        </TouchableOpacity>
      </View>
      <View style={mapButton.map}>
        <FontAwesome name="map" size={30} color="rgb(73,39,121)" />
        <Text>Fcn mas cercano</Text>
        <TouchableOpacity style={mapButton.button}>
          <Text> ver mapa </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default mapas;
