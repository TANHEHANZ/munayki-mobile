import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { loginstyle } from "../../styles/style";
import { colors } from "../../styles/CompStyle";

const Contactos = () => {
  const [mostrar, setMostrar] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [relacion, setRelacion] = useState("");

  const agregarContacto = () => {
    fetch(`192.168.0.15:3000/user/1/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        edad,
        telefono,
        relacion,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Contacto creado con éxito:", data);
      })
      .catch((error) => {
        console.log(
          JSON.stringify({
            nombre,
            apellido,
            edad,
            telefono,
            relacion,
          })
        );
        console.error("Error al agregar contacto:", error);
      });
  };

  return (
    <View
      style={{
        height: 700,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ margin: 30 }}>Contactos Registrados : 0</Text>

      {mostrar ? (
        <KeyboardAvoidingView style={{ width: "80%", gap: 10 }}>
          <Text>nombre</Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre"
            style={{
              ...loginstyle.inputs,
              borderBottomWidth: 1,
              borderBottomColor: colors.CC,
              margin: 0,
            }}
          />
          <Text>apellido</Text>
          <TextInput
            value={apellido}
            onChangeText={setApellido}
            placeholder="apellido"
            style={{
              ...loginstyle.inputs,
              borderBottomWidth: 1,
              borderBottomColor: colors.CC,
              margin: 0,
            }}
          />
          <Text>edad</Text>
          <TextInput
            value={edad}
            onChangeText={setEdad}
            placeholder="edad"
            style={{
              ...loginstyle.inputs,
              borderBottomWidth: 1,
              borderBottomColor: colors.CC,
              margin: 0,
            }}
          />
          <Text>telefono</Text>
          <TextInput
            value={telefono}
            onChangeText={setTelefono}
            placeholder="telefono"
            style={{
              ...loginstyle.inputs,
              borderBottomWidth: 1,
              borderBottomColor: colors.CC,
              margin: 0,
            }}
          />
          <Text>Relacion user</Text>
          <TextInput
            value={relacion}
            onChangeText={setRelacion}
            placeholder="relacion"
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
          agregarContacto();
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
