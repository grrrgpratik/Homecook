import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Home } from "container_f";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return <Home onMapScreenPress={() => navigate("Map")} />;
  }
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
