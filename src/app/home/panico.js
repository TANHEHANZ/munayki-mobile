import React, { useRef, useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { colors } from "../../styles/CompStyle";
import { sendCloudinary } from "../../utilitis/uploadImage";
import { peticionPost } from "../../utilitis/postRequest";
import useUserStore from "../../components/context/UserContext";
import useLocationStore from "../../components/context/UbicacionContext";
import { Audio } from "expo-av";
import { useTokenContact } from "../../components/context/ContactContext";
import { sendPushNotification } from "./altertas/pushnotification";
import { handleUpdate } from "../../routing/navigationtop";

const Panico = () => {
  const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
  const [hasPermissionAudio, setHasPermissionAudio] = useState(null);
  const cameraRef = useRef(null);
  const [fotosuser, setFotosuser] = useState("");
  const [audioUser, setAudioUser] = useState("");
  const location = useLocationStore((state) => state.location);
  const user = useUserStore((state) => state.user);
  let userData = user.login[0].id;
  const { tokencontact } = useTokenContact();

  const handleSendNotification = async () => {
    await sendPushNotification(tokencontact, user);
  };
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

  const handleSend = async () => {
    if (fotosuser.length > 0 && audioUser.length > 0) {
      const res = await peticionPost("sendAlert-Email/" + userData, {
        foto: fotosuser,
        audio: audioUser,
        longitud: +location.coords.longitude,
        latitud: +location.coords.latitude,
      });
      res && res.message === "Correos enviados y datos guardados correctamente"
        ? handleUpdate(userData)
        : alert(res.message);
    }
  };
  useEffect(() => {
    handleSend();
  }, [fotosuser, audioUser]);

  const handleCapturePhoto = async () => {
    try {
      if (hasPermissionCamera && cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.3,
          width: 400,
          height: 600,
        });
        await enviarFoto(photo.uri);
        await MediaLibrary.saveToLibraryAsync(photo.uri);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const enviarFoto = async (photoData) => {
    const url = await sendCloudinary(photoData);
    setFotosuser(url);
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
        setTimeout(() => {
          if (newRecording) {
            stopRecording(newRecording);
          }
        }, 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecording = async (recordingToStop) => {
    if (recordingToStop) {
      await recordingToStop.stopAndUnloadAsync();
      const uri = recordingToStop.getURI();
      if (uri) {
        const url = await sendCloudinary(uri);
        setAudioUser(url);
      }
    }
  };

  const handleCaptureAndRecord = async () => {
    try {
      await Promise.all([
        handleCapturePhoto(),
        startRecording(),
        handleSendNotification(),
      ]);
    } catch (error) {
      console.error("Error capturing photo and recording audio:", error);
    }
  };
  if (hasPermissionCamera === null || hasPermissionAudio === null) {
    return <View />;
  }
  if (hasPermissionCamera === false || hasPermissionAudio === false) {
    return (
      <Text>No tienes acceso {hasPermissionCamera ? "audio" : "camara"}</Text>
    );
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
            backgroundColor: colors.CC,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            elevation: 10,
            borderWidth: 8,
            borderColor: "#fff9",
          }}
        ></Text>
      </TouchableOpacity>
    </View>
  );
};

export default Panico;
