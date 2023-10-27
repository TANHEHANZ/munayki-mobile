import { StyleSheet } from "react-native";
import { colors } from "./CompStyle";

export const loginstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.BB,
    fontSize: 40,
    margin: 50,
    fontFamily: "Roboto",
    fontWeight: "900",
  },
  inputs: {
    width: 300,
    backgroundColor: "transparent",
    height: 40,
    margin: 10,
  },
  button: {
    marginVertical:50,
    padding: 15,
    borderRadius:10,
    backgroundColor: colors.CC,
    justifyContent: "center",
    alignItems: "center",
  },
});
