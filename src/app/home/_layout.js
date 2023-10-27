import { View, StyleSheet } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import Nav from "../../routing/navigations";
import { colors } from "../../styles/CompStyle";

const Content = () => {
  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.primary }}>
        <Slot />
      </View>
      <Nav />
    </>
  );
};

export default Content;
