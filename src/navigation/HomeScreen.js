import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Home } from "container_f";

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      activity: false
    };
  }

  updateData = data => {
    this.setState({
      activity: !this.state.activity
    });
    // some other stuff
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Home
        {...this.props}
        onMapScreenPress={() =>
          navigate("Map", { updateData: this.updateData })
        }
        activity={this.state.activity}
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
