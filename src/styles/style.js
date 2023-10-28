import { StyleSheet } from "react-native";
import { colors } from "./CompStyle";

export const loginstyle = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "transparent",
  },
  title: {
    color: "#fff",
    fontSize: 37,
    fontWeight: "600",
    textAlign: "left",
    width: "50%",
    marginVertical: 80,
    paddingLeft: 20,
    backgroundColor: colors.CCTransparent,
    padding:30,

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
    height: 600,
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
    backgroundColor: colors.primary,
    height: 80,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 10,
    borderTopWidth: 2,
    borderColor: "#0002",
  },
  icons: {
    flexDirection: "column",
    gap: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const dataScroll = StyleSheet.create({
  div: {
    height: 220,
    width: 30,
    backgroundColor: colors.CC,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
