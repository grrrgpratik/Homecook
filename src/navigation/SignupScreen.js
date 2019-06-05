import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Signup } from "container_f";

class SignupScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return <Signup onSignUpPress={() => navigate("SignUpComplete")} />;
  }
}
export default SignupScreen;
