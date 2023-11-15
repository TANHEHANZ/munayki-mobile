import { View, Text, ScrollView } from 'react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, sharedStyles } from "../../styles/CompStyle";
import { colaboracionesStyle, dataScroll, loginstyle } from "../../styles/style";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useRoute } from '@react-navigation/native';
import React from 'react'
import information from '../../documents/information.json';

const documento =()=>{
    const route = useRoute();
    const {index}=route.params;
    console.log(index);
    const entries = Object.entries(information);
    if(index>=0 && index<entries.length){
        const [key, value]=entries[index];
        return(
            <View>
                <View style={{ ...dataScroll.div, width: 300 }}>
                    <Text style={{...dataScroll.title}}>{key}</Text>
                    <Text style={{...dataScroll.text}}>{value.textCompleto}</Text>
                </View>
            </View>
        )
    }else {
        return (
          <View>
            <Text>Índice no válido</Text>
          </View>
        );
    }
}
export default documento