import { View, Text, TextInput } from "react-native";
import React from "react";
import Login from "./login";
import HomeScreens from "./home";
import Informativa from "./home/informativa";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
const Index = () => {
  return (
      <Login />
  );
};

export default Index;
