import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Signup } from "container_f";

class SignupScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return <Signup />;
  }
}
export default SignupScreen;
