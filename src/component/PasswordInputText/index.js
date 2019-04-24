import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TextInput } from "react-native-paper";

class PasswordInputText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icEye: "visibility-off",
      password: true
    };
  }

  changePwdType = () => {
    let newState;
    if (this.state.password) {
      newState = {
        icEye: "visibility",
        password: false
      };
    } else {
      newState = {
        icEye: "visibility-off",
        password: true
      };
    }

    // set new state value
    this.setState(newState);
  };
  render() {
    return (
      <View style={{ marginTop: 12, marginLeft: 41, marginRight: 41 }}>
        <TextInput
          {...this.props}
          style={{ backgroundColor: "#fff" }}
          theme={{ colors: { primary: "#0072C6" } }}
          underlineColor="#0072C6"
          secureTextEntry={this.state.password}
          label="Password"
        />
        <Icon
          style={styles.icon}
          name={this.state.icEye}
          size={this.props.iconSize}
          color={this.props.iconColor}
          onPress={this.changePwdType}
        />
      </View>
    );
  }
}
export default PasswordInputText;

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: 25,
    right: 10
  }
});
