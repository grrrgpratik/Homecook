import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Color } from "common_f";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  topContainer: {
    flex: 0.93
  },
  logo: {
    resizeMode: "contain",
    height: height * 0.26,
    width: width * 0.45,
    alignSelf: "center",
    marginTop: height * 0.02
  },
  textInput: {
    backgroundColor: "white",
    marginLeft: 41,
    marginRight: 41,
    color: "#0AC4BA"
  },
  signIn: {
    width: width * 0.8
    // backgroundColor: "#0072C6"
  },
  signInWrapper: {
    marginLeft: 12,
    marginRight: 12,
    marginTop: 38,
    alignItems: "center",
    justifyContent: "center"
  },
  termsText: {
    marginBottom: 16,
    color: Color.gray,
    lineHeight: 24,
    fontSize: 12,
    fontFamily: "Nunito-Regular"
  }
});
