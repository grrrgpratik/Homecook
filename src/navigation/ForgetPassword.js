import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class ForgetPasswordScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "black" }}>ForgetPasswordScreen</Text>
      </View>
    );
  }
}
export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
