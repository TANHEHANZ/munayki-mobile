import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal"; // Importa el componente Modal
import { colors, sharedStyles } from "../../styles/CompStyle";
import { loginstyle, modal } from "../../styles/style";
import { router } from "expo-router";
import useUserStore from "../../components/context/UserContext";

const Config = () => {
  const [cargaimg, setCargaimg] = useState(true);
  const [verDatos, setVerDatos] = useState(false);
  const [patron, setPatron] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const user = useUserStore((state) => state.user);
  const password = useUserStore((state) => state.password);
  const patronCorrecto = password;

  const verificarPatron = () => {
    if (patron === patronCorrecto) {
      setVerDatos(true);
    } else {
      alert("Patrón incorrecto. Inténtalo de nuevo.");
    }
    setIsModalVisible(false);
  };

  console.log(password);
  console.log(user);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 20,
      }}
    >
      <View>
        {cargaimg ? (
          <FontAwesome
            name="user"
            size={100}
            color="rgb(73,39,121)"
            style={{
              width: 110,
              height: 200,
              paddingHorizontal: 20,
              paddingVertical: 40,
              borderRadius: 100,
              borderColor: "#000",
              borderWidth: 2,
              backgroundColor: "#0001",
            }}
          />
        ) : (
          <Image source={require("../../../assets/LOGOS/logo_Unifranz.png")} />
        )}
      </View>
      <View style={{ width: "60%" }}>
        <Text
          style={{
            width: "100%",
            fontSize: 22,
            marginVertical: 20,
            color: colors.CC,
            fontWeight: 600,
          }}
        >
          Datos del Usuario
        </Text>
        {verDatos ? (
          <View style={{ gap: 10 }}>
            <View style={{ ...sharedStyles.shadowBox,  }}>
              <Text style={{ color: "green", fontWeight: "600" }}>
                Codigo: {user.login[0].nick}
              </Text>
              <Text
                style={{ fontSize: 14, borderWidth: 1, borderColor: "green" ,padding:10,}}
              >
                Este codigo debes proporcionarle a la persona que registran tu
                contacto
              </Text>
            </View>
            <Text>Nombre del Usuario: {user.login[0].nombre}</Text>
            <Text>Apellido: {user.login[0].apellido}</Text>
            <Text>Edad: {user.login[0].edad}</Text>
            <Text>Género: {user.login[0].genero}</Text>
            <Text>Ubucacion: {user.login[0].ubicacion}</Text>
            <Text>Gmail: {user.login[0].correo}</Text>
            <Text>Telefono: {user.login[0].telefono}</Text>

            <TouchableOpacity
              style={loginstyle.button}
              onPress={() => router.push("/home/reporets")}
            >
              <Text>Reportes enviados</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={loginstyle.button}
              onPress={() => router.push("/home/contactuser")}
            >
              <Text>Administrar contactos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={loginstyle.button}
              onPress={() => router.push("/home/resultQuizz")}
            >
              <Text>Ver resultados quizz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...loginstyle.button,
                marginVertical: 0,
                width: "50%",
                backgroundColor: colors.CC,
              }}
              onPress={() => setVerDatos(false)}
            >
              <Text style={{ color: colors.primary }}>Ocultar datos</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={loginstyle.button}
              onPress={() => setIsModalVisible(true)}
            >
              <Text>Ver Datos del Usuario</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal isVisible={isModalVisible}>
          <View style={modal.modalContent}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: 2,
                paddingVertical: 20,
                borderBottomColor: "#0002",
              }}
            >
              <Text style={modal.modalTitle}>Ingresa la contraseña</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <FontAwesome name="close" size={20} color={colors.CC} />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Ingresa la contraseña"
              secureTextEntry={true}
              style={{ ...loginstyle.inputs, borderBottomWidth: 2 ,padding:10,}}
              value={patron}
              onChangeText={(text) => setPatron(text)}
            />
            <TouchableOpacity
              style={loginstyle.button}
              onPress={verificarPatron}
            >
              <Text>Verificar Contraseña</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Config;
