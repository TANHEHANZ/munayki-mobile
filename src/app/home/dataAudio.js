import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import { sendCloudinary } from "../../utilitis/uploadImage";

export default function DataAudio(){
    const [recording, setRecording]= useState();
    const [recordings, setRecordings]=useState([]);
    const [hasPermission, setHasPermission] = useState(null);
    const [capturedAudio, setCapturedAudio]=useState(null);
    const [sound, setSound] = useState(null);
    const [porcentaje, setPorcentaje] = useState(0);
    const tipo =useState("m4a");

    useEffect(() => {
        (async () => {
          const { status } = await Audio.requestPermissionsAsync();
          setHasPermission(status === "granted");
        })();
      }, []);

    async function startRecording(){
        try{
            const perm = await Audio.requestPermissionsAsync();
            if(perm.status === "granted"){
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });
                const { recording: newRecording } = await Audio.Recording.createAsync(Audio.Recoding_OPTIONS_PRESET_HIGH_QUALITY);
                setRecording(newRecording);
    
                setTimeout(() => {
                    if (newRecording) {
                        stopRecording(newRecording);
                    }
                }, 5000);
            }
        } catch(e) {}
    }
    
    async function stopRecording(recordingToStop){
        if (recordingToStop) {
            await recordingToStop.stopAndUnloadAsync();
            const { sound: newSound, status } = await recordingToStop.createNewLoadedSoundAsync();
            const uri = recordingToStop.getURI();
            setCapturedAudio(uri);
            setSound(newSound);
            setRecording(undefined);
        } else {
            console.error('No recording to stop');
        }
    }

    function playRecording() {
        if (sound) {
            sound.replayAsync();
        } else {
            console.error('No sound to play');
        }
    }

    useEffect(() => {

        const enviar = async ()=>{
            const url = await sendCloudinary(capturedAudio, setPorcentaje, tipo);
            console.log(url)
        }
        
            console.log("datocapuardo",capturedAudio);
            if (capturedAudio) {
                enviar();
            }
    }, [capturedAudio]);

    return(
        <View style={styles.container}>
            <Button title={recording ? 'Stop Recording':'Start Recording'} onPress={recording?stopRecording:startRecording}/>
            <Button title={sound ? 'Play Recording' : ''} onPress={playRecording}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 40
    },
    fill: {
      flex: 1,
      margin: 15
    }
  });