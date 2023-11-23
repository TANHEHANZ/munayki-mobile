import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function DataAudio(){
    const [recording, setRecording]= useState();
    const [recordings, setRecordings]=useState([]);

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
            const { sound, status } = await recordingToStop.createNewLoadedSoundAsync();
            let allRecordings = [...recordings];
            allRecordings.push({
                sound: sound,
                duration: getDurationFormated(status.durationMillis),
                file: recordingToStop.getURI()
            });
    
            setRecordings(allRecordings);
            setRecording(undefined);
        } else {
            console.error('No recording to stop');
        }
    }   
      
    function getDurationFormated(milliseconds){
        const minutes = milliseconds / 1000 / 60;
        const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
        return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
    }
    function getRecordingLines(){
        return recordings.map((recordingLine, index) => {
            return (
              <View key={index} style={styles.row}>
                <Text style={styles.fill}>
                  Recording #{index + 1} | {recordingLine.duration}
                </Text>
                <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
              </View>
            );
        });
    }
    function clearRecording(){setRecordings([])}

    return(
        <View style={styles.container}>
            <Button title={recording ? 'Stop Recording':'Start Recording'} onPress={recording?stopRecording:startRecording}/>
            {getRecordingLines()}
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