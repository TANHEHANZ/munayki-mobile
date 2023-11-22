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

const Panico = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);
  const [photoData, setPhotoData] = useState(null);
  const [recording, setRecording] = React.useState();
  const [porcentaje, setPorcentaje] = useState(0);
  const tipo =useState("wav");

  const [dataMultimedia, setDataMultimedia] = useState({
    foto: "",
    audio: "",
    longitud: "",
    latitud: "",
    fecha: new Date().toISOString(),
  });
  const [fotosuser, setFotosuser] = useState("");

  const user = useUserStore((state) => state.user);

  const location = useLocationStore((state) => state.location);
  console.log("user", user.data.id);
  console.log("location", location.coords.longitude, location.coords.latitude);
  let userData = user.data.id;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleSend = async () => {
    if (location) {
      const res = await peticionPost("Multimedia/" + userData, {
        foto: fotosuser,
        fecha: dataMultimedia.fecha,
        audio: dataMultimedia.audio,
        longitud: +location.coords.longitude,
        latitud: +location.coords.latitude,
      });
      console.log(res);
      res && res.message === "Multimedia creada con éxito para el usuario"
        ? (router.replace("/login"), alert("Reporte enviado"))
        : alert(res.message);
    } else {
      console.error("Location is null");
    }
  };

  useEffect(() => {
    if (fotosuser.length > 0) {
      handleSend();
    }
  }, [fotosuser]);

  const handleCapturePhoto = async () => {
    try {
      if (hasPermission && cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo taken:", photo);
        await enviar(photo.uri);
        await MediaLibrary.saveToLibraryAsync(photo.uri);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const enviar = async (photoData) => {
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
