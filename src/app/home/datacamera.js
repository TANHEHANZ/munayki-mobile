import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { upload } from "cloudinary-react-native";
import { sendCloudinary } from "../../utilitis/uploadImage";

const Datacamera = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [capturedFrontal, setCapturedFrontal] = useState(null);
  const [capturedRear, setCapturedRear] = useState([]);
  const [capturedPhotos, setCapturedPhotos] = useState(0);

  const [porcentaje, setPorcentaje] = useState(0);
  const tipo =useState("png");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log("Foto tomada:", photo);

      if (cameraType === Camera.Constants.Type.front && !capturedFrontal) {
        setCapturedFrontal(photo.uri);
        setTipo(tipo);
      } else if (
        cameraType === Camera.Constants.Type.back &&
        capturedRear.length < 2
      ) {
        setCapturedRear((prevPhotos) => [...prevPhotos, photo.uri]);
      }

      setCapturedPhotos((prevPhotos) => prevPhotos + 1);
    }
  };


  useEffect(() => {

const enviar = async ()=>{
    const url = await sendCloudinary(capturedFrontal, setPorcentaje, tipo);
    console.log(url)
}

    console.log("datocapuardo",capturedFrontal);
    if (capturedFrontal) {
       enviar();
    }
  }, [capturedFrontal]);

  useEffect(() => {
    if (capturedFrontal || capturedRear.length === 2) {
      console.log("Las tres fotos han sido capturadas");
      console.log("Foto frontal:", capturedFrontal);
      console.log("Fotos traseras:", capturedRear);
    }
  }, [capturedFrontal, capturedRear]);
  console.log(porcentaje);
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={cameraType} ref={cameraRef}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center",
            }}
            onPress={() => {
              setCameraType(
                cameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Cambiar cámara{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          onPress={takePicture}
          style={{ padding: 20, backgroundColor: "white", borderRadius: 10 }}
        >
          <Text>Tomar Foto</Text>
        </TouchableOpacity>
      </View>
      {capturedFrontal && (
        <ScrollView horizontal>
          <Text>Foto Frontal:</Text>
          <Image
            source={{ uri: capturedFrontal }}
            style={{ width: 300, height: 400 }}
          />
        </ScrollView>
      )}

      {capturedRear.length > 0 && (
        <ScrollView horizontal>
          <Text>Fotos Traseras:</Text>
          {capturedRear.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={{ width: 300, height: 400 }}
            />
          ))}
        </ScrollView>
      )}

      {capturedPhotos === 3 && <Text>Todas las fotos han sido capturadas</Text>}
    </View>
  );
};

export default Datacamera;
