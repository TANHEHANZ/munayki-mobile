import {
  View,
  Text,
  StatusBar,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { loginstyle } from "../../styles/style";
import { TextInput } from "react-native-paper";

const Login = () => {
  return (
    <View style={loginstyle.container}>
      <StatusBar style={{ backgroundColor: "#fff" }} />
      <Text style={loginstyle.title}>Inicia sesión</Text>
      <View>
        <Text style={{ margin: 5 }}>Nombre de usuario</Text>
        <TextInput style={loginstyle.inputs} />
        <Text style={{ margin: 5 }}>Contraseña</Text>
        <TextInput style={loginstyle.inputs} />
        <TouchableOpacity style={loginstyle.button}>
          <Text style={{color:"#fff"}}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
