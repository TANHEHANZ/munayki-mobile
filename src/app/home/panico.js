import { View, Text } from "react-native";
import React from "react";
import { colors } from "../../styles/CompStyle";
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
   <TouchableOpacity>
   <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: colors.primary,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Botton de panico</Text>
      </View>
   </TouchableOpacity>
    </View>
  );
};

export default Panico;
