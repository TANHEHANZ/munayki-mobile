import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { contactStyle } from "../../styles/style";
import { peticionPost } from "../../utilitis/postRequest";


const InputsContact = ({ mostrar, userData, setMostrar }) => {
  const [datoscontact, setDatoscontact] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    telefono: "",
    relacion: "",
  });



  const handleSend = async () => {
    const res = await peticionPost("user/" + userData + "/contacts", {
      nombre: datoscontact.nombre,
      apellido: datoscontact.apellido,
      edad: +datoscontact.edad,
      telefono: +datoscontact.telefono,
      relacion: datoscontact.relacion,
    });
    if (res) {
      alert(res.message);
      setMostrar(!mostrar);
      setDatoscontact({
        nombre: "",
        apellido: "",
        edad: "",
        telefono: "",
        relacion: "",
      });
    }
  };

  return (
    <>
      {mostrar ? (
        <View style={{ width: "80%" }}>
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
            onChangeText={(text) =>
              setDatoscontact((old) => ({ ...old, apellido: text }))
            }
            placeholder="apellido"
            style={contactStyle.inputs}
          />
          <Text>edad</Text>
          <TextInput
            value={datoscontact.edad}
            onChangeText={(text) =>
              setDatoscontact((old) => ({ ...old, edad: text }))
            }
            placeholder="edad"
            style={contactStyle.inputs}
            keyboardType="numeric"
          />
          <Text>telefono</Text>
          <TextInput
            value={datoscontact.telefono}
            onChangeText={(text) =>
              setDatoscontact((old) => ({ ...old, telefono: text }))
            }
            placeholder="telefono"
            style={contactStyle.inputs}
            keyboardType="numeric"
          />
          <Text>Relacion user</Text>
          <TextInput
            value={datoscontact.relacion}
            onChangeText={(text) =>
              setDatoscontact((old) => ({ ...old, relacion: text }))
            }
            placeholder="relacion"
            style={contactStyle.inputs}
          />
          <TouchableOpacity style={contactStyle.button} onPress={handleSend}>
            <Text style={{ textAlign: "center", width: "100%" }}>Agregar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={{ fontSize: 20 }}>Agrega Contactos </Text>
        </>
      )}
    </>
  );
};

export default InputsContact;
