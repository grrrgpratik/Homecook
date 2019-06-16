import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { Color } from "common_f";
export default StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: "row"
  },
  dotsContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 48,
    right: 0,
    left: 0
  },
  dots: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
    backgroundColor: Color.white
  },
  contentHeader: {
    padding: 32,
    backgroundColor: "#fcfcfc",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -18
  },
  avatar: {
    // position: "absolute",
    // bottom: 8,
    // right: 18,
    width: 36 * 2,
    height: 36 * 2,
    borderRadius: 36
  },
  reviewAvatar: {
    width: 24 * 2,
    height: 24 * 2,
    borderRadius: 24
  },
  shadow: {
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.24,
    shadowRadius: 5,
    elevation: 2
  },
  title: {
    fontSize: 24,
    color: Color.black
  },
  description: {
    fontSize: 14,
    color: Color.black
  },
  nunitoBlack: {
    fontFamily: "Nunito-Black"
  },
  nunitoRegular: {
    fontFamily: "Nunito-Regular"
  },
  rating: {
    marginTop: 12,
    justifyContent: "space-between"
  },
  reviewText: { marginLeft: 8, color: Color.black, fontSize: 14 },
  priceText: { color: Color.secondary, fontSize: 20 },
  textContainer: {
    marginTop: 6,
    justifyContent: "space-between"
  },
  regularGray: { color: Color.black, fontSize: 14 },
  smallGray: { color: Color.black, fontSize: 12 },
  titleText: {
    marginTop: 25,
    color: Color.black,
    fontSize: 24,
    marginBottom: 5
  },
  reviewContainer: {
    borderRadius: 7,
    elevation: 2,
    backgroundColor: "#fff",
    marginVertical: 5
  },
  reviewImageContainer: {
    flex: 1,
    padding: 22,
    alignItems: "center",
    justifyContent: "center"
  },
  reviewDate: { color: Color.gray, fontSize: 12, paddingTop: 28 },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    paddingHorizontal: 32,
    paddingBottom: 10,
    backgroundColor: "#fcfcfc"
    //flex: 0.1
  },
  profileButton: {
    position: "absolute",
    top: -38,
    right: 38,
    width: 36 * 2,
    height: 36 * 2,
    borderRadius: 36,
    zIndex: 100,
    elevation: 2
  }
});
