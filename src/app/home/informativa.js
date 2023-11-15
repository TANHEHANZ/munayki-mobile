import { View, Text, ScrollView, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../styles/CompStyle";
import {
  dataScrollV,
} from "../../styles/style";
import React from "react";
import information from "../../documents/information.json";

const informativa = () => {
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
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
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
        Informacion
      </Text>
      <ScrollView
        vertical
        style={{
          paddingVertical: 30,
          height: "88%",
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: "#0001",
        }}
      >
        {Object.entries(information).map(([key, value], index) => (
          <TouchableOpacity
            style={{
              ...dataScrollV.div,
              width: 300,
              marginVertical: "3%",
              backgroundColor: getRandomColor(),
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