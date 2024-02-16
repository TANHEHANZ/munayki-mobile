import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { peticionPost } from "../../utilitis/postRequest";
import { TouchableOpacity } from "react-native-gesture-handler";
import useUserStore from "../../components/context/UserContext";
import { peticionGet } from "../../utilitis/getRequest";

const verREporte = () => {
  const [data, setData] = useState("");

    const user = useUserStore((state) => state.user);
  let userData = user.login[0].id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await peticionGet("user/" + userData + "/contacts");
        setData(result);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);
  
  const enviarEmailsAContactos = async () => {
    if (data && data.length > 0) {

      for (let i = 0; i < data.length; i++) {
        const email = data[i].email; 
  
        const res = await peticionPost("send-email", {
          to: email, 
          subject: "reporte de alerta MUNAYKI",
          body: "se a precionado el boton de panico , se a recopilado estos datos : ",
        });
  
        if (res && res.message === "Correo enviado correctamente") {
          console.log(`Correo enviado a ${email} con éxito`);
        } else {
          console.log(`No se pudo enviar correo a ${email}`);
        }
      }
    }
  };
  

  return (
    <View>
      <TouchableOpacity onPress={() => enviarEmailsAContactos()}>
        <Text>enviar email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default verREporte;
