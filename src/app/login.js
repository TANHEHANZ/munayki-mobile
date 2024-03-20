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
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
const Login = () => {
  const [dataLogin, setDataLogin] = useState({
    correo: "",
    password: "",
    confirmation_password: "",
  });
  const { updateUser, setToken } = useUserStore();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [expoPushToken, setExpoPushToken] = useState('');



  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'Munayki',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });
      setExpoPushToken(token.data)
    } else {
      alert('Must use physical device for Push Notifications');
    }

    return token.data;
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
            tokenUserData: expoPushToken ? expoPushToken : undefined
          },
          "POST"
        );
        console.log("token envido", expoPushToken)
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
    registerForPushNotificationsAsync()
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
                  height: windowWidth * 0.30,

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
              height: windowHeight * 0.62,
              display: "flex",
              width: "90%",
              marginLeft: "5%"
            }}
          >
            <Text style={{ width: "100%", fontSize: 12 }}>
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
            <Text style={{ width: "100%", fontSize: 12 }}>Contraseña</Text>
            <TextInput
              style={loginstyle.inputs}
              value={dataLogin.password}
              autoCapitalize='none'
              secureTextEntry={true}
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
              <Text style={{ color: colors.CC, fontSize: 14 }}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={loginstyle.button}
              onPress={() => {
                router.push("/register");
              }}
            >
              <Text style={{ color: colors.CC, fontSize: 14 }}>Registrarse</Text>
            </TouchableOpacity>
            <View style={{ ...loginstyle.logoconteiner }}>
              <Image
                source={require("../../assets/fondo/munaiki1.png")}
                style={{ ...loginstyle.logos, width: windowWidth * 0.30, height: windowHeight * 0.10 }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;
