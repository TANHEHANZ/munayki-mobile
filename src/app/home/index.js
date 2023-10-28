import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../styles/CompStyle";
import { dataScroll } from "../../styles/style";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreens = () => {
  const [expandir, setExpandir] = useState(false);

  const click = () => {
    setExpandir(!expandir);
    console.log(expandir);
  };
  return (
    <View style={styles.bodyContainer}>
      <View style={{ padding: 20, flexDirection: "column", gap: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: 600 }}>
          Munayki "Yo te Cuido"
        </Text>
        {/* <Text style={{width: "90%",}}>
          App de apoyo a la identificación y prevención para la violencia{" "}
        </Text> */}
      </View>
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
            backgroundColor: colors.BB,
            padding: 10,
            borderRadius: 30,
            borderWidth: 0,
          }}
        >
          <Text style={{ color: colors.primary, paddingHorizontal: 20 }}>
            Descargar guia
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ padding: 10, marginLeft: 20 }}>Informaciones</Text>
      <ScrollView
        horizontal
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.5,
          shadowRadius: 5,
          paddingVertical: 10,
          height: 100,
        }}
      >
        <TouchableOpacity onPress={click}>
          <View
            style={{ ...dataScroll.div, width: expandir ? 300 : 50 }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={click}>
          <View
            style={{ ...dataScroll.div, width: expandir ? 300 : 50 }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={click}>
          <View
            style={{ ...dataScroll.div, width: expandir ? 300 : 50 }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={click}>
          <View
            style={{ ...dataScroll.div, width: expandir ? 300 : 50 }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={click}>
          <View
            style={{ ...dataScroll.div, width: expandir ? 300 : 50 }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={click}>
          <View
            style={{ ...dataScroll.div, width: expandir ? 300 : 50 }}
          ></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={click}>
          <View
            style={{ ...dataScroll.div, width: expandir ? 300 : 50 }}
          ></View>
        </TouchableOpacity>
        
      </ScrollView>

      <View style={{ padding: 20, height: 180 }}>
        <Text>Slim</Text>
        {/* <View style={dataScroll.div}></View> */}
      </View>
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
