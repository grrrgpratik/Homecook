import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator
} from "react-native";
const { width, height } = Dimensions.get("window");
import { LoadingSpinnerOverlay } from "component_f";
import { Images, Color } from "common_f";
import { TextField } from "react-native-material-textfield";

class Khalti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "9806678116",
      pin: "",
      confPin: "",
      hidden: false,
      token: ""
    };
  }

  _renderActivityIndicator() {
    return ActivityIndicator ? (
      <ActivityIndicator animating={true} color={"#592B8D"} size={"small"} />
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

  buttonHandler = () => {
    this._modal_2_LoadingSpinnerOverLay.show();
    const phnNum = this.state.text;
    const Url = "https://khalti.com/api/payment/initiate/";
    const requestoption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        public_key: "test_public_key_82b74bf5ea3943ed98c3de9fba800338",
        mobile: phnNum,
        amount: 20000,
        product_identity: "book/id-220",
        product_name: "A Song of Ice and Fire"
      })
    };

    fetch(Url, requestoption)
      .then(response => response.json())
      .then(reponseData => {
        console.log("response-------------", reponseData);
        this.setState({
          hidden: "true",
          token: reponseData.token
        });
        this._modal_2_LoadingSpinnerOverLay.hide();
      })
      .catch(error => {
        console.log("error has occured");
      });
  };

  confirmHandler = () => {
    this._modal_2_LoadingSpinnerOverLay.show();
    const pin = this.state.pin;
    const confPin = this.state.confPin;
    const token = this.state.token;
    const Url = "https://khalti.com/api/payment/confirm/";
    const requestoption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        public_key: "test_public_key_82b74bf5ea3943ed98c3de9fba800338",
        token: token,
        confirmation_code: confPin,
        transaction_pin: pin
      })
    };

    fetch(Url, requestoption)
      .then(response => response.json())
      .then(reponseData => {
        this.sendNotification();
        this._modal_2_LoadingSpinnerOverLay.hide();
        this.props.onOrderScreenPress();
        console.log("response-------------", reponseData);
      })
      .catch(error => {
        console.log("error has occured");
      });
  };

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50
            }}
          >
            <Image
              source={Images.KhaltiLogo}
              style={{
                height: 70,
                width: 175,
                marginBottom: 20,
                marginTop: 30
              }}
            />
          </View>

          <View style={{ margin: 32 }}>
            <TextField
              value={this.state.text}
              style={styles.nunitoRegular}
              labelTextStyle={styles.nunitoRegular}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              tintColor={"#592B8D"}
              onChangeText={text => this.setState({ text })}
              returnKeyType="next"
              label="Khalti Mobile Number"
            />
          </View>

          {this.state.hidden === "true" ? (
            <View>
              <View style={{ marginHorizontal: 32 }}>
                <TextField
                  value={this.state.pin}
                  style={styles.nunitoRegular}
                  labelTextStyle={styles.nunitoRegular}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  tintColor={"#592B8D"}
                  onChangeText={pin => this.setState({ pin })}
                  returnKeyType="next"
                  label="PIN(4 digit)"
                />
              </View>

              {/* <TextInput
                  style={styles.textInputstyle}
                  label="PIN(4 digit)"
                  value={this.state.pin}
                  onChangeText={pin => this.setState({ pin })}
                /> */}

              <View style={{ marginHorizontal: 32 }}>
                <TextField
                  value={this.state.confPin}
                  style={styles.nunitoRegular}
                  labelTextStyle={styles.nunitoRegular}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  tintColor={"#592B8D"}
                  onChangeText={confPin => this.setState({ confPin })}
                  returnKeyType="next"
                  label="Confirmation Code"
                />
              </View>

              <TouchableOpacity
                onPress={this.confirmHandler}
                style={{
                  backgroundColor: "#592B8D",
                  justifyContent: "center",
                  alignItems: "center",
                  width: width * 0.6,
                  height: 40,
                  marginTop: 40,
                  marginBottom: 40,
                  alignSelf: "center"
                }}
              >
                <Text style={{ color: "white" }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={this.buttonHandler}
              style={{
                backgroundColor: "#592B8D",
                justifyContent: "center",
                alignItems: "center",
                width: width * 0.6,
                height: 40,
                marginTop: 40,
                marginBottom: 40,
                alignSelf: "center"
              }}
            >
              <Text style={{ color: "white" }}>PAY</Text>
            </TouchableOpacity>
          )}
        </View>
        <LoadingSpinnerOverlay
          ref={component => (this._modal_2_LoadingSpinnerOverLay = component)}
        >
          {this._renderActivityIndicator()}
        </LoadingSpinnerOverlay>
      </ScrollView>
    );
  }
}
export default Khalti;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    marginTop: 50
  },

  textInputstyle: {
    backgroundColor: "white",
    height: 60,
    width: width * 0.7,
    marginVertical: 10
  },
  nunitoRegular: {
    fontFamily: "Nunito-Regular",
    alignItems: "center"
  }
});
