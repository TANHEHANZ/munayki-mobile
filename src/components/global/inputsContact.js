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
    email: "",
    edad: "",
    telefono: "",
    relacion: "",
  });

  const validarDatos = () => {
    if (!datoscontact.nombre) {
      alert('Por favor, completa el campo nombre.');
      return false;
    } else if (!/^[a-zA-Z\s]*$/.test(datoscontact.nombre)) {
      alert('El campo nombre solo debe contener letras y espacios.');
      return false;
    }
    
    if (!datoscontact.email) {
      alert('Por favor, completa el campo correo.');
      return false;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+com$/.test(datoscontact.email)) {
      alert('El campo Email debe contener un "@" y terminar con ".com".');
      return false;
    }
    
    if (!datoscontact.edad) {
      alert('Por favor, completa el campo edad.');
      return false;
    } else if (!/^\d+$/.test(datoscontact.edad)) {
      alert('El campo edad solo debe contener números.');
      return false;
    }
    
    if (!datoscontact.telefono) {
      alert('Por favor, completa el campo teléfono.');
      return false;
    } else if (!/^\d+$/.test(datoscontact.telefono)) {
      alert('El campo teléfono solo debe contener números.');
      return false;
    }

    if (!datoscontact.relacion) {
      alert('Por favor, completa el campo relacion.');
      return false;
    } else if (!/^[a-zA-Z]*$/.test(datoscontact.nombre)) {
      alert('El campo relacion solo debe contener letras.');
      return false;
    }
  
    return true;
  };

  const handleSend = async () => {
    if(validarDatos()){
      const res = await peticionPost("user/" + userData + "/contacts", {
        nombre: datoscontact.nombre,
        email: datoscontact.email,
        edad: +datoscontact.edad,
        telefono: +datoscontact.telefono,
        relacion: datoscontact.relacion,
      });
      if (res) {
        alert(res.message);
        setMostrar(!mostrar);
        setDatoscontact({
          nombre: "",
          email: "",
          edad: "",
          telefono: "",
          relacion: "",
        });
      }
    }
  };

  return (
    <>
      {mostrar ? (
        <View style={{ width: "80%" }}>
          <Text>Nombre</Text>
          <TextInput
            value={datoscontact.nombre}
            onChangeText={(text) =>
              setDatoscontact((old) => ({ ...old, nombre: text }))
            }
            placeholder="Nombre"
            style={contactStyle.inputs}
          />
          <Text>Email</Text>
          <TextInput
            value={datoscontact.email}
            onChangeText={(text) =>
              setDatoscontact((old) => ({ ...old, email: text }))
            }
            placeholder="data@gmail.com"
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
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity style={contactStyle.button} onPress={handleSend}>
              <Text style={{ textAlign: "center", width: "100%" }}>
                Agregar
              </Text>
            </TouchableOpacity>
          </View>
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
