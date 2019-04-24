import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class SearchScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>SearchScreen</Text>
      </View>
    );
  }
}
export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
