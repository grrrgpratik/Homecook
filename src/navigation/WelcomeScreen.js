import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Welcome } from "container_f";

class WelcomeScreen extends PureComponent {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Welcome
        onLoginPress={() => navigate("Login")}
        onSignUpPress={() => navigate("Signup")}
      />
    );
  }
}
export default WelcomeScreen;
