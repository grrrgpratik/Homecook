import React, { Component } from "react";
import { Khalti } from "container_f";

class KhaltiScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Khalti onOrderScreenPress={() => navigate("OrderCompleteScreen")} />
    );
  }
}
export default KhaltiScreen;
