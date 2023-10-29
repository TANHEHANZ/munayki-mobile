import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { loginstyle } from "../../styles/style";
import { colors } from "../../styles/CompStyle";

const Contactos = () => {
  const [mostrar, setMostrar] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      
      }}
    >
      <Text>Contactos Registrados : 0</Text>

      {mostrar ? (
        <KeyboardAvoidingView style={{ width: "80%", gap: 20 }}>
          <Text>nombre</Text>
          <TextInput
            style={{
              ...loginstyle.inputs,
              borderBottomWidth: 1,
              borderBottomColor: colors.CC,
              margin: 0,
            }}
          />
          <Text>apellido</Text>
          <TextInput
            style={{
              ...loginstyle.inputs,
              borderBottomWidth: 1,
              borderBottomColor: colors.CC,
              margin: 0,
            }}
          />
          <Text>edad</Text>
          <TextInput
            style={{
              ...loginstyle.inputs,
              borderBottomWidth: 1,
              borderBottomColor: colors.CC,
              margin: 0,
            }}
          />
          <Text>telefono</Text>
          <TextInput
            style={{
              ...loginstyle.inputs,
              borderBottomWidth: 1,
              borderBottomColor: colors.CC,
              margin: 0,
            }}
          />
        </KeyboardAvoidingView>
      ) : (
        <>
          <Text style={{ fontSize: 20 }}>Agrega Contactos </Text>
        </>
      )}

      <TouchableOpacity
        style={{
          ...loginstyle.button,
          width: "80%",
          elevation: 5,
          backgroundColor: colors.primary,
        }}
        onPress={() => {
          setMostrar(true);
        }}
      >
        <Text style={{ textAlign: "center", width: "100%" }}>Agregar</Text>
      </TouchableOpacity>
      {mostrar ? (
        <TouchableOpacity
          style={{
            ...loginstyle.button,
            width: "50%",
            elevation: 5,
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
      <Text style={{ fontSize: 11, width: "70%", textAlign: "center" }}>
        Debe registrar 3 contactos a estas personas le llegaran los reportes al
        precionar el botón
      </Text>
    </View>
  );
};

export default Contactos;
