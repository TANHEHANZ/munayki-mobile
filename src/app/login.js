import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import { loginstyle } from "../styles/style";
import { colors } from "../styles/CompStyle";
import { peticionPost } from "../utilitis/postRequest";
import useUserStore from "../components/context/UserContext";
const Login = () => {
  const [dataLogin, setDataLogin] = useState({
    correo: "",
    password: "",
    confirmation_password: "",
  });

  const updateUser = useUserStore((state) => state.updateUser);

  const handleSend = async () => {
    if (dataLogin.confirmation_password === dataLogin.password) {
      const res = await peticionPost("login", {
        correo: dataLogin.correo,
        password: dataLogin.password,
      });
      res && res.message === "Inicio de sesion correcto"
        ? (router.push("/home"), alert("Bienvenido"))
        : alert(res.message),
        updateUser(res);
    } else {
      alert("Las contraseñas no coinciden");
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
            <Text style={{ ...loginstyle.title, fontWeight: 400 }}>
              Iniciar <Text style={{ color: colors.CC }}>sesión</Text>
            </Text>
            <View
              style={{
                paddingHorizontal: 50,
                height: 400,
              }}
            >
              <Text style={{ width: "100%", fontSize: 12 }}>
                Email de usuario
              </Text>
              <TextInput
                style={loginstyle.inputs}
                value={dataLogin.correo}
                onChangeText={(text) =>
                  setDataLogin((old) => ({ ...old, correo: text }))
                }
              />
              <Text style={{ width: "100%", fontSize: 12 }}>Contraseña</Text>
              <TextInput
                style={loginstyle.inputs}
                value={dataLogin.password}
                onChangeText={(text) =>
                  setDataLogin((old) => ({ ...old, password: text }))
                }
              />
              <Text style={{ width: "100%", fontSize: 12 }}>
                Confirmar contraseña
              </Text>
              <TextInput
                style={loginstyle.inputs}
                value={dataLogin.confirmation_password}
                onChangeText={(text) =>
                  setDataLogin((old) => ({
                    ...old,
                    confirmation_password: text,
                  }))
                }
              />

              <TouchableOpacity style={loginstyle.button} onPress={handleSend}>
                <Text style={{ color: colors.CC }}>Ingresar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={loginstyle.button}
                onPress={() => {
                  router.push("/register");
                }}
              >
                <Text style={{ color: colors.CC }}>Registrarse</Text>
              </TouchableOpacity>

              <Image
                source={require("../../assets/fondo/munayki.png")}
                style={{ ...loginstyle.logos, width: 200, height: 80 }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
};

export default Login;
