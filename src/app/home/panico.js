import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, sharedStyles } from "../../styles/CompStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import KeyEvent from "react-native-keyevent";
import VolumeControl from "react-native-volume-control";
import { Audio } from 'expo-av';
import { sendCloudinary } from "../../utilitis/uploadImage";

const Panico = () => {
  const [count, setCount] = useState(0);
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
  const [recording, setRecording] = React.useState();
  const [porcentaje, setPorcentaje] = useState(0);
  const tipo =useState("wav");
  async function startRecording() {
    try {
      console.log('Solicitando permisos..');
      await Audio.requestPermissionsAsync();

      console.log('Iniciando grabación..');
      const { recording } = await Audio.Recording.createAsync({
          ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
          android: {
            extension: '.wav',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          },
          ios: {
            extension: '.wav',
            outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          },
        }
      );
      setRecording(recording);
      console.log('Grabación iniciada');

      // Detener la grabación después de 3 segundos
      setTimeout(() => {
        stopRecording();
      }, 3000);
    } catch (err) {
      console.error('Error al iniciar la grabación', err);
    }
  }

  async function stopRecording() {
    console.log('Deteniendo grabación..');
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Grabación detenida y almacenada en', uri);
    const url = await sendCloudinary(uri, setPorcentaje, "wav");
    console.log(url);
    setRecording(undefined);
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.CC,
      }}
    >
      <TouchableOpacity onPress={recording ? stopRecording : startRecording}
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
        <Text>
          {recording ? 'Detener grabación' : 'Iniciar grabación'} 
        </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Panico;
