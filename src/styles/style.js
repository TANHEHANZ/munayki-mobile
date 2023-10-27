import { StyleSheet } from "react-native";
import { colors } from "./CompStyle";

export const loginstyle = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "transparent",
  },
  title: {
    color: colors.primary,
    fontSize: 35,
    fontFamily: "Roboto",
    fontWeight: "900",
    textAlign: "left",
    width: "100%",
    marginVertical: 130,
    paddingLeft: 20,
  },
  inputs: {
    width: "100%",
    backgroundColor: "transparent",
    height: 40,
    margin: 10,
    borderWidth: 1,
    borderColor: "#0002",
  },
  button: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.CC,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  backgroundImage: {
    width: "auto",
    height: 775,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  logos: {
    resizeMode: "cover",
    width: 200,
    height: 50,
    flexDirection: "row",
    marginHorizontal: 10,
  },
});
export const nav = StyleSheet.create({
  contenedor: {
    backgroundColor: colors.CC,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: colors.gray100,
  },
  icons: {
    flexDirection: "column",
    gap: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
