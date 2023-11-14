import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { contactStyle, loginstyle } from "../../styles/style";
import { colors } from "../../styles/CompStyle";
import InputsContact from "../../components/global/inputsContact";
import { peticionPost } from "../../utilitis/postRequest";

const Contactos = () => {
  const [mostrar, setMostrar] = useState(false);
  
  return (
    <View
      style={{
        height: 650,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ margin: 30 }}>Contactos Registrados : 0</Text>

     <InputsContact mostrar={mostrar}/>

      {mostrar? (""):(<TouchableOpacity
        style={contactStyle.button}
        onPress={() => {
          setMostrar(true);
        }}
      >
        <Text style={{ textAlign: "center", width: "100%" }}>Agregar</Text>
      </TouchableOpacity>)
      }
      {mostrar ? (
        <TouchableOpacity
        
          style={{
            ...contactStyle.button,
            width: "50%",
            backgroundColor: colors.CC,
          }}
          onPress={() => {
            setMostrar(false);
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
