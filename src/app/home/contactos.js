import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { contactStyle, loginstyle } from "../../styles/style";
import { colors } from "../../styles/CompStyle";
import InputsContact from "../../components/global/inputsContact";
import { peticionGet } from "../../utilitis/getRequest";
import useUserStore from "../../components/context/UserContext";
import { useContactStore } from "../../components/context/ContactContext";


const Contactos = () => {
  const [mostrar, setMostrar] = useState(false);
  const [data, setData] = useState("");
  const user = useUserStore((state) => state.user);

  const updateContact = useContactStore((state) => state.setContacts);

  let userData = user.data.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await peticionGet("user/" + userData + "/contacts");
        setData(result);
        updateContact(result);

      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();

  }, [mostrar]);



  return (
    <View
      style={{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ margin: 30 }}>Contactos Registrados :{data.length}</Text>

      <InputsContact mostrar={mostrar} userData={userData} setMostrar={setMostrar} />

      {data.length === 3 ? (
        <Text style={{ textAlign: "center", width: "100%" }}>
          Ya agrego los tres contactos
        </Text>
      ) : !mostrar ? (
        <TouchableOpacity
          style={contactStyle.button}
          onPress={() => {
            setMostrar(!mostrar);
          }}
        >
          <Text style={{ textAlign: "center", width: "100%" }}>Agregar</Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
      {mostrar ? (
        <TouchableOpacity
          style={{
            ...contactStyle.button,
            width: "50%",
            backgroundColor: colors.CC,
          }}
          onPress={() => {
            setMostrar(!mostrar);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              color: colors.primary,
            }}
          >
            Volver
          </Text>
        </TouchableOpacity>
      ) : (
        ""
      )}
      <Text style={contactStyle.text}>
        Debe registrar 3 contactos a estas personas le llegaran los reportes al
        precionar el botón
      </Text>
    </View>
  );
};

export default Contactos;
