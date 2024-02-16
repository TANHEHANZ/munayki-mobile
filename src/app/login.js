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
import LocationComponent from "../components/permisos/location";
import NotificationComponent from "../components/permisos/camera";
import * as Notifications from "expo-notifications";

const Login = () => {
  const [dataLogin, setDataLogin] = useState({
    correo: "",
    password: "",
    confirmation_password: "",
  });

  const updateUser = useUserStore((state) => state.updateUser);

  const handleSend = async () => {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
  
    if (dataLogin.confirmation_password === dataLogin.password) {
      const res = await peticionPost("login/?token=" + token, {
        correo: dataLogin.correo,
        password: dataLogin.password,
      });
      console.log("Token de notificación:", token);
      console.log("Respuesta:", res);
  
      if (res && res.message === "Inicio de sesion correcto") {
        updateUser(res, dataLogin.password);
        router.replace("/home");
        alert("Bienvenido");
      } else {
        alert(res.message || "Error al iniciar sesión");
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
  };
  
  return (
    <>
      <LocationComponent />
      <NotificationComponent />
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
                paddingVertical: "5%",
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
                secureTextEntry={true}
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
                secureTextEntry={true}
              />

              <TouchableOpacity
                style={loginstyle.button}
                onPress={() => handleSend()}
              >
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
