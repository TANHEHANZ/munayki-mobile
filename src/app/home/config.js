import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal"; // Importa el componente Modal
import { colors } from "../../styles/CompStyle";
import { loginstyle, modal } from "../../styles/style";
import { router } from "expo-router";
import useUserStore from "../../components/context/UserContext";

const Config = () => {
  const [cargaimg, setCargaimg] = useState(true);
  const [verDatos, setVerDatos] = useState(false);
  const [patron, setPatron] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const patronCorrecto = "1234";
  const user = useUserStore((state) => state.user);

  const verificarPatron = () => {
    if (patron === patronCorrecto) {
      setVerDatos(true);
    } else {
      alert("Patrón incorrecto. Inténtalo de nuevo.");
    }
    setIsModalVisible(false); // Oculta el modal después de verificar el patrón
  };

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
            <Text>Nombre del Usuario: {user.data.nombre}</Text>
            <Text>Apellido: {user.data.apellido}</Text>
            <Text>Edad: {user.data.edad}</Text>
            <Text>Género: {user.data.genero}</Text>
            <TouchableOpacity style={loginstyle.button}
            onPress={() => router.push("/home/reporets")}
            >
              <Text>Reportes enviados</Text>
            </TouchableOpacity>
            <TouchableOpacity style={loginstyle.button} onPress={() => router.push("/home/contactuser")}>
              <Text>Administrar contactos</Text>
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
            <View style={{flexDirection:"row", justifyContent:"space-between", borderBottomWidth:2, paddingVertical:20, borderBottomColor:"#0002",}}>
              <Text style={modal.modalTitle}>Ingresa el patrón</Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <FontAwesome name="close" size={20} color={colors.CC} />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder="Ingresa el patrón"
              secureTextEntry={true}
              style={{ ...loginstyle.inputs, borderBottomWidth: 2 }}
              value={patron}
              onChangeText={(text) => setPatron(text)}
            />
            <TouchableOpacity style={loginstyle.button} onPress={verificarPatron}>
              <Text>Verificar Patrón</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Config;
