import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { peticionGet } from "../../utilitis/getRequest";
import useUserStore from "../../components/context/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { peticionDelete } from "../../utilitis/deleteRequest";
import { colors, sharedStyles } from "../../styles/CompStyle";
import { dangerButton, contactStyle } from "../../styles/style";


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
      <Text style={{
        fontSize:30,
        color: colors.black,
        textAlign: "center",
        width: "100%",
        padding: "2%",
      }}>Contactos</Text>
      <FlatList
        style={{
          flexDirection: "row",
          gap: 5,
          width: '96%',
          flexWrap: "wrap",
          padding: 20,
        }}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: colors.CC,
              marginVertical: 10,
              width: 310,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: 10,
              borderRadius:7,
            }}
          >
            <View>
              <Text style={{color: colors.primary,}}>Nombre: {item.nombre} {item.apellido}</Text>
              <Text style={{color: colors.primary,}}>Edad: {item.edad}</Text>
              <Text style={{color: colors.primary,}}>Telefono: {item.telefono}</Text>
              <Text style={{color: colors.primary,}}>Relacion: {item.relacion}</Text>
            </View>
            <TouchableOpacity style={{...dangerButton.button}} onPress={() => handleDelete(userData, item.id)}>
              <Text style={{...dangerButton.text}}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Contactuser;
