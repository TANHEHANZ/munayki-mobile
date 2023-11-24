import { View, Text, FlatList, Image} from "react-native";
import React, { useEffect, useState } from "react";
import { peticionGet } from "../../utilitis/getRequest";
import { loginstyle } from "../../styles/style";
import useUserStore from "../../components/context/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const Reporets = () => {
  const user = useUserStore((state) => state.user);
  const [data, setData] = useState([]);
  let idUser = user.data.id;
  const fetchData = async () => {
    try {
      const result = await peticionGet(`Multimedia/` + idUser);
      setData(result);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
      <View style={{with:"100%",backgroundColor:"#fff", flex:1 }}>
        <FlatList
          style={{
            flexDirection: "column",
            width: '100%',
            padding: 20,
          }}
          data={data.data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: 10,
                width: 355,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: '5%',
                paddingBottom:'12%'
              }}
            >
                {item.foto ? (
                  <Image
                    source={{ uri: item.foto }}
                    style={{ ...loginstyle.logos, width: 100, height: 100 }}
                  />
                ) : (
                  <Text>No hay imagen disponible</Text>
                )}
              <TouchableOpacity style={{width:"70%"}}>
              <Text>fecha: {item.fecha}</Text>
                <Text>Nombre: {item.usuario.nombre}</Text>
                <Text>Apellido: {item.usuario.apellido}</Text>
                <Text>Ubicación longitud : {item.longitud}</Text>
                <Text>Ubicación latidud: {item.latitud}</Text>
              </TouchableOpacity>
              </View>
          )}
        />
      </View>
   
  );
};

export default Reporets;
