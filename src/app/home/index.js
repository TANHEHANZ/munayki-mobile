import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, sharedStyles } from "../../styles/CompStyle";
import {
  colaboracionesStyle,
  dataScroll,
  loginstyle,
} from "../../styles/style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useLocationStore from "../../components/context/UbicacionContext";
import * as Location from "expo-location";
import { peticionGet } from "../../utilitis/getRequest";
import { imgdata } from "../../../assets/icon.png";
import Informativa from "./informativa";

const HomeScreens = () => {
  const setLocation = useLocationStore((state) => state.setLocation);
  const location = useLocationStore((state) => state.location);
  const [data, setData] = useState("");
  let colorArray = [colors.A, colors.B, colors.C, colors.D, colors.F];
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorArray.length);
    const color = colorArray[randomIndex];
    colorArray = colorArray.filter((_, index) => index !== randomIndex);
    if (colorArray.length == 0) {
      colorArray = [colors.A, colors.B, colors.C, colors.D, colors.F];
    }
    return color;
  };

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permiso de ubicación no otorgado");
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
    }
  };

  const fetchData = async () => {
    try {
      const result = await peticionGet("info");
      setData(result);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    getLocationAsync();
    fetchData();
  }, []);

  return (
    <View style={styles.bodyContainer}>
      <Text style={{ fontSize: 25, fontWeight: 600, padding: 20 }}>
        Munayki "Yo te Cuido"
      </Text>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          height: "13%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Como usar la Aplicacion</Text>
        <TouchableOpacity
          style={{
            ...sharedStyles.shadowBox,
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 30,
            borderWidth: 0,
          }}
        >
          <FontAwesome name="download" size={30} color={"rgb(73,39,121)"} />
        </TouchableOpacity>
      </View>
      <Text style={{ paddingLeft: 10, marginLeft: 20, marginTop: 15 }}>
        Informaciones
      </Text>
      <View
        style={{
          height: "63%",
        }}
      >
        <ScrollView
          horizontal
          style={{
            paddingVertical: 15,
            backgroundColor: "#0001",
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderColor: "#0001",
            height: 300,
          }}
        >
          {Object.entries(data).map(([key, value], index) => (
            <TouchableOpacity
              style={{
                width: 300,
                height: '100%',
                backgroundColor: getRandomColor(),
                marginHorizontal: 20,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              key={index}
            >
              <View>
                <Image
                  source={{ uri: value.imagen || imgdata }}
                  style={{ width: 300, height: '54%' }}
                  resizeMethod="auto"
                  resizeMode="cover"
                />
                <Text
                  style={{
                    fontSize: 14,
                    height: '17%',
                    color: "#fff",
                    padding: 8,
                  }}
                >
                  {value.titulo}
                </Text>
                <Text
                  style={{
                    height: 70,
                    borderTopWidth: 1,
                    borderColor: "#0005",
                    padding: 15,
                    color: "#fff",
                    position: "relative"
                  }}
                >
                  {value.cuerpo}
                </Text>
                <TouchableOpacity
                  style={{
                    height: 50,
                    elevation: 1,
                    bottom:20
                  }}
                  onPress={() => Linking.openURL(value.url)}
                >
                  <Text
                    style={{
                      color: "#fff",
                      backgroundColor: "#0007",
                      position:"absolute",
                      height: "100%",
                      width: 110,
                      paddingHorizontal: 20,
                      borderRadius:10,
                      right: -5,
                    }}
                  >
                    ver recurso
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreens;
const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    paddingVertical: 20,
  },
});
