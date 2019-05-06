import React, { Component } from "react";
import { Map } from "container_f";

class MapScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return <Map />;
  }
}
export default MapScreen;
