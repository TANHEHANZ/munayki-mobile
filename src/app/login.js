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
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import { loginstyle } from "../styles/style";
import { useFonts, Montserrat_300Light } from "@expo-google-fonts/montserrat";
import { colors } from "../styles/CompStyle";
const Login = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
  });

  /// para volver el push y solo direccionar el replace

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
              style={{ ...loginstyle.title, fontFamily: "Montserrat_300Light" }}
            >
              Iniciar <Text style={{ color: colors.CC }}>sesión</Text>
            </Text>
            <View
              style={{
                paddingHorizontal: 50,
                height: 400,
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

              <TouchableOpacity
                style={loginstyle.button}
                onPress={() => {
                  router.replace("/home");
                }}
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
              <TouchableOpacity style={loginstyle.button}>
                <FontAwesome name="google" size={30} color="rgb(73,39,121)" />
                <Text style={{ color: colors.CC }}>
                  Iniciar sesión con Google
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{height:100}}>
              <ScrollView horizontal style={{ marginTop: 10 }}>
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
            </View> */}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </>
  );
};

export default Login;
