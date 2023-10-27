import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../styles/CompStyle";
import { dataScroll } from "../../styles/style";

const HomeScreens = () => {
  return (
    <View style={styles.bodyContainer}>
      <Text> hola Usuario ! </Text>
      <Text>app contra la violencia </Text>
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
        <View style={dataScroll.div}></View>
        <View style={dataScroll.div}></View>
        <View style={dataScroll.div}></View>
       
        
      </ScrollView>
    </View>
  );
};

export default HomeScreens;
const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
});
