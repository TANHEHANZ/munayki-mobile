import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { peticionGet } from "../../utilitis/getRequest";
import useUserStore from "../../components/context/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { peticionDelete } from "../../utilitis/deleteRequest";

const Contactuser = () => {
  const [data, setData] = useState("");
  const user = useUserStore((state) => state.user);

  let userData = user.data.id;

  const handleDelete = async (userId, contactId) => {
    const res = await peticionDelete(`user/${userId}/contacts/${contactId}`);
    alert(res.message);
    fetchData();
  };
  const fetchData = async () => {
    try {
      const result = await peticionGet(`user/${userData}/contacts`);
      setData(result);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Contactuser</Text>
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
              <Text>Nombre: {item.nombre}</Text>
              <Text>Apellido: {item.apellido}</Text>
              <Text>Edad: {item.edad}</Text>
              <Text>Telefono: {item.telefono}</Text>
            </View>
            <Text>Relacion: {item.relacion}</Text>
            <TouchableOpacity onPress={() => handleDelete(userData, item.id)}>
              <Text>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Contactuser;
