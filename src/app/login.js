import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const checkUserLoggedIn = async () => {
    const cachedData = await AsyncStorage.getItem("userData");
    console.log(cachedData)
    if (cachedData) {
      router.replace("/home");
    } else {
      console.log("User not logged in=");
    }
  };
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

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
      console.log(res);
      if (res && res.message === "Inicio de sesion correcto") {
        updateUser(res, dataLogin.password);
        await AsyncStorage.setItem(
          "userDataLogin",
          JSON.stringify(res.login[0])
        );
        const cachedData = await AsyncStorage.getItem("userDataLogin");
        console.log(
          "datos enviados a cache del login ",
          JSON.parse(cachedData)
        );
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
      <KeyboardAvoidingView
        style={loginstyle.container}
        behavior="padding"
        enabled
      >
        <View>
          <View style={{ ...loginstyle.title }}>
            <View style={{ ...loginstyle.figuras, right: -30, top: 0 }}></View>
            <Text>
              <View
                style={{
                  ...loginstyle.figuras,
                  backgroundColor: "#fff",
                  borderWidth: 2,
                  borderColor: colors.CC,
                  width: 140,
                  height: 140,
                }}
              >
                <Text style={{ fontSize: 25, fontWeight: 600 }}> Iniciar</Text>
                <Text
                  style={{ color: colors.CC, fontSize: 20, fontWeight: 600 }}
                >
                  sesión
                </Text>
              </View>
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 35,
              height: 500,
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
            <View style={{ ...loginstyle.logoconteiner }}>
              <Image
                source={require("../../assets/fondo/munaiki1.png")}
                style={{ ...loginstyle.logos, width: 150, height: 90 }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
