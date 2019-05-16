import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Search } from "container_f";

class SearchScreen extends Component {
  render() {
    return <Search />;
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
