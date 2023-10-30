import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors, sharedStyles } from "../../styles/CompStyle";
import { colaboracionesStyle, dataScroll, loginstyle } from "../../styles/style";
import { TouchableOpacity } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const HomeScreens = () => {
  // const [expandir, setExpandir] = useState(false);

  // const click = () => {
  //   setExpandir(!expandir);
  //   console.log(expandir);
  // };
  const buttons = [1, 2, 3, 4, 5, 6, 7];


  return (
    <View style={styles.bodyContainer}>
      <Text style={{ fontSize: 25, fontWeight: 600, padding: 20 }}>
        Munayki "Yo te Cuido"
      </Text>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Como usar la Aplicacion</Text>
        <TouchableOpacity
          style={{
            ...sharedStyles.shadowBox,
            backgroundColor: colors.primary,
            padding: 10,
            borderRadius: 30,
            borderWidth: 0,
          }}
        >
          <FontAwesome name="download" size={30} color={"rgb(73,39,121)"} />
        </TouchableOpacity>
      </View>
      <Text style={{ padding: 10, marginLeft: 20 , marginTop:20,}}>Informaciones</Text>
      <ScrollView
        horizontal
        style={{
          paddingVertical: 30,
          height: 120,
          backgroundColor: "#0001",
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderColor: "#0001",
        }}
      >
        {buttons.map((button, index) => (
        <TouchableOpacity key={index} >
          {/* <View style={{ ...dataScroll.div, width: expandir ? 300 : 50 }}></View> */}
          <View style={{ ...dataScroll.div, width: 300 }}></View>
        </TouchableOpacity>
      ))}
      </ScrollView>

      <View style={{ padding: 20, height: 100 }}>
        <Text>Colaboraciones</Text>
        <View style={colaboracionesStyle.section}>
          <TouchableOpacity style={colaboracionesStyle.text}>
            <Text style={{ color: colors.primary , fontSize:11, }}> Slim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={colaboracionesStyle.text}>
            <Text style={{ color: colors.primary , fontSize:11, }}> Fcc</Text>
          </TouchableOpacity>
          <TouchableOpacity style={colaboracionesStyle.text}>
            <Text style={{ color: colors.primary , fontSize:11, }}> Save Children</Text>
          </TouchableOpacity>
          <TouchableOpacity style={colaboracionesStyle.text}>
            <Text style={{ color: colors.primary , fontSize:11, }}> World Vision</Text>
          </TouchableOpacity>
          <TouchableOpacity style={colaboracionesStyle.text}>
            <Text style={{ color: colors.primary , fontSize:11, }}> Iff</Text>
          </TouchableOpacity>
          <TouchableOpacity style={colaboracionesStyle.text}>
            <Text style={{ color: colors.primary , fontSize:11, }}> Unifranz</Text>
          </TouchableOpacity>
        </View>
      </View>
        {/* <View style={{height:80 , justifyContent:"center", alignItems:"center"}}>
              <ScrollView horizontal style={{ marginTop: 30 }}>
                <Image
                  source={require("../../../assets/LOGOS/iffi.png")}
                  style={loginstyle.logos}
                />
                <Image
                  source={require("../../../assets/LOGOS/logo_Unifranz.png")}
                  style={loginstyle.logos}
                />
                <Image
                  source={require("../../../assets/LOGOS/save.png")}
                  style={loginstyle.logos}
                />
                <Image
                  source={require("../../../assets/LOGOS/vision.jpeg")}
                  style={loginstyle.logos}
                />
              </ScrollView>
            </View> */}
    </View>
  );
};

export default HomeScreens;
const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    paddingVertical: 20,
  },
});
