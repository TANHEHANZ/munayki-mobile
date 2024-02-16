import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { contactStyle } from "../../styles/style";
import { peticionPost } from "../../utilitis/postRequest";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../styles/CompStyle";
import { Picker } from "@react-native-picker/picker";
const InputsContact = ({ mostrar, userData, setMostrar }) => {
  let datos = {
    nombre: "",
    email: "",
    edad: "",
    telefono: "",
    relacion: "",
    nick: "",
  };
  const [datoscontact, setDatoscontact] = useState(datos);

  const validarDatos = () => {
    if (!datoscontact.nombre) {
      alert("Por favor, completa el campo nombre.");
      return false;
    } else if (!/^[a-zA-Z\s]*$/.test(datoscontact.nombre)) {
      alert("El campo nombre solo debe contener letras y espacios.");
      return false;
    }

    if (!datoscontact.email) {
      alert("Por favor, completa el campo correo.");
      return false;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+com$/.test(datoscontact.email)) {
      alert('El campo Email debe contener un "@" y terminar con ".com".');
      return false;
    }

    if (!datoscontact.edad) {
      alert("Por favor, completa el campo edad.");
      return false;
    } else if (!/^\d+$/.test(datoscontact.edad)) {
      alert("El campo edad solo debe contener números.");
      return false;
    }

    if (!datoscontact.telefono) {
      alert("Por favor, completa el campo teléfono.");
      return false;
    } else if (!/^\d+$/.test(datoscontact.telefono)) {
      alert("El campo teléfono solo debe contener números.");
      return false;
    }

    if (!datoscontact.relacion) {
      alert("Por favor, completa el campo relacion.");
      return false;
    } else if (!/^[a-zA-Z]*$/.test(datoscontact.relacion)) {
      alert("El campo relacion solo debe contener letras.");
      return false;
    }

    return true;
  };
  const url =
    "contacto/create-searchToken/" +
    userData +
    "/?nickContacto=" +
    datoscontact.nick;
  console.log(url);
  const handleSend = async () => {
    if (validarDatos()) {
      console.log(datoscontact);
      console.log(userData);

      const res = await peticionPost(url, {
        nombre: datoscontact.nombre,
        email: datoscontact.email,
        edad: parseInt(datoscontact.edad),
        telefono: parseInt(datoscontact.telefono),
        relacion: datoscontact.relacion,
        nickContacto: datoscontact.nick,
      });
      console.log(res);
      if (res && res.message) {
        alert(res.message);
      } else {
        alert(
          "Verifique los campos (El campo de codigo debe ser exacto con su contacto, su contacto debe inicar secion para porder agregarlo y de esta forma enviarle las notificaciones)"
        );
      }
    }
  };
  const edades = Array.from({ length: 150 }, (_, i) => i + 1);
  return (
    <>
      {mostrar ? (
        <ScrollView
          style={{
            width: "80%",
            backgroundColor: "#fff",
          }}
        >
          <View style={{ flex: 1, height: 580 }}>
            {/* <Text style={{ color: "#000" }}>Nombre</Text> */}
            <TextInput
              value={datoscontact.nombre}
              onChangeText={(text) =>
                setDatoscontact((old) => ({ ...old, nombre: text }))
              }
              placeholder="Nombre"
              style={contactStyle.inputs}
            />
            {/* <Text>Email</Text> */}
            <TextInput
              value={datoscontact.email}
              onChangeText={(text) =>
                setDatoscontact((old) => ({ ...old, email: text }))
              }
              placeholder="data@gmail.com"
              style={contactStyle.inputs}
            />
            {/* <TextInput
              value={datoscontact.edad}
              onChangeText={(text) =>
                setDatoscontact((old) => ({ ...old, edad: text }))
              }
              placeholder="edad"
              style={contactStyle.inputs}
              keyboardType="numeric"
              
            /> */}

            <View
              style={{ flexDirection: "row", height: 80, alignItems: "center" }}
            >
              <TextInput
                value={datoscontact.telefono}
                onChangeText={(text) =>
                  setDatoscontact((old) => ({ ...old, telefono: text }))
                }
                placeholder="telefono"
                style={{ ...contactStyle.inputs, width: 200, height: 45 }}
                keyboardType="numeric"
              />
              <Picker
                selectedValue={datoscontact.edad}
                onValueChange={(itemValue, itemIndex) =>
                  setDatoscontact((old) => ({ ...old, edad: itemValue }))
                }
                style={contactStyle.inputs}
              >
                <Picker.Item label="Edad" value="" />
                {edades.map((edad) => (
                  <Picker.Item
                    label={String(edad)}
                    value={String(edad)}
                    key={edad}
                  />
                ))}
              </Picker>
            </View>
            <TextInput
              value={datoscontact.relacion}
              onChangeText={(text) =>
                setDatoscontact((old) => ({ ...old, relacion: text }))
              }
              placeholder="Relacion con el user"
              style={contactStyle.inputs}
            />
            <View
              style={{
                flexDirection: "column",
                height: 100,
                alignItems: "start",
              }}
            >
              <TextInput
                value={datoscontact.nick}
                onChangeText={(text) =>
                  setDatoscontact((old) => ({ ...old, nick: text }))
                }
                placeholder="Codigo del Contacto"
                placeholderStyle={{ color: "blue" }}
                style={{ ...contactStyle.inputs, height: 50 }}
              />
              <Text style={{ color: colors.CC, fontWeight: "600" }}>
                ¡Pide a tu contacto su codigo, lo encontrara en la configuracion
                de su perfil!
              </Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={contactStyle.button}
                onPress={handleSend}
              >
                <Text style={{ textAlign: "center", width: "100%" }}>
                  Agregar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
