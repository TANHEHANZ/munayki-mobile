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

  const handleSend = async () => {
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
                height: '31%',
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
                  <Text style={{ width: "100%", fontSize: 12 }}>Genero</Text>
                  <TextInput
                    style={loginstyle.inputs}
                    value={dataRegister.genero}
                    onChangeText={(text) =>
                      setDataRegister((old) => ({ ...old, genero: text }))
                    }
                  />
                </>
              )}
            </View>
            <View style={{ marginVertical: '2%', padding: '5%' }}>
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
