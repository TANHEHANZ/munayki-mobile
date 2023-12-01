import { View, Text, ScrollView, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../styles/CompStyle";
import {
  dataScrollV,
} from "../../styles/style";
import React from "react";
import information from "../../documents/information.json";
import useLocationStore from "../../components/context/UbicacionContext";

const informativa = () => {
  let colorArray = [colors.A, colors.B, colors.C, colors.D, colors.F];
  const location = useLocationStore((state) => state.location);
  console.log(location);
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorArray.length);
    const color = colorArray[randomIndex];
    colorArray = colorArray.filter((_, index) => index !== randomIndex);
    if (colorArray.length == 0) {
      colorArray = [colors.A, colors.B, colors.C, colors.D, colors.F];
    }
    return color;
  };

  return (
    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: "center",
        flex:1
      }}
    >
      <Text
        style={{
          fontSize: 30,
          color: colors.black,
          textAlign: "center",
          width: "100%",
          padding: "2%",
        }}
      >
        Información
      </Text>
      <ScrollView
        vertical
        style={{
          height: "80%",
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: "#0001",
          paddingLeft:'10%',
        }}
      >
        {Object.entries(information).map(([key, value], index) => (
          <TouchableOpacity
            style={{
              ...dataScrollV.div,
              marginVertical: "3%",
              borderColor: getRandomColor(),
              borderWidth:2,
              backgroundColor:colors.primary,
            }}
            key={index}
            onPress={() => Linking.openURL(value.link)}
          >
            <View>
              <Text style={{ ...dataScrollV.title }}>{key}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default informativa;
