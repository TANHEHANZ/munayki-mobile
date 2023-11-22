import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function DataAudio(){
    const [recording, setRecording]= useState();

    async function startRecording(){
        try{
            const perm = await Audio.requestPermissionsAsync();
            if(perm.status === "granted"){
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true
                });
                const {recording}=await Audio.Recording.createAsync(Audio.Recoding_OPTIONS_PRESET_HIGH_QUALITY);
                setRecording(recording);

                setTimeout(()=>{stopRecording();},5000)
            }
        }catch(e){}
    }
    async function stopRecording(){
        setRecording(undefined);

        await recording.stopAndUnloadAsync();
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        const newRecording={
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI()
        };

        setRecordings(newRecording);
    }
    function getDurationFormatted(milliseconds){
        const minutes = milliseconds / 1000 / 60;
        const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
        return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
    }
    function clearRecording(){setRecordings([])}

    return(
        <View style={styles.container}>
            <Button title={recording ? 'Stop Recording':'Start Recording'} onPress={recording?stopRecording:startRecording}/>
            <Button title={recordings.length > 0 ? 'Clear Recordings': ''} onPress={clearRecording}/>
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