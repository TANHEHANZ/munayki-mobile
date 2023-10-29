import { StyleSheet } from "react-native";

export const colors = {
    primary:"#fff",
    A: "rgb(251,177,82)",
    AA: "rgb(241,134,32)",
    B: "rgb(234,85,123)",
    BB: "rgb(174,25,89)",
    C: "rgb(108,85,158)",
    CC: "rgb(73,39,121)",
    CCTransparent: "rgb(141, 59, 255)",
    D: "rgb(77,192,223)",
    DD: "rgb(1,173,217)",
    F: "rgb(79,184,167)",
    FF: "rgb(0,152,120)",
    light: "#eaf4f4",
    black: "#000",
    trasparent: "transparent",
    gris:"#0002",
    gris2:"#0001",
    gray100:"#cce3de",
    gray200:"#a4c3b2",
    gray300:"#6b9080",
  };

  export const sharedStyles = StyleSheet.create({
    shadowBox: {
      elevation: 5, 
      shadowColor: 'black', 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.3, 
      shadowRadius: 3, 
    },
  });
  