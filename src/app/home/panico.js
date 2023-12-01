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
import { Audio } from "expo-av";
import { useContactStore } from "../../components/context/ContactContext";
import SendIntentAndroid from "react-native-send-intent";
import { peticionGet } from "../../utilitis/getRequest";

const Panico = () => {
  const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
  const [hasPermissionAudio, setHasPermissionAudio] = useState(null);
  const cameraRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [recording, setRecording] = React.useState();
  const [porcentaje, setPorcentaje] = useState(0);
  const tipoFoto = useState("png");
  const tipoAudio = useState("m4a");
  const [data, setData] = useState("");

  const [dataMultimedia, setDataMultimedia] = useState({
    foto: "",
    audio: "",
    longitud: "",
    latitud: "",
    fecha: new Date().toISOString(),
  });
  const [fotosuser, setFotosuser] = useState("");
  const [audioUser, setAudioUser] = useState("");
  const location = useLocationStore((state) => state.location);
  const user = useUserStore((state) => state.user);
  let userData = user.data.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await peticionGet("user/" + userData + "/contacts");
        setData(result);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermissionCamera(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermissionAudio(status === "granted");
    })();
  }, []);

  const enviarDatosPorWhatsApp = (numero, datos) => {
    const mensaje =
      `¡Emergencia! Datos importantes:\n` +
      `Ubicación: Latitud ${datos.latitud}, Longitud ${datos.longitud}\n` +
      `Fecha: ${datos.fecha}\n` +
      `Foto: ${datos.fotosuser}\n` +
      `Audio: ${datos.audioUser}`;

    SendIntentAndroid.sendText({
      phoneNumber: numero,
      text: mensaje,
      title: "Mensaje de Emergencia",
    });
  };
  const enviarEmailsAContactos = async () => {
    if (data && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const email = data[i].email;
        const multimediaDataString = JSON.stringify(location);
        console.log(multimediaDataString);
        const res = await peticionPost("send-email", {
          to: email,
          subject: "reporte de alerta MUNAYKI desde el botton de panico",
          body: `
            Se ha presionado el botón de pánico. Datos recopilados: ,  foto recopilado :${fotosuser}, audio recopilado :${audioUser}
          ubiacion es : ${multimediaDataString}
          
            `,
        });

        if (res && res.message === "Correo enviado correctamente") {
          console.log(`Correo enviado a ${email} con éxito`);
        } else {
          console.log(`No se pudo enviar correo a ${email}`);
        }
      }
    }
  };

  const handleSend = async () => {
    console.log("handle audio: " + audioUser);
    if (location) {
      const res = await peticionPost("Multimedia/" + userData, {
        foto: fotosuser,
        fecha: dataMultimedia.fecha,
        audio: audioUser,
        longitud: +location.coords.longitude,
        latitud: +location.coords.latitude,
      });
      res && res.message === "Multimedia creada con éxito para el usuario"
        ? (router.replace("/login"),
          enviarEmailsAContactos(),
          alert("Reporte enviado"))
        : alert(res.message);
    } else {
      console.error("Location is null");
    }
  };

  useEffect(() => {
    if (fotosuser.length > 0 && audioUser.length > 0) {
      handleSend();
    }
  }, [fotosuser, audioUser]);

  const handleCapturePhoto = async () => {
    try {
      if (hasPermissionCamera && cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo taken:", photo);
        await enviarFoto(photo.uri);
        await MediaLibrary.saveToLibraryAsync(photo.uri);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const enviarFoto = async (photoData) => {
    const url = await sendCloudinary(photoData, setPorcentaje);
    setFotosuser(url);
    console.log("Cloudinary URL:", url);
  };

  const startRecording = async () => {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.Recoding_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(newRecording);

        setTimeout(() => {
          if (newRecording) {
            stopRecording(newRecording);
          }
        }, 5000);
      }
    } catch (e) {}
  };

  async function stopRecording(recordingToStop) {
    if (recordingToStop) {
      await recordingToStop.stopAndUnloadAsync();
      const { status } = await recordingToStop.createNewLoadedSoundAsync();
      const uri = recordingToStop.getURI();
      console.log("audio taken:", uri);
      setRecording(undefined);
      await enviarAudio(uri);
    } else {
      console.error("No recording to stop");
    }
  }

  const enviarAudio = async (audioData) => {
    console.log("enviar audio func: " + audioData);
    const url = await sendCloudinary(audioData, setPorcentaje);
    setAudioUser(url);
    console.log("Cloudinary URL:", url);
  };

  const handleCaptureAndRecord = async () => {
    try {
      await Promise.all([handleCapturePhoto(), startRecording()]);
      console.log(audioUser);
    } catch (error) {
      console.error("Error capturing photo and recording audio:", error);
    }
  };

  console.log(fotosuser);
  if (hasPermissionCamera === null) {
    return <View />;
  }
  if (hasPermissionCamera === false) {
    return <Text>No access to camera</Text>;
  }
  if (hasPermissionAudio === null) {
    return <View />;
  }
  if (hasPermissionAudio === false) {
    return <Text>No access to microphone</Text>;
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
          handleCaptureAndRecord();
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
