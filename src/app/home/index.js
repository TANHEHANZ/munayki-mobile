import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, sharedStyles } from "../../styles/CompStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getRequestWithCache, peticionGet } from "../../utilitis/getRequest";
import { imgdata } from "../../../assets/icon.png";
import { getRandomColor } from "../../components/colorRandom";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginstyle } from "../../styles/style";
const HomeScreens = () => {
  const [data, setData] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const onRefresh = async () => {
    setRefreshing(true);
    const result = await peticionGet("info");
    setData(result);
    setRefreshing(false);
  };

  const fetchData = async () => {
    try {
      const cachedData = await getRequestWithCache("info");
      if (cachedData) {
        setData(cachedData);
      } else {
        const result = await peticionGet("info");
        setData(result);
      }
    } catch (error) {
      console.log("Error al obtener datos:", error);
      setRefreshing(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.bodyContainer}>
      <Image
        source={require("../../../assets/fondo/logob.png")}
        style={{ ...loginstyle.logos, width: 300, height: 50 }}
      />
      <View
        style={{
          paddingLeft: windowWidth * 0.06,
          paddingRight: windowWidth * 0.10,
          height: windowWidth * 0.22,
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
            padding: windowWidth * 0.022,
            borderRadius: windowWidth * 0.50,
            borderWidth: 0,
          }}
          onPress={() => router.push("/home/dataAudio")}
        >
          <FontAwesome name="download" size={30} color={"rgb(73,39,121)"} />
        </TouchableOpacity>
      </View>
      <Text style={{ marginLeft: windowWidth * 0.06, marginVertical: windowWidth * 0.020 }}>
        Informaciones
      </Text>
      <View
        style={{
          height: windowWidth * 1.02,
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.C, colors.AA]}
              progressBackgroundColor="#000"
            />
          }
          horizontal
          style={{
            paddingVertical: windowWidth * 0.02,
            backgroundColor: "#0001",
            borderTopWidth: windowWidth * 0.002,
            borderBottomWidth: windowWidth * 0.002,
            borderColor: "#0001",
            height: windowWidth * 1,
          }}
        >
          {data &&
            Object.entries(data).map(([key, value], index) => (
              <TouchableOpacity
                style={{
                  width: windowWidth * 0.7,
                  backgroundColor: getRandomColor(),
                  marginHorizontal: windowWidth * 0.05,
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
                key={index}
                onPress={() => Linking.openURL(value.url)}
              >
                <View style={{ justifyContent: "center", display: "flex", flexDirection: "column", width: "100%" }}>
                  <Image
                    source={{ uri: value.imagen || imgdata }}
                    style={{ width: "100%", height: "54%" }}
                    resizeMethod="auto"
                    resizeMode="cover"
                  />
                  <Text
                    style={{
                      width: windowWidth * 1,
                      fontSize: windowWidth * 0.036,
                      height: "17%",
                      color: "#fff",
                      padding: windowWidth * 0.01,
                    }}
                  >
                    {value.titulo}
                  </Text>
                  <Text
                    style={{
                      fontSize: windowWidth * 0.036,
                      height: windowWidth * 0.20,
                      borderTopWidth: windowWidth * 0.002,
                      borderColor: "#0005",
                      padding: windowWidth * 0.01,
                      color: "#fff",
                      position: "relative",
                      textAlign: "justify",
                      width: "90%",
                      padding: windowWidth * 0.016
                    }}
                  >
                    {value.cuerpo}
                  </Text>
                  <TouchableOpacity
                    style={{
                      height: windowWidth * 0.2,
                      elevation: 1,
                      bottom: windowWidth * 0.01,
                    }}
                    onPress={() => Linking.openURL(value.url)}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        backgroundColor: "#0007",
                        position: "absolute",
                        width: windowWidth * 0.3,
                        height: windowWidth * 0.1,
                        padding: windowWidth * 0.020,
                        borderRadius:  windowWidth * 0.016,
                        right: - windowWidth * 0.02,
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
