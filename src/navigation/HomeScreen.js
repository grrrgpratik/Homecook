import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Home } from "container_f";

class HomeScreen extends PureComponent {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Home
        onMapScreenPress={() => navigate("Map")}
        onProductDetailScreen={product => navigate("Product", { product })}
        onEditProfileScreen={() => navigate("EditProfile")}
        onViewAllScreen={product => navigate("ViewAll", { product })}
        onCartScreen={() => navigate("Cart")}
      />
    );
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
