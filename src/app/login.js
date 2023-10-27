import React from "react";
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
const Login = () => {
  /// para volver el push y solo direccionar el replace
  const ingresar = () => {
    router.push("/home");
  };
  return (
    <>
      <ImageBackground
        source={require("../../assets/fondo/imgTres.jpeg")}
        style={loginstyle.backgroundImage}
      >
        <KeyboardAvoidingView
          style={loginstyle.container}
          behavior="padding"
          enabled
        >
          <View>
            <Text style={loginstyle.title}>Iniciar sesión</Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 30,
                marginTop: 75,
              }}
            >
              <Text style={{ width: "100%", fontSize: 12 }}>
                Nombre de usuario
              </Text>
              <TextInput style={loginstyle.inputs} />
              <Text style={{ width: "100%", fontSize: 12 }}>Contraseña</Text>
              <TextInput style={loginstyle.inputs} />
              <Text style={{ width: "100%", fontSize: 12 }}>
                Confirmar contraseña
              </Text>
              <TextInput style={loginstyle.inputs} />

              <TouchableOpacity style={loginstyle.button} onPress={ingresar}>
                <Text style={{ color: "#fff" }}>Ingresar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={loginstyle.button}>
                <Text style={{ color: "#fff" }}>Iniciar sesión con Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
      <ScrollView horizontal style={{ height: 200 }}>
        <Image
          source={require("../../assets/LOGOS/iffi.png")}
          style={loginstyle.logos}
        />
        <Image
          source={require("../../assets/LOGOS/logo_Unifranz.png")}
          style={loginstyle.logos}
        />
        <Image
          source={require("../../assets/LOGOS/save.png")}
          style={loginstyle.logos}
        />
        <Image
          source={require("../../assets/LOGOS/vision.jpeg")}
          style={loginstyle.logos}
        />
      </ScrollView>
    </>
  );
};

export default Login;
