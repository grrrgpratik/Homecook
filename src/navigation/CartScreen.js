import React, { Component } from "react";
import { Cart } from "container_f";

class CartScreen extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return <Cart onHomeScreenPress={() => navigate("Home")} />;
  }
}
export default CartScreen;
