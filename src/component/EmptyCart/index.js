import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class EmptyCart extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>EmptyCart</Text>
      </View>
    );
  }
}
export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
