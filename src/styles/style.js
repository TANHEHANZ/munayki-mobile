import { StyleSheet } from "react-native";
import { colors, sharedStyles } from "./CompStyle";

export const loginstyle = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff",
  },
  title: {
    width: "100%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  logoconteiner:{
    width: "110%",
    height: 170,
    borderColor: "rgba(80, 58, 179, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    bottom: -30,
    right: "4%",
    left:"-4%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    ...sharedStyles.shadowBox,
  },
  figuras: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 80,
    backgroundColor: colors.CC,
    justifyContent: "center",
    alignItems: "center",
    ...sharedStyles.shadowBox,
    elevation: 10,
    borderTopLeftRadius: 20,
  },
  inputs: {
    width: "100%",
    backgroundColor: "transparent",
    // height: "10%",
    margin: "1%",
    borderWidth:0,
    padding: 0,
  },
  button: {
    marginVertical: "3%",
    marginHorizontal:"10%",
    padding: "3%",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.CC,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    flexDirection: "row",
    gap: 2,
  },
  backgroundImage: {
    width: "100%",
    height: 510,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: -1,
  },
  logos: {
    resizeMode: "cover",
    width: "50%",
    height: "10%",
    flexDirection: "row",
    marginHorizontal: "2%",
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
    padding: 20,
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
    flex: 1,
    width: 30,
    backgroundColor: colors.C,
    marginHorizontal: 10,
    borderRadius: 10,
    zIndex: 100,
    ...sharedStyles.shadowBox,
  },
  title: {
    color: colors.primary,
    fontSize: 25,
    textAlign: "center",
    width: "100%",
    padding: "5%",
  },
  text: {
    color: colors.primary,
    fontSize: 15,
    width: "100%",
    padding: "5%",
  },
});
export const dataScrollV = StyleSheet.create({
  div: {
    width: "50%",
    backgroundColor: colors.C,
    borderRadius: 10,
    ...sharedStyles.shadowBox,
  },
  title: {
    color: colors.black,
    fontSize: 25,
    textAlign: "center",
    width: "100%",
    padding: "5%",
  },
});
export const modal = StyleSheet.create({
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    gap: 20,
    borderRadius: 10,
  },
});

export const colaboracionesStyle = StyleSheet.create({
  section: {
    flexDirection: "row",
    gap: 20,
    flexWrap: "wrap",
    margin: 10,
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
export const contactStyle = StyleSheet.create({
  inputs: {
    ...loginstyle.inputs,
    borderBottomWidth: 1,
    borderBottomColor: colors.CC,
    marginBottom: 5,
    margin: 0,
  },
  button: {
    ...loginstyle.button,
    width: "80%",
    elevation: 5,
    backgroundColor: colors.primary,
  },
  text: { fontSize: 11, width: "70%", textAlign: "center", height: 40 },
});

export const mapButton = StyleSheet.create({
  map: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  button: {
    ...loginstyle.button,
    width: "auto",
  },
});

export const dangerButton = StyleSheet.create({
  button: {
    width: 60,
    backgroundColor: colors.B,
    alignItems: "center",
    borderRadius: 5,
    ...sharedStyles.shadowBox,
  },
  text: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
    color: colors.primary,
  },
});
