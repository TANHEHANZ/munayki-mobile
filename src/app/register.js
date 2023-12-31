import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import { loginstyle } from "../styles/style";
import { colors } from "../styles/CompStyle";
import { peticionPost } from "../utilitis/postRequest";
import { Picker } from "@react-native-picker/picker";

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
      alert('Por favor, completa el campo nombre.');
      return false;
    } else if (!/^[a-zA-Z\s]*$/.test(dataRegister.nombre)) {
      alert('El campo nombre solo debe contener letras y espacios.');
      return false;
    }
    
    if (!dataRegister.apellido) {
      alert('Por favor, completa el campo apellido.');
      return false;
    } else if (!/^[a-zA-Z\s]*$/.test(dataRegister.apellido)) {
      alert('El campo apellido solo debe contener letras y espacios.');
      return false;
    }
    
    if (!dataRegister.edad) {
      alert('Por favor, completa el campo edad.');
      return false;
    } else if (!/^\d+$/.test(dataRegister.edad)) {
      alert('El campo edad solo debe contener números.');
      return false;
    }
    
    if (!dataRegister.telefono) {
      alert('Por favor, completa el campo teléfono.');
      return false;
    } else if (!/^\d+$/.test(dataRegister.telefono)) {
      alert('El campo teléfono solo debe contener números.');
      return false;
    }
    
    if (!dataRegister.ubicacion) {
      alert('Por favor, completa el campo ubicación.');
      return false;
    }
    
    if (!dataRegister.correo) {
      alert('Por favor, completa el campo correo.');
      return false;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+com$/.test(dataRegister.correo)) {
      alert('El campo correo debe contener un "@" y terminar con ".com".');
      return false;
    }
    
    if (!dataRegister.password) {
      alert('Por favor, completa el campo contraseña.');
      return false;
    }
    
  
    if (!dataRegister.genero) {
      alert('Por favor, selecciona un género.');
      return false;
    }
  
    return true;
  };

  const handleSend = async () => {
    if(validarDatos()){
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
      });
      console.log(dataRegister);
      res && res.message === "sucessully create"
        ? (router.push("/login"), alert("Registrado"))
        : alert(res.message);
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/imagendos.jpeg")}
        style={loginstyle.backgroundImage}
      >
        <KeyboardAvoidingView
          style={loginstyle.container}
          behavior="padding"
          enabled
        >
          <View>
            <Text
              style={{
                ...loginstyle.title,
                fontWeight: 400,
                margin: -10,
              }}
            >
              Regis
              <Text style={{ color: colors.CC, fontWeight: 400 }}>trate</Text>
            </Text>
            <View
              style={{
                paddingHorizontal: 50,
                height: "35%",
              }}
            >
              {continuar ? (
                <>
                  <Text style={{ width: "100%", fontSize: 12 }}>Nombre</Text>
                  <TextInput
                    style={loginstyle.inputs}
                    value={dataRegister.nombre}
                    onChangeText={(text) =>
                      setDataRegister((old) => ({ ...old, nombre: text }))
                    }
                  />
                  <Text style={{ width: "100%", fontSize: 12 }}>Apellido</Text>
                  <TextInput
                    style={loginstyle.inputs}
                    value={dataRegister.apellido}
                    onChangeText={(text) =>
                      setDataRegister((old) => ({ ...old, apellido: text }))
                    }
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
                    onChangeText={(text) =>
                      setDataRegister((old) => ({ ...old, telefono: text }))
                    }
                    keyboardType="numeric"
                  />
                </>
              ) : (
                <>
                  <Text style={{ width: "100%", fontSize: 12 }}>Genero</Text>

                  <Picker
                    style={{
                      backgroundColor: colors.CC,
                      zIndex: 100,
                      color: "#fff",
                      marginVertical: 10,
                      fontSize: 12, // Ajusta el tamaño de la fuente
                      height: '8%', // Ajusta la altura
                      width: '100%',
                    }}
                    selectedValue={dataRegister.genero}
                    onValueChange={(itemValue) =>
                      setDataRegister((old) => ({ ...old, genero: itemValue }))
                    }
                  >
                    <Picker.Item label="Escoge un genero" value="" />
                    <Picker.Item label="Masculino" value="Masculino " />
                    <Picker.Item label="Femenino" value="Femenino " />
                  </Picker>
                  <Text style={{ width: "100%", fontSize: 12 }}>Direccion</Text>
                  <TextInput
                    style={loginstyle.inputs}
                    value={dataRegister.ubicacion}
                    onChangeText={(text) =>
                      setDataRegister((old) => ({ ...old, ubicacion: text }))
                    }
                  />
                  <Text style={{ width: "100%", fontSize: 12 }}>Correo</Text>
                  <TextInput
                    style={loginstyle.inputs}
                    value={dataRegister.correo}
                    onChangeText={(text) =>
                      setDataRegister((old) => ({ ...old, correo: text }))
                    }
                  />
                  <Text style={{ width: "100%", fontSize: 12 }}>Password</Text>
                  <TextInput
                    style={loginstyle.inputs}
                    value={dataRegister.password}
                    onChangeText={(text) =>
                      setDataRegister((old) => ({ ...old, password: text }))
                    }
                  />
                </>
              )}
            </View>
            <View style={{ marginVertical: "2%", padding: "5%" }}>
              {continuar ? (
                <TouchableOpacity style={loginstyle.button} onPress={cambio}>
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
      </ImageBackground>
    </>
  );
};

export default Register;
