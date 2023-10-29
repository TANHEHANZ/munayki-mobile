import { View, Text } from "react-native";
import React from "react";
import { colors, sharedStyles } from "../../styles/CompStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
// por mil noches
const Panico = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.CC,
      }}
    >
      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderColor: "#fff5",
          borderRadius: 200,
          width: 250,
          height: 250,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff9",
        }}
      >
        <View
          style={{
            width: 200,
            height: 200,
            backgroundColor: colors.primary,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            // ...sharedStyles.shadowBox,
            elevation:10,
          }}
        >
          <Text>Botton de panico</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Panico;
