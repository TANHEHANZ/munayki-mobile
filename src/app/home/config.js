import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal"; // Importa el componente Modal
import { colors, sharedStyles } from "../../styles/CompStyle";
import { loginstyle, modal } from "../../styles/style";
import { router } from "expo-router";
import useUserStore from "../../components/context/UserContext";
import { peticionPost } from "../../utilitis/postRequest";

const Config = () => {
  const [cargaimg, setCargaimg] = useState(true);
  const [verDatos, setVerDatos] = useState(false);
  const [patron, setPatron] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useUserStore((state) => state.user);
  const [data, setData] = useState(0);
  const tokenLoguet = user.tokenLogauth;
  const fetchData = async () => {
    console.log(patron);
    try {
      const result = await peticionPost(
        "datosUser",
        { password: patron },
        "POST",
        tokenLoguet
      );
      console.log("resultado", result);
      setData(result);
      if (result.message === "Contraseña Correcta") {
        setVerDatos(true);
        setPatron("");
      } else {
        setVerDatos(false);
        alert(result.message);
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  const enviarCodigoWhatsApp = () => {
    const url = `whatsapp://send?text=${encodeURIComponent(data.data.nick)}`;
    Linking.openURL(url)
      .then((data) => {
        console.log("WhatsApp abierto:", data);
      })
      .catch((error) => {
        console.error("Error al abrir WhatsApp:", error);
      });
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
            <TouchableOpacity 
             onPress={enviarCodigoWhatsApp}
            >
              <Text style={{ color: "green", fontWeight: "600", fontSize: 18 ,}}>
                Codigo:{data.data.nick} 
                <TouchableOpacity
                  style={{
                    backgroundColor: "green",
                    padding: 2,
                    borderTopRightRadius: 30,
                    borderBottomRightRadius: 30,
                    borderTopLeftRadius: 30,
                
                  }}
                >
                  <FontAwesome name="whatsapp" size={20} color="#fff"  />
                </TouchableOpacity>
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  borderWidth: 1,
                  borderColor: "green",
                  padding: 10,
                }}
              >
                Este codigo debes proporcionarle a la persona que registran tu
                contacto
              </Text>
            </TouchableOpacity>
            <Text>Nombre del Usuario: {data.data.nombre}</Text>
            <Text>Apellido: {data.data.apellido}</Text>
            <Text>Edad: {data.data.edad}</Text>
            <Text>Género: {data.data.genero}</Text>
            <Text>Ubucacion: {data.data.ubicacion}</Text>
            <Text>Gmail: {data.data.correo}</Text>
            <Text>Telefono: {data.data.telefono}</Text>

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
              style={{
                ...loginstyle.inputs,
                borderBottomWidth: 2,
                padding: 10,
              }}
              value={patron}
              onChangeText={(text) => setPatron(text)}
            />
            <TouchableOpacity
              style={loginstyle.button}
              onPress={() => (fetchData(), setIsModalVisible(false))}
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
