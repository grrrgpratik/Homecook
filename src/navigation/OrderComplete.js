import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CustomButton } from "component_f";
import { Color } from "common_f";

class OrderComplete extends PureComponent {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="ios-checkmark-circle"
            size={80}
            color={Color.tertiary}
          />
          <Text
            style={{
              color: "black",
              fontFamily: "Nunito-SemiBold",
              fontSize: 20,
              marginTop: 70
            }}
          >
            Your order is complete
          </Text>
          <Text
            style={{
              color: "black",
              fontFamily: "Nunito-Regular",
              fontSize: 16,
              marginTop: 10
            }}
          >
            Thank you for ordering.
          </Text>
        </View>

        <View style={styles.btnNextContainer}>
          {/* <Button
                  text={"Go to Home"}
                  style={styles.button}
                  textStyle={styles.buttonText}
                  onPress={this.props.finishOrder}
                /> */}
          <CustomButton
            buttonText={"GO TO HOME"}
            onButtonPress={() => this.props.navigation.navigate("Home")}
          />
        </View>
      </View>
    );
  }
}
export default OrderComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1

    //backgroundColor: "white",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  message: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
    lineHeight: 25,
    margin: 20
  },

  btnNextContainer: {
    marginHorizontal: 20,
    marginBottom: 100
  },

  button: {
    height: 40,
    width: 160,
    borderRadius: 20,
    backgroundColor: Color.primary
  }
});
