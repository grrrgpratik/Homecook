import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Color, Config } from "common_f";

import { TextField } from "react-native-material-textfield";
import { CustomButton, LoadingSpinnerOverlay } from "component_f";
import { toast } from "../../Omni";
import fetch from "react-native-fetch-polyfill";
import AsyncStorage from "@react-native-community/async-storage";

class Delivery extends Component {
  state = {
    name: "Pratik Gurung",
    streetaddress: "Ranipauwa, Pokhara",
    city: "Pokhara",
    state1: "Gandaki",
    zip: "33700",
    phone: "9806678116",
    modalVisible: false,
    responseImage: "",
    addedPhoto: false
  };

  _renderActivityIndicator() {
    return ActivityIndicator ? (
      <ActivityIndicator
        animating={true}
        color={Color.secondary}
        size={"small"}
      />
    ) : Platform.OS == "android" ? (
      <ProgressBarAndroid color={Color.secondary} styleAttr={"small"} />
    ) : (
      <ActivityIndicatorIOS
        animating={true}
        color={Color.secondary}
        size={"small"}
      />
    );
  }

  handleAddProduct = cartid => {
    this._modal_2_LoadingSpinnerOverLay.show();
    let data = new FormData();
    data.append("full_name", this.state.name);
    data.append("street_address", this.state.streetaddress);
    data.append("city", this.state.city);
    data.append("state", this.state.state1);
    data.append("zip", this.state.zip);
    data.append("phone", this.state.phone);

    cartid.map(item => {
      data.append("cart_items", item);
    });
    AsyncStorage.getItem("token").then(token => {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`
        },
        body: data,
        timeout: 10000
      };
      console.log(requestOptions);
      fetch(Config.createOrderUrl, requestOptions)
        .then(response => {
          console.log(response);
          if (response.status === 201 || response.status === 200) {
            this.props.onPaymentPress();
            this._modal_2_LoadingSpinnerOverLay.hide();
          } else {
            response.json().then(responseJSON => {
              console.log(responseJSON);

              this._modal_2_LoadingSpinnerOverLay.hide();
              toast(responseJSON.message);
            });
          }
        })
        .catch(err => {
          this._modal_2_LoadingSpinnerOverLay.hide();
          toast(err);
        });
    });
  };

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
    const { cart } = this.props;
    var cartid = [];
    cart.map(item => {
      cartid.push(item.id);
      console.log(cartid);
    });

    return (
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={-30}
          enabled
        >
          <View style={styles.container}>
            <View style={{ flex: 1, margin: 32 }}>
              <TextField
                value={this.state.name}
                style={styles.nunitoRegular}
                labelTextStyle={styles.nunitoRegular}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                tintColor={Color.secondary}
                onChangeText={text => this.setState({ name: text })}
                returnKeyType="next"
                label="Full name"
              />
              <TextField
                value={this.state.streetaddress}
                autoCorrect={false}
                style={styles.nunitoRegular}
                labelTextStyle={styles.nunitoRegular}
                enablesReturnKeyAutomatically={true}
                keyboardType="number-pad"
                tintColor={Color.secondary}
                onChangeText={text => this.setState({ streetaddress: text })}
                returnKeyType="next"
                label="Street Address"
              />
              <TextField
                value={this.state.city}
                autoCorrect={false}
                style={styles.nunitoRegular}
                keyboardType="number-pad"
                labelTextStyle={styles.nunitoRegular}
                enablesReturnKeyAutomatically={true}
                tintColor={Color.secondary}
                onChangeText={text => this.setState({ city: text })}
                returnKeyType="next"
                label="City"
              />
              <TextField
                value={this.state.state1}
                autoCorrect={false}
                style={styles.nunitoRegular}
                keyboardType="number-pad"
                labelTextStyle={styles.nunitoRegular}
                enablesReturnKeyAutomatically={true}
                tintColor={Color.secondary}
                onChangeText={text => this.setState({ state1: text })}
                returnKeyType="next"
                label="State"
              />
              <TextField
                value={this.state.zip}
                autoCorrect={false}
                style={styles.nunitoRegular}
                keyboardType="number-pad"
                labelTextStyle={styles.nunitoRegular}
                enablesReturnKeyAutomatically={true}
                tintColor={Color.secondary}
                onChangeText={text => this.setState({ zip: text })}
                returnKeyType="next"
                label="Zip"
              />
              <TextField
                value={this.state.phone}
                autoCorrect={false}
                style={styles.nunitoRegular}
                keyboardType="number-pad"
                labelTextStyle={styles.nunitoRegular}
                enablesReturnKeyAutomatically={true}
                tintColor={Color.secondary}
                onChangeText={text => this.setState({ phone: text })}
                returnKeyType="next"
                label="Phonenumber"
              />

              <CustomButton
                buttonText={"Confirm Order"}
                onButtonPress={() => this.handleAddProduct(cartid)}
                // onButtonPress={this.props.onPaymentPress}
              />
            </View>
          </View>
          <LoadingSpinnerOverlay
            ref={component => (this._modal_2_LoadingSpinnerOverLay = component)}
          >
            {this._renderActivityIndicator()}
          </LoadingSpinnerOverlay>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
export default Delivery;

const styles = StyleSheet.create({
  container: {
    flex: 1
    //alignItems: "center",
    //backgroundColor: "red"
    //  justifyContent: "center"
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 20,
    borderColor: "#f6f6f6",
    borderWidth: 4
  },
  nunitoRegular: {
    fontFamily: "Nunito-Regular"
  },
  addPhotoStyle: {
    marginVertical: 10,
    borderRadius: 4,
    height: 60,
    width: 70,
    borderWidth: 1,
    borderColor: Color.gray,
    justifyContent: "center",
    alignItems: "center"
  },
  plusContainer: {
    position: "absolute",
    height: 20,
    width: 20,
    top: -7,
    right: -7,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.secondary
  },
  plusText: {
    fontSize: 20,
    color: "#fff",
    paddingBottom: 2
  },
  crossContainer: {
    position: "absolute",
    height: 20,
    width: 20,
    top: 4,
    right: 8,
    elevation: 4,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  }
});
