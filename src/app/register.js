import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  TextInput,
  ClipboardStatic
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import { loginstyle } from "../styles/style";
import { colors } from "../styles/CompStyle";
import { peticionPost } from "../utilitis/postRequest";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";

const Register = () => {
  const [continuar, setContinuar] = useState(true);
  const cambio = () => {
    setContinuar(false);
  };

  const [dataRegister, setDataRegister] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    telefono: "",
    ubicacion: "",
    correo: "",
    password: "",
    rol: "logedApp",
    genero: "",
  });

  const validarDatos = () => {
    if (!dataRegister.nombre) {
      alert("Por favor, completa el campo nombre.");
      return false;
    } else if (!/^[a-zA-Z\s]*$/.test(dataRegister.nombre)) {
      alert("El campo nombre solo debe contener letras y espacios.");
      return false;
    }

    if (!dataRegister.apellido) {
      alert("Por favor, completa el campo apellido.");
      return false;
    } else if (!/^[a-zA-Z\s]*$/.test(dataRegister.apellido)) {
      alert("El campo apellido solo debe contener letras y espacios.");
      return false;
    }

    if (!dataRegister.edad) {
      alert("Por favor, completa el campo edad.");
      return false;
    } else if (!/^\d+$/.test(dataRegister.edad)) {
      alert("El campo edad solo debe contener números.");
      return false;
    }

    if (!dataRegister.telefono) {
      alert("Por favor, completa el campo teléfono.");
      return false;
    } else if (!/^\d+$/.test(dataRegister.telefono)) {
      alert("El campo teléfono solo debe contener números.");
      return false;
    }

    if (!dataRegister.ubicacion) {
      alert("Por favor, completa el campo ubicación.");
      return false;
    }
/* 
    if (!dataRegister.correo) {
      alert("Por favor, completa el campo correo.");
      return false;
    }  *//* else if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        dataRegister.correo
      )
    ) */ /* {
      alert('El campo correo debe contener un "@" y terminar con ".com".');
      return false;
    } */

    if (!dataRegister.password || dataRegister.password.length < 8) {
      alert(
        dataRegister.password
          ? "Su password es menor a 8 caracteres"
          : "Por favor, completa el campo contraseña."
      );
      return false;
    }

    if (!dataRegister.genero) {
      alert("Por favor, selecciona un género.");
      return false;
    }

    return true;
  };
  
  const handleSend = async () => {
    if (validarDatos()) {
      const res = await peticionPost("user", {
        nombre: dataRegister.nombre,
        apellido: dataRegister.apellido,
        edad: +dataRegister.edad,
        telefono: +dataRegister.telefono,
        ubicacion: dataRegister.ubicacion,
        correo: dataRegister.correo,
        password: dataRegister.password,
        rol: dataRegister.rol,
        genero: dataRegister.genero,
      }, "POST");
      console.log(dataRegister);
      res && res.message === "Usuario creado exitosamente"
        ? (router.push("/login"), alert("Registrado"))
        : alert(res.message);
    }
  };

  const clearClipboard = () =>{
    Clipboard.setString('')
   }

  return (
    <>
      <KeyboardAvoidingView
        style={loginstyle.container}
        behavior="padding"
        enabled
      >
        <View style={{}}>
          <View style={{ ...loginstyle.title }}>
            <View style={{ ...loginstyle.figuras, right: -30, top: 0 }}></View>
            <Text>
              <View
                style={{
                  ...loginstyle.figuras,
                  backgroundColor: "#fff",
                  borderWidth: 2,
                  borderColor: colors.CC,
                  width: 150,
                  height: 140,
                }}
              >
                <Text style={{ fontSize: 25, fontWeight: 600 }}>
                  Registrate
                </Text>
              </View>
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              paddingHorizontal: 40,
            }}
            removeClippedSubviews={true}
          >
            {continuar ? (
              <ScrollView>
                <Text style={{ width: "100%", fontSize: 12 }}>Nombres</Text>
                <TextInput
                  style={loginstyle.inputs}
                  value={dataRegister.nombre}
                  contextMenuHidden={true}
                  onTouchEnd={clearClipboard}
                  onChangeText={(text) => {
                    let newText = text.replace(/[^A-Za-z]/g, '');
                    setDataRegister((old) => ({ ...old, nombre: newText }));
                  }}
                />
                <Text style={{ width: "100%", fontSize: 12 }}>Apellido</Text>
                <TextInput
                  style={loginstyle.inputs}
                  value={dataRegister.apellido}
                  contextMenuHidden={true}
                  onChangeText={(text) => {
                    let newText = text.replace(/[^A-Za-z]/g, '');
                    setDataRegister((old) => ({ ...old, nombre: newText }));
                  }}
                />
                <Text style={{ width: "100%", fontSize: 12 }}>Edad</Text>
                <TextInput
                  style={loginstyle.inputs}
                  value={dataRegister.edad}
                  onChangeText={(text) =>
                    setDataRegister((old) => ({ ...old, edad: text }))
                  }
                  keyboardType="numeric"
                />
                <Text style={{ width: "100%", fontSize: 12 }}>Telefono</Text>
                <TextInput
                  style={loginstyle.inputs}
                  value={dataRegister.telefono}
                  contextMenuHidden={true}
                  onChangeText={(text) =>
                    setDataRegister((old) => ({ ...old, telefono: text }))
                  }
                  keyboardType="numeric"
                />
              </ScrollView>
            ) : (
              <ScrollView vertical>
                <Text style={{ width: "100%", fontSize: 12 }}>Genero</Text>
                <Picker
                  style={{
                    backgroundColor: colors.CC,
                    color: "#fff",
                    marginVertical: 5,
                    fontSize: 12,
                    height: "7%",
                    width: "100%",
                  }}
                  selectedValue={dataRegister.genero}
                  onValueChange={(itemValue) =>
                    setDataRegister((old) => ({ ...old, genero: itemValue }))
                  }
                >
                  <Picker.Item label="Escoge un genero" value="" style={{ width: 100, color: "#fff", backgroundColor: colors.CC, height: 10, }} />
                  <Picker.Item label="Masculino" value="Masculino " style={{ width: 100, color: "#fff", backgroundColor: colors.CC }} />
                  <Picker.Item label="Femenino" value="Femenino " style={{ width: 100, color: "#fff", backgroundColor: colors.CC }} />
                </Picker>
                <Text style={{ width: "100%", fontSize: 12 }}>Direccion</Text>
                <TextInput
                  style={loginstyle.inputs}
                  value={dataRegister.ubicacion}
                  contextMenuHidden={true}
                  onChangeText={(text) =>
                    setDataRegister((old) => ({ ...old, ubicacion: text }))
                  }
                />
                <Text style={{ width: "100%", fontSize: 12 }}>Correo</Text>
                <TextInput
                  style={loginstyle.inputs}
                  value={dataRegister.correo}
                  contextMenuHidden={true}
                  onChangeText={(text) =>
                    setDataRegister((old) => ({ ...old, correo: text }))
                  }
                />
                <Text style={{ width: "100%", fontSize: 12 }}>Password</Text>
                <TextInput
                  style={loginstyle.inputs}
                  value={dataRegister.password}
                  contextMenuHidden={true}
                  onChangeText={(text) =>
                    setDataRegister((old) => ({ ...old, password: text }))
                  }
                />
              </ScrollView>
            )}
          </View>
          <View style={{}}>
            {continuar ? (
              <TouchableOpacity
                style={{
                  ...loginstyle.button,
                  marginTop: "10%",
                }}
                onPress={cambio}
              >
                <Text style={{ color: colors.CC }}>
                  continuar con el registro
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={loginstyle.button}
                  onPress={() => {
                    setContinuar(true);
                  }}
                >
                  <Text style={{ color: colors.CC }}>Registro anteriror</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={loginstyle.button}
                  onPress={handleSend}
                >
                  <Text style={{ color: colors.CC }}>Ingresar</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={loginstyle.button}
              onPress={() => {
                router.push("/login");
              }}
            >
              <Text style={{ color: colors.CC }}>Volver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Register;
