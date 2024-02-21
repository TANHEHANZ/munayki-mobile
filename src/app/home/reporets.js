import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { peticionGet } from "../../utilitis/getRequest";
import { loginstyle } from "../../styles/style";
import useUserStore from "../../components/context/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../styles/CompStyle";

const Reporets = () => {
  const user = useUserStore((state) => state.user);
  const [data, setData] = useState([]);
  let idUser = user.login[0].id;
  const tokenLoguet = user.tokenLogauth;
  const fetchData = async () => {
    try {
      const result = await peticionGet(`Multimedia/` + idUser ,tokenLoguet);
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
        renderItem={({ item }) => (
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
            {item.foto ? (
              <Image
                source={{ uri: item.foto }}
                style={{
                  ...loginstyle.logos,
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  elevation: 10,
                  borderWidth: 8,
                  borderColor: "#fff9",
                }}
              />
            ) : (
              <Text>No hay imagen disponible</Text>
            )}
            <TouchableOpacity
              style={{ width: 350, color: colors.CC ,backgroundColor:"#f2f2f2",padding:22 }}
            >
              <Text style={{color: colors.CC ,fontWeight:"bold"}}>fecha: {item.fecha}</Text>
              <Text style={{color: colors.CC ,fontWeight:"bold"}}>Nombre: {item.usuario.nombre}</Text>
              <Text style={{color: colors.CC ,fontWeight:"bold"}}>Apellido: {item.usuario.apellido}</Text>
              <Text style={{color: colors.CC ,fontWeight:"bold"}}>Ubicación longitud : {item.longitud}</Text>
              <Text style={{color: colors.CC ,fontWeight:"bold"}}>Ubicación latidud: {item.latitud}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Reporets;
