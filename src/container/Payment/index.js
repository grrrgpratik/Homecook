import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { Images, Color } from "common_f";

export default class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendNotification = () => {
    fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic MGY3NmZkYjItZTc4Yi00MGVlLWEzNDUtYTNmZjEwNzNkNzli"
      },
      body: JSON.stringify({
        app_id: "155f3594-6eaa-4f62-b68b-9dead60f99e7",
        include_player_ids: ["7a5ca2ab-24a1-4808-b812-78a78ba0df63"],
        contents: {
          en: "Hi Cook, You have received a new order"
        }
      })
    })
      .then(res => res.json())
      .then(resJSON => {
        console.log(resJSON);
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "black",
            fontSize: 18,
            color: Color.black,
            fontFamily: "Nunito-Black",
            marginLeft: 22,
            marginTop: 32
          }}
        >
          Select a payment method:
        </Text>
        <View style={styles.container}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                this.sendNotification();
                this.props.onOrderScreenPress();
              }}
            >
              <Image
                source={Images.CashOnDelivery}
                style={{ height: 70, width: 100, marginBottom: 20 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                color: Color.black,
                fontFamily: "Nunito-SemiBold",
                marginLeft: 22,
                marginTop: 32
              }}
            >
              Cash on Delivery
            </Text>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.props.onKhaltiPress}
            >
              <Image
                source={Images.KhaltiLogo}
                style={{
                  height: 50,
                  width: 140,
                  marginBottom: 20,
                  marginTop: 20
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: "black",
                fontSize: 16,
                color: Color.black,
                fontFamily: "Nunito-SemiBold",
                marginLeft: 22,
                marginTop: 32
              }}
            >
              Pay with Khalti
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginTop: 50
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3
  },
  buttonTextStyle: {
    color: "white"
  }
});
