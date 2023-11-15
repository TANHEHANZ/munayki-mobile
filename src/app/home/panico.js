import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { colors } from "../../styles/CompStyle";
import { sendCloudinary } from "../../utilitis/uploadImage";
import { peticionPost } from "../../utilitis/postRequest";
import useUserStore from "../../components/context/UserContext";
import useLocationStore from "../../components/context/UbicacionContext";
import { router } from "expo-router";
import { Audio } from 'expo-av';

const Panico = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [recording, setRecording] = React.useState();
  const [porcentaje, setPorcentaje] = useState(0);
  const tipo =useState("wav");

  const [dataMultimedia, setDataMultimedia] = useState({
    foto: "",
    fecha: new Date().toISOString(),
    usuarioId: "",
    ubicacionId: "",
  });
  const [fotosuser, setFotosuser] = useState("");

  const user = useUserStore((state) => state.user);
  // const location = useLocationStore((state) => state.location);
  console.log("user", user.data.id);
  // console.log("location",location.coords.longitude,location.coords.latitude);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
 useEffect(() => {
    if (fotosuser.length > 0) {
      handleSend();
    }
  }, [fotosuser]);
  const handleSend = async () => {
    const res = await peticionPost("Multimedia", {
      foto: fotosuser,
      fecha: dataMultimedia.fecha,
      usuarioId: +dataMultimedia.ubicacionId,
      ubicacionId: +dataMultimedia.ubicacionId,
    });
    res && res.message === "Multimedia creada con éxito"
      ? (router.replace("/login"), alert("Reporte enviado"))
      : alert(res.message);
  };

  const handleCapturePhoto = async () => {
    try {
      if (hasPermission && cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo taken:", photo);
        setPhotoData(photo.uri);
        await enviar();
        await MediaLibrary.saveToLibraryAsync(photo.uri);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const enviar = async () => {
    const url = await sendCloudinary(photoData, setPorcentaje);
    setFotosuser(url);
    console.log("Cloudinary URL:", url);
  };
  console.log(fotosuser);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

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
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Grabación detenida y almacenada en', uri);
      const url = await sendCloudinary(uri, setPorcentaje, "wav");
      console.log(url);
    }
    setRecording(undefined);
  }
 

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Camera
        style={{ flex: 1, opacity: 0 }}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          alignSelf: "center",
          padding: 20,
          backgroundColor: "white",
          borderRadius: 10,
        }}
        onPress={() => {
          handleCapturePhoto();
          if (recording) {
            stopRecording();
          } else {
            startRecording();
          }
        }}
      >
        <Text
          style={{
            width: 200,
            height: 200,
            backgroundColor: colors.primary,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            elevation: 10,
          }}
        ></Text>
      </TouchableOpacity>
    </View>
  );
};

export default Panico;
