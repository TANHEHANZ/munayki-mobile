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
import information from "../../documents/information.json";
import useLocationStore from "../../components/context/UbicacionContext";
import * as Location from "expo-location";
const HomeScreens = () => {

  const setLocation = useLocationStore((state) => state.setLocation);
  const location = useLocationStore((state) => state.location);

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
  useEffect(() => {
    getLocationAsync();
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
          height:'13%',
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
      <Text style={{ paddingLeft: 10, marginLeft: 20, marginTop:15 }}>
        Informaciones
      </Text>
      <View style={{
          height:'63%'}}>
            <ScrollView
              horizontal
              style={{
                paddingVertical: 15,
                backgroundColor: "#0001",
                borderTopWidth: 2,
                borderBottomWidth: 2,
                borderColor: "#0001",
              }}
            >
              {Object.entries(information).map(([key, value], index) => (
                <TouchableOpacity
                  style={{
                    ...dataScroll.div,
                    width: 300,
                    backgroundColor: getRandomColor(),
                  }}
                  key={index}
                  onPress={() => Linking.openURL(value.link)}
                >
                  <View>
                    <Text style={{ ...dataScroll.title }}>{key}</Text>
                    <Text style={{ ...dataScroll.text }}>{value.algoVistoso}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
      </View>
      

      {/* <View style={{ padding: 20, height: 100 }}>
        <Text>Colaboraciones</Text>
        <View style={colaboracionesStyle.section}>
          <TouchableOpacity style={colaboracionesStyle.text}>
            <Text style={{ color: colors.primary , fontSize:11, }}> Slim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={colaboracionesStyle.text}>
            <Text style={{ color: colors.primary , fontSize:11, }}> Fcc</Text>
          </TouchableOpacity>
          <TouchableOpacity style={colaboracionesStyle.text}>
            <Text style={{ color: colors.primary , fontSize:11, }}> Save Children</Text>
          </TouchableOpacity>
          <TouchableOpacity style={colaboracionesStyle.text}>
            <Text style={{ color: colors.primary , fontSize:11, }}> World Vision</Text>
          </TouchableOpacity>
          <TouchableOpacity style={colaboracionesStyle.text}>
            <Text style={{ color: colors.primary , fontSize:11, }}> Iff</Text>
          </TouchableOpacity>
          <TouchableOpacity style={colaboracionesStyle.text}>
            <Text style={{ color: colors.primary , fontSize:11, }}> Unifranz</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      {/* <View
        style={{ height: 80, justifyContent: "center", alignItems: "center"}}
      >
        <ScrollView horizontal style={{ marginTop: 1, height:'20%'}}>
          
          <Image
            source={require("../../../assets/LOGOS/logo_Unifranz.png")}
            style={loginstyle.logos}
          />
          <Image
            source={require("../../../assets/LOGOS/save.png")}
            style={loginstyle.logos}
          />
          <Image
            source={require("../../../assets/LOGOS/vision.jpeg")}
            style={loginstyle.logos}
          />
        </ScrollView>
      </View> */}
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
