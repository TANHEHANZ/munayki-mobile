import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { peticionGet } from "../../utilitis/getRequest";
import useUserStore from "../../components/context/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { peticionDelete } from "../../utilitis/deleteRequest";
import { colors, sharedStyles } from "../../styles/CompStyle";
import { dangerButton } from "../../styles/style";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Contactuser = () => {
  const [data, setData] = useState("");
  const user = useUserStore((state) => state.user);
  const tokenLoguet = user.tokenLogauth;
  
  let userData = user.login[0].id;
  const handleDelete = async (userId, contactId) => {
    const res = await peticionDelete(`user/${userId}/contacts/${contactId}`,tokenLoguet);
    alert(res.message);
    fetchData();
  };
  const fetchData = async () => {
    try {
      const result = await peticionGet(`contacts/${userData}/?userConact=true`,tokenLoguet);
      setData(result);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{fontSize:20}}>Contactos</Text>
      <FlatList
        style={{
          flexDirection: "column",
          gap: 5,
          width: "100%",
          padding: 20,
        }}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#f2f2f2",
              ...sharedStyles.shadowBox,
              marginVertical: 10,
              width: "100%",
              height: 200,
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "start",
              padding: 20,
              borderRadius: 7,
            }}
          >
            <View
              style={{
                height: 150,
                position: "relative",
              }}
            >
              <Text style={{ color: colors.CC }}>Detalles de contacto</Text>
              <Text style={{ color: colors.CC }}>Nombre: {item.nombre}</Text>
              <Text style={{ color: colors.CC }}>Edad: {item.edad}</Text>
              <Text style={{ color: colors.CC }}>
                Telefono: {item.telefono}
              </Text>
              <Text style={{ color: colors.CC }}>Email: {item.email}</Text>
              <Text style={{ color: colors.CC }}>
                Relacion: {item.relacion}
              </Text>
            </View>
          <View style={{flexDirection:"row" , gap:10}}>
          <TouchableOpacity
              style={{ ...dangerButton.button }}
              onPress={() => handleDelete(userData, item.id)}
            >
              <Text style={{ ...dangerButton.text }}>
                <FontAwesome
                  name="trash"
                  size={20}
                  color={"rgb(73,39,121)"}
                />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...dangerButton.button , backgroundColor: colors.DD,}}
              onPress={() => handleDelete(userData, item.id)}
            >
              <Text style={{ ...dangerButton.text }}>
                <FontAwesome
                  name="edit"
                  size={20}
                  color={"rgb(73,39,121)"}
                />
              </Text>
            </TouchableOpacity>
          </View>
          </View>
        )}
      />
    </View>
  );
};

export default Contactuser;
