import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { contactStyle } from "../../styles/style";
import { peticionPost } from "../../utilitis/postRequest";

const InputsContact = ({ mostrar }) => {
  const [datoscontact, setDatoscontact] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    telefono: "",
    relacion: "",
  });
  const handleSend = async()=>{
    const user =2;
    const res = await peticionPost("user/"+user+"/contacts",{
      nombre: datoscontact.nombre,
      apellido: datoscontact.apellido,
      edad: +datoscontact.edad,
      telefono: +datoscontact.telefono,
      relacion: datoscontact.relacion,
    })
    if(res){
      alert(res.message)
    }
      }

  return (
    <>
      {mostrar ? (
        <ScrollView style={{ width: "80%" }}>
          <Text>nombre</Text>
          <TextInput
            value={datoscontact.nombre}
            onChangeText={(text) =>
              setDatoscontact((old) => ({ ...old, nombre: text }))
            }
            placeholder="Nombre"
            style={contactStyle.inputs}
          />
          <Text>apellido</Text>
          <TextInput
            value={datoscontact.apellido}
            onChangeText={(text)=>setDatoscontact((old)=>({...old,apellido:text}))}
            placeholder="apellido"
            style={contactStyle.inputs}
          />
          <Text>edad</Text>
          <TextInput
            value={datoscontact.edad}
            onChangeText={(text)=>setDatoscontact((old)=>({...old,edad:text}))}
            placeholder="edad"
            style={contactStyle.inputs}
          />
          <Text>telefono</Text>
          <TextInput
            value={datoscontact.telefono}
            onChangeText={(text)=>setDatoscontact((old)=>({...old,telefono:text}))}
            placeholder="telefono"
            style={contactStyle.inputs}
          />
          <Text>Relacion user</Text>
          <TextInput
            value={datoscontact.relacion}
            onChangeText={(text)=>setDatoscontact((old)=>({...old,relacion:text}))}
            placeholder="relacion"
            style={contactStyle.inputs}
          />
          <TouchableOpacity
        style={contactStyle.button} 
        onPress={handleSend}
      >
        <Text style={{ textAlign: "center", width: "100%" }}>Agregar</Text>
      </TouchableOpacity>
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
