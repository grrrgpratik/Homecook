
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { Styles } from "common_f";
import { toast } from "app_f/Omni";
import NetInfo from "@react-native-community/netinfo";

class MyNetInfo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.skipFirstToast = true;
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }

  UNSAFE_componentWillMount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this._handleConnectionChange
    );
  }

  _handleConnectionChange = isConnected => {
    this.props.updateConnectionStatus(isConnected);
    if (!isConnected) return;

    // if (!this.skipFirstToast) {
    //   toast("Regain internet connection");
    // } else {
    //   this.skipFirstToast = false;
    // }
  };

  render() {
    const { netInfo } = this.props;

    if (netInfo.isConnected) return <View />;
    return (
      <View style={styles.connectionStatus}>
        <Text style={styles.connectionText}>{"No internet connection"}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  connectionStatus: {
    position: "absolute",
    bottom: 0,
    width: Styles.width,
    backgroundColor: '#f44336',
    alignItems: "center"
  },
  connectionText: {
    color: "white",
    fontSize: 8,
    fontWeight: "bold"
  }
});

const mapStateToProps = state => {
  return {
    netInfo: state.netInfo
  };
};

const mapDispatchToProps = dispatch => {
  const { actions } = require("redux_f/NetInfoRedux");

  return {
    updateConnectionStatus: isConnected =>
      dispatch(actions.updateConnectionStatus(isConnected))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyNetInfo);
