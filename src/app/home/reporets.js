import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { peticionGet } from "../../utilitis/getRequest";
import { loginstyle } from "../../styles/style";

const Reporets = () => {
  const [data, setData] = useState("");

  const fetchData = async () => {
    try {
      const result = await peticionGet(`Multimedia`);
      setData(result);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data.foto);
  return (
    <View>
      <Text>
        <FlatList
          style={{
            flexDirection: "row",
            gap: 5,
            width: 400,
            flexWrap: "wrap",
            padding: 20,
          }}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#0005",
                marginVertical: 10,
                width: 355,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <View>
                {item.foto ? (
                  <Image
                    source={{ uri: item.foto }}
                    style={{ ...loginstyle.logos, width: 200, height: 80 }}
                  />
                ) : (
                  <Text>No hay imagen disponible</Text>
                )}
                <Text>fecha: {item.fecha}</Text>
                <Text>usuario: {item.usuario.nombre}</Text>
                <Text>apellido: {item.usuario.apellido}</Text>
                <Text>ubicación lomgitud : {item.ubicacion.longitud}</Text>
                <Text>ubicación latidud: {item.ubicacion.latitud}</Text>
              </View>
            </View>
          )}
        />
      </Text>
    </View>
  );
};

export default Reporets;
