import React, { PureComponent } from "react";
import { View, StatusBar } from "react-native";
import { Styles } from "common_f";
import { MyToast, MyNetInfo } from "container_f";
import Navigation from "navigation_f";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";

class Router extends PureComponent {
  render() {
    return (
      <View style={Styles.app}>
        <StatusBar barStyle="light-content" backgroundColor="#fff" />
        <MyToast />
        <Navigation />
        <MyNetInfo />
      </View>
    );
  }

  componentDidMount() {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      console.log("my connection info", connectionInfo);
      this.props.updateConnectionStatus(connectionInfo.type != "none");

      // this.setState({ loading: false });
    });
  }
}

const mapStateToProps = ({ netInfo }) => ({
  netInfo
});

function mapDispatchToProps(dispatch) {
  const { actions } = require("redux_f/NetInfoRedux");
  return {
    updateConnectionStatus: isConnected => {
      dispatch(actions.updateConnectionStatus(isConnected));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Router);
