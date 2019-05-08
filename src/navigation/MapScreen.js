import React, { PureComponent } from "react";
import { Map } from "container_f";

class MapScreen extends PureComponent {
  static navigationOptions = {
    header: null
  };

  render() {
    const { goBack } = this.props.navigation;
    return <Map onSetUpLocation={() => goBack()} />;
  }
}
export default MapScreen;
