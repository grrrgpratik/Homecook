import React, { Component } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Images } from "common_f";
const { width, height } = Dimensions.get("window");

export default class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this.loadApp();
  }

  loadApp = async () => {
    const userToken = await AsyncStorage.getItem("token");
    this.props.navigation.navigate(userToken ? "Dashboard" : "LoginStack");
  };

  render() {
    return (
      <Image
        style={styles.container}
        source={Images.SplashScreen}
        resizeMode="contain"
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    resizeMode: "contain"
  }
});
