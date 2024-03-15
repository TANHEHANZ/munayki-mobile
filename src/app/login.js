import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import { loginstyle } from "../styles/style";
import { colors } from "../styles/CompStyle";
import { peticionPost } from "../utilitis/postRequest";
import useUserStore from "../components/context/UserContext";
import LocationComponent from "../components/permisos/location";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Login = () => {
  const [dataLogin, setDataLogin] = useState({
    correo: "",
    password: "",
    confirmation_password: "",
  });
  const [tokennot, setTokenNot] = useState(null);
  const { updateUser, setToken } = useUserStore();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const getTokenNot = async () => {
    const token = await AsyncStorage.getItem('notificationToken');
    setTokenNot(token)
  }
  const handleSend = async () => {
    if (
      dataLogin.confirmation_password === dataLogin.password) {
      try {
        const res = await peticionPost(
          "login",
          {
            correo: dataLogin.correo,
            password: dataLogin.password,
            tokenUserData: tokennot ? tokennot : undefined
          },
          "POST"
        );
        if (res && res.message === "Inicio de sesion correcto") {
          updateUser(res, dataLogin.password);
          setToken(res.token)
          router.replace("/home");
          alert("Bienvenido");
        } else {
          alert(res.message || "Error al iniciar sesión");
        }
      } catch (error) {
        alert(error)
      }
    } else {
      alert("Las contraseñas no coinciden");
    }
  };
  useEffect(() => {
    getTokenNot()
  }, []);

  return (
    <>
      <LocationComponent />
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
                  width: windowWidth * 0.30,
                  height: windowHeight * 0.15,

                }}
              >
                <Text style={{ fontSize: windowWidth * 0.04, fontWeight: 600 }}> Iniciar</Text>
                <Text
                  style={{ color: colors.CC, fontSize: windowWidth * 0.05, fontWeight: 600 }}
                >
                  sesión
                </Text>
              </View>
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 35,
              height: windowHeight * 0.62,
            }}
          >
            <Text style={{ width: "100%", fontSize: windowWidth * 0.029 }}>
              Email de usuario
            </Text>
            <TextInput
              style={loginstyle.inputs}
              value={dataLogin.correo}
              autoCapitalize='none'
              onChangeText={(text) =>
                setDataLogin((old) => ({ ...old, correo: text }))
              }
            />
            <Text style={{ width: "100%", fontSize: windowWidth * 0.029}}>Contraseña</Text>
            <TextInput
              style={loginstyle.inputs}
              value={dataLogin.password}
              autoCapitalize='none'
              secureTextEntry={true}
              onChangeText={(text) =>
                setDataLogin((old) => ({ ...old, password: text }))
              }
            />
            <Text style={{ width: "100%", fontSize: windowWidth * 0.029}}>
              Confirmar contraseña
            </Text>
            <TextInput
              style={loginstyle.inputs}
              value={dataLogin.confirmation_password}
              autoCapitalize='none'
              secureTextEntry={true}
              onChangeText={(text) =>
                setDataLogin((old) => ({
                  ...old,
                  confirmation_password: text,
                }))
              }
            />
            <TouchableOpacity
              style={loginstyle.button}
              onPress={() => handleSend()}
            >
              <Text style={{ color: colors.CC ,fontSize: windowWidth * 0.035}}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={loginstyle.button}
              onPress={() => {
                router.push("/register");
              }}
            >
              <Text style={{ color: colors.CC ,fontSize: windowWidth * 0.035}}>Registrarse</Text>
            </TouchableOpacity>
            <View style={{ ...loginstyle.logoconteiner }}>
              <Image
                source={require("../../assets/fondo/munaiki1.png")}
                style={{ ...loginstyle.logos, width: 190, height: 130 }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
    // <View><Text>holaaaaa</Text></View>
  );
};

export default Login;
