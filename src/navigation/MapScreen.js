import React, { PureComponent } from "react";
import { Map } from "container_f";

class MapScreen extends PureComponent {
  static navigationOptions = {
    header: null
  };

  onSetUpLocation = () => {
    const { goBack, state } = this.props.navigation;
    state.params.updateData("test");
    goBack();
  };
  render() {
    const { goBack, state } = this.props.navigation;
    return <Map onSetUpLocation={this.onSetUpLocation} />;
  }
}
export default MapScreen;
