import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class OrderScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>OrderScreen</Text>
      </View>
    );
  }
}
export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
