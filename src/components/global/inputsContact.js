import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { contactStyle } from "../../styles/style";

const InputsContact = ({mostrar}) => {

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
    <>
      {mostrar ? (
        <ScrollView style={{ width: "80%" }}>
          <Text>nombre</Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre"
            style={contactStyle.inputs}
          />
          <Text>apellido</Text>
          <TextInput
            value={apellido}
            onChangeText={setApellido}
            placeholder="apellido"
            style={contactStyle.inputs}
          />
          <Text>edad</Text>
          <TextInput
            value={edad}
            onChangeText={setEdad}
            placeholder="edad"
            style={contactStyle.inputs}
          />
          <Text>telefono</Text>
          <TextInput
            value={telefono}
            onChangeText={setTelefono}
            placeholder="telefono"
            style={contactStyle.inputs}
          />
          <Text>Relacion user</Text>
          <TextInput
            value={relacion}
            onChangeText={setRelacion}
            placeholder="relacion"
            style={contactStyle.inputs}
          />
        </ScrollView>
      ) : (
        <>
          <Text style={{ fontSize: 20 }}>Agrega Contactos </Text>
        </>
      )}
    </>
  );
};

export default InputsContact;
