import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { peticionGet } from "../../utilitis/getRequest";
import { loginstyle } from "../../styles/style";
import useUserStore from "../../components/context/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../styles/CompStyle";
import { Image } from 'expo-image';
const Reporets = () => {
  const { user, token } = useUserStore();
  const [data, setData] = useState([]);
  let idUser = user.login[0].id;

  const fetchData = async () => {
    try {
      const result = await peticionGet(`Multimedia/` + idUser, token);
      setData(result);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View style={{ with: "100%", backgroundColor: "#fff", flex: 1 }}>
      <FlatList
        style={{
          flexDirection: "column",
          width: "100%",
          padding: 20,
        }}
        data={data.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const fotoUrl = item.foto;
          const fechaCompleta = item.fecha;
          const fecha = fechaCompleta.split('T')[0];
          const hora = fechaCompleta.split('T')[1].split('.')[0];
          return (
            <View
              style={{
                marginVertical: 10,
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "5%",
                paddingBottom: "12%",
                gap: 10,
              }}
            >
              {fotoUrl ? (
                <Image
                  source={{ uri: fotoUrl }}
                  style={{
                    ...loginstyle.logos,
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    elevation: 10,
                    borderWidth: 8,
                    borderColor: "#fff9",
                  }}
                  contentFit="cover"
                />
              ) : (
                <Text>No hay imagen disponible</Text>
              )}
              <TouchableOpacity
                style={{ width: 350, color: colors.CC, backgroundColor: "#f2f2f2", padding: 22 }}
              >
                <Text style={{ color: colors.CC, fontWeight: "bold" }}>Fecha: {fecha}</Text>
                <Text style={{ color: colors.CC, fontWeight: "bold" }}>Hora: {hora}</Text>
                <Text style={{ color: colors.CC, fontWeight: "bold" }}>Nombre: {item.usuario.nombre}</Text>
                <Text style={{ color: colors.CC, fontWeight: "bold" }}>Apellido: {item.usuario.apellido}</Text>
                <Text style={{ color: colors.CC, fontWeight: "bold" }}>Ubicación longitud : {item.longitud}</Text>
                <Text style={{ color: colors.CC, fontWeight: "bold" }}>Ubicación latidud: {item.latitud}</Text>
              </TouchableOpacity>
            </View>
          );
        }}

      />
    </View>
  );
};

export default Reporets;
