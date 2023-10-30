import { StyleSheet } from "react-native";
import { colors, sharedStyles } from "./CompStyle";

export const loginstyle = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "transparent",
    position: "relative",
  },
  title: {
    color: colors.primary,
    fontSize: 40,
    fontWeight: "100",
    textAlign: "center",
    width: "100%",
    marginVertical: 90,
    // paddingLeft: 20,
    padding: 30,
    marginTop: 140,
  },
  inputs: {
    width: "100%",
    backgroundColor: "transparent",
    height: 35,
    margin: 10,
  },
  button: {
    marginVertical: 10,
    padding: 12,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.CC,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },
  backgroundImage: {
    width: 400,
    height: 500,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: -1,
  },
  logos: {
    resizeMode: "cover",
    width: 120,
    height: 30,
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
  button: {
    ...sharedStyles.shadowBox,
    flexDirection: "column",
    gap: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 2,
    borderColor: "#0002",
  },
});

export const dataScroll = StyleSheet.create({
  div: {
    height: 260,
    width: 30,
    backgroundColor: colors.CC,
    marginHorizontal: 10,
    borderRadius: 10,
    zIndex: 100,
  },
});
export const modal = StyleSheet.create({
  modalContent:{
    backgroundColor:"#fff",
    padding:30,
    gap:20,
  }
})

export const colaboracionesStyle = StyleSheet.create({
  section: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
    margin:10,
  },
  text: {
    backgroundColor: colors.A,
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    ...sharedStyles.shadowBox,
    textAlign: "center",
  },
});
