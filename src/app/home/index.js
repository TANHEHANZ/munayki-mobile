import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../styles/CompStyle";
import { dataScroll } from "../../styles/style";

const HomeScreens = () => {
  return (
    <View style={styles.bodyContainer}>
      <Text style={{padding:10,marginLeft:20,}}>Recursos</Text>
      <ScrollView
        horizontal
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.5,
          shadowRadius: 5,
          padding: 20,
        }}
      >
        <View style={dataScroll.div}></View>
        <View style={dataScroll.div}></View>
        <View style={dataScroll.div}></View>
        <View style={dataScroll.div}></View>
        <View style={dataScroll.div}></View>
      </ScrollView>
      <View style={{padding:20,}}>
        <Text>Slim</Text>
        <View style={dataScroll.div}></View>

      </View>
      <View style={{padding:20,}}>
        <Text>Fcc</Text>
        <View style={dataScroll.div}></View>

      </View>

    </View>
  );
};

export default HomeScreens;
const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    paddingVertical:20,
  },
});
