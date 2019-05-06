import React, { PureComponent } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Color } from "common_f";
import LinearGradient from "react-native-linear-gradient";

class CustomButton extends PureComponent {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.props.onButtonPress}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0.1, 0.9]}
          colors={[Color.primary, Color.secondary]}
          style={styles.linerBackground}
        >
          <Text style={styles.loginText}>{this.props.buttonText}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
export default CustomButton;

const styles = StyleSheet.create({
  loginText: {
    textAlign: "center",
    color: "white",
    fontFamily: "Nunito-Black"
  },
  linerBackground: {
    height: 48,
    borderRadius: 6,
    marginTop: 20,
    justifyContent: "center",
    shadowColor: "#323643",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10
  }
});
