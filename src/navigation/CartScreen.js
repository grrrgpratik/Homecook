import React, { Component } from "react";
import { Cart } from "container_f";

class CartScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;

    return (
      <Cart
        onHomeScreenPress={() => navigate("Home")}
        navigation={this.props.navigation}
        onOrderScreenPress={() => navigate("Order")}
      />
    );
  }
}
export default CartScreen;
