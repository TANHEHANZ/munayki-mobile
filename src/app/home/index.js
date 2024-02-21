import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  RefreshControl,
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
const HomeScreens = () => {
  const [data, setData] = useState("");
  const [refreshing, setRefreshing] = useState(false);

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
          onPress={() => router.push("/home/dataAudio")}
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
            paddingVertical: 15,
            backgroundColor: "#0001",
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderColor: "#0001",
            height: 300,
          }}
        >
          {data &&
            Object.entries(data).map(([key, value], index) => (
              <TouchableOpacity
                style={{
                  width: 300,
                  felx: 1,
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
                    style={{ width: 300, height: "54%" }}
                    resizeMethod="auto"
                    resizeMode="cover"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      height: "17%",
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
                      position: "relative",
                    }}
                  >
                    {value.cuerpo}
                  </Text>
                  <TouchableOpacity
                    style={{
                      height: 50,
                      elevation: 1,
                      bottom: 20,
                    }}
                    onPress={() => Linking.openURL(value.url)}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        backgroundColor: "#0007",
                        position: "absolute",
                        flex: 1,
                        width: 110,
                        paddingHorizontal: 20,
                        borderRadius: 10,
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
