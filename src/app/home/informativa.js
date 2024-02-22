import { View, Text, ScrollView, Linking, Image, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../styles/CompStyle";
import React, { useEffect, useState } from "react";
import { peticionGet, getRequestWithCache } from "../../utilitis/getRequest";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { MapasData } from "../../documents/mapa";
import { loginstyle } from "../../styles/style";

const Informativa = () => {
  const [data, setData] = useState("");

  const fetchData = async () => {
    try {
      const result = await getRequestWithCache("info");
      setData(result);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const openMap = (link) => {
    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.error("No se puede abrir la aplicación de mapas.");
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ScrollView vertical>
      <View
        style={{
          flex: 1,
          gap: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: colors.CC,
            textAlign: "left",
            width: "100%",
            padding: "5%",
          }}
        >
          <FontAwesome name="info" size={20} color="rgb(73,39,121)" /> Recursos
          informativos
        </Text>
        <ScrollView
          horizontal
          style={{
            height: 100,
            backgroundColor: "#0002",
            paddingVertical: 10,
          }}
        >
          {Object.entries(data).map(([key, value], index) => (
            <View
              style={{
                width: 350,
                height: 80,
                backgroundColor: colors.CC,
                marginHorizontal: 10,
                padding: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={index}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  width: 200,
                }}
              >
                <Image
                  source={{ uri: value.imagen || "uri:imgdata" }}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={{ color: "#fff" }}>{value.titulo}</Text>
              </View>
              <TouchableOpacity onPress={() => Linking.openURL(value.url)}>
                <Text
                  style={{
                    color: "blue",
                    backgroundColor: "#fff",
                    paddingHorizontal: 25,
                    paddingVertical: 5,
                    borderRadius: 5,
                    elevation: 3,
                  }}
                >
                  Ver
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <Text
          style={{
            fontSize: 15,
            color: colors.CC,
            textAlign: "left",
            width: "100%",
            padding: "5%",
          }}
        >
          <FontAwesome name="map" size={20} color="rgb(73,39,121)" /> Donde
          acudir en caso de denuncia{" "}
        </Text>

        <FlatList
          horizontal
          style={{
            height: 140,
            backgroundColor: "#0002",
            paddingVertical: 10,
          }}
          data={MapasData.entidades}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                width: 200,
                height: 130,
                backgroundColor: colors.FF,
                marginHorizontal: 10,
                padding: 20,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  width: 200,
                }}
              >
                <FontAwesome name="map" size={20} color="#fff" />
                <Text style={{ color: "#fff" }}>{item.nombre}</Text>
              </View>
              <TouchableOpacity onPress={() => openMap(item.link)}>
                <Text
                  style={{
                    color: "blue",
                    backgroundColor: "#fff",
                    paddingHorizontal: 25,
                    paddingVertical: 5,
                    borderRadius: 5,
                    elevation: 3,
                  }}
                >
                  Abrir mapa
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
       <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginTop:"10%"}}>
       <Image
        source={require("../../../assets/fondo/logocA.png")}
        style={{ ...loginstyle.logos, width: 60, height: 120 }}
      />
           <Image
        source={require("../../../assets/fondo/logoc.png")}
        style={{ ...loginstyle.logos, width: 210, height: 60 }}
      />
       </View>
      </View>
    </ScrollView>
  );
};

export default Informativa;
