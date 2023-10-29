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
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import { loginstyle } from "../styles/style";
import { useFonts, Montserrat_300Light } from "@expo-google-fonts/montserrat";
import { colors } from "../styles/CompStyle";

const Register = () => {
  const [continuar, setContinuar] = useState(true);
  const cambio = () => {
    setContinuar(false);
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
                fontFamily: "Montserrat_300Light",
              }}
            >
              Regis
              <Text style={{ color: colors.CC }}>trate</Text>
            </Text>
            <View
              style={{
                paddingHorizontal: 50,
                height: 260,
              }}
            >
              {continuar ? (
                <>
                  <Text style={{ width: "100%", fontSize: 12 }}>Nombre</Text>
                  <TextInput style={loginstyle.inputs} />
                  <Text style={{ width: "100%", fontSize: 12 }}>Apellido</Text>
                  <TextInput style={loginstyle.inputs} />
                  <Text style={{ width: "100%", fontSize: 12 }}>Edad</Text>
                  <TextInput style={loginstyle.inputs} />
                  <Text style={{ width: "100%", fontSize: 12 }}>Telefono</Text>
                  <TextInput style={loginstyle.inputs} />
                </>
              ) : (
                <>
                  <Text style={{ width: "100%", fontSize: 12 }}>Carnet</Text>
                  <TextInput style={loginstyle.inputs} />
                  <Text style={{ width: "100%", fontSize: 12 }}>Correo</Text>
                  <TextInput style={loginstyle.inputs} />
                  <Text style={{ width: "100%", fontSize: 12 }}>Password</Text>
                  <TextInput style={loginstyle.inputs} />
                  <Text style={{ width: "100%", fontSize: 12 }}>Genero</Text>
                  <TextInput style={loginstyle.inputs} />
                </>
              )}
            </View>
            <View style={{ marginVertical: 10, padding: 20 }}>
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
                  onPress={() => {
                    router.push("/home");
                  }}
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
