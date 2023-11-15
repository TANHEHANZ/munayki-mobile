import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, sharedStyles } from "../../styles/CompStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import KeyEvent from "react-native-keyevent";
import VolumeControl from "react-native-volume-control";

const Panico = () => {
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   const initializeVolumeControl = async () => {
  //     try {
  //       await VolumeControl.init();
  //       VolumeControl.onVolumeUp((event) => {
  //         setCount(count + 1);
  //       });
  //     } catch (error) {
  //       console.error("Error al inicializar el módulo VolumeControl:", error);
  //     }
  //   };
  
  //   initializeVolumeControl();
  
  //   return () => {
  //     VolumeControl.stop();
  //   };
  // }, [count]);

  // useEffect(() => {
  //   VolumeControl.onVolumeUp((event) => {
  //     setCount(count + 1);
  //   });
  //   return () => {
  //     VolumeControl.stop();
  //   };
  // }, [count]);

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
            elevation: 10,
          }}
        >
        
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Panico;
