import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { contactStyle } from "../../styles/style";
import { colors } from "../../styles/CompStyle";
import InputsContact from "../../components/global/inputsContact";
import { peticionGet } from "../../utilitis/getRequest";
import useUserStore from "../../components/context/UserContext";
import { ConStyle } from "../../styles/contact";

const Contactos = () => {
  const [mostrar, setMostrar] = useState(false);
  const [data, setData] = useState(0);
  const { user, token } = useUserStore();
  let userData = +user.login[0].id;
  const tokenLoguet = token;
  const fetchData = async () => {
    try {
      const result = await peticionGet("contacts/" + userData, tokenLoguet);
      setData(result);
    } catch (error) {
      console.error("Error al obtener datos:");
    }
  };
  useEffect(() => {
    fetchData();
  }, [mostrar]);

  return (
    <View style={ConStyle.contenedor}>
      <Text style={{ margin: 40 }}>Contactos Registrados :{data}</Text>
      <InputsContact
        mostrar={mostrar}
        userData={userData}
        setMostrar={setMostrar}
        tokenLoguet={tokenLoguet}
      />

      {data >= 3 ? (
        <Text style={ConStyle.text}>Ya agrego los tres contactos</Text>
      ) : !mostrar ? (
        <TouchableOpacity
          style={contactStyle.button}
          onPress={() => {
            setMostrar(!mostrar);
          }}
        >
          <Text style={ConStyle.text}>Agregar</Text>
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
