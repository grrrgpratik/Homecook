import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ProgressBarAndroid,
  ActivityIndicatorIOS
} from "react-native";
import { Images, Color, Config } from "common_f";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { LoadingSpinnerOverlay } from "component_f";
import fetch from "react-native-fetch-polyfill";
import { toast } from "app_f/Omni";

const { width, height } = Dimensions.get("window");

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icEye: "visibility-off",
      confirm: "visibility-off",
      password: true,
      confirmPassword: true,
      email: "",
      fullname: "",
      phonenumber: "",
      passwordtext: "",
      confirmPasswordText: "",
      errors: []
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

  changeConfirmPwdType = () => {
    let newState;
    if (this.state.confirmPassword) {
      newState = {
        confirm: "visibility",
        confirmPassword: false
      };
    } else {
      newState = {
        confirm: "visibility-off",
        confirmPassword: true
      };
    }

    // set new state value
    this.setState(newState);
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

  _showModal_2_LoadingSpinnerOverLay = () => {
    this._modal_2_LoadingSpinnerOverLay.show();
    const {
      email,
      passwordtext,
      fullname,
      phonenumber,
      confirmPasswordText
    } = this.state;
    if (passwordtext.length < 6) {
      this._modal_2_LoadingSpinnerOverLay.hide();
      toast("Password length should be greater than 6");
    }
    if (passwordtext === confirmPasswordText) {
      const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: passwordtext,
          full_name: fullname,
          phonenumber: phonenumber,
          profile_pic: null
        }),
        timeout: 10000
      };

      fetch(Config.signUpUrl, fetchOptions)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            response.json().then(responseJSON => {
              console.log(responseJSON);
              this._modal_2_LoadingSpinnerOverLay.hide();
              this.props.onSignUpPress();
            });
          } else {
            response.json().then(responseJSON => {
              this._modal_2_LoadingSpinnerOverLay.hide();
              toast(responseJSON.message);
            });
          }
        })
        .catch(() => {
          this._modal_2_LoadingSpinnerOverLay.hide();
          toast("Network request failed");
        });
    } else {
      this._modal_2_LoadingSpinnerOverLay.hide();
      toast("Passwords don't match");
    }
  };

  render() {
    const {
      email,
      passwordtext,
      fullname,
      phonenumber,
      password,
      confirmPassword,
      confirmPasswordText
    } = this.state;
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={-30}
          enabled
        >
          <Image
            source={Images.logoWithTagline}
            style={{
              height: 200,
              width: 200,
              alignSelf: "center",
              marginTop: height / 2 - 320
            }}
            resizeMode="contain"
          />
          <View
            style={{
              justifyContent: "center",
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 15
            }}
          >
            <View style={styles.searchSection}>
              <MaterialCommunityIcons
                style={styles.searchIcon}
                name="email"
                size={18}
                color={Color.gray}
              />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={text => this.setState({ email: text })}
                placeholder="Email-address"
                placeholderTextColor={Color.gray}
                keyboardType={"email-address"}
              />
            </View>

            <View style={[styles.searchSection, { marginTop: 15 }]}>
              <FontAwesome5
                style={styles.searchIcon}
                name="user-alt"
                size={15}
                color={Color.gray}
              />
              <TextInput
                style={[styles.input]}
                value={fullname}
                onChangeText={text => this.setState({ fullname: text })}
                placeholder="Your Name"
                placeholderTextColor={Color.gray}
                keyboardType={"email-address"}
              />
            </View>

            <View style={[styles.searchSection, { marginTop: 15 }]}>
              <MaterialCommunityIcons
                style={styles.searchIcon}
                name="phone"
                size={18}
                color={Color.gray}
              />
              <TextInput
                style={[styles.input]}
                value={phonenumber}
                onChangeText={text => this.setState({ phonenumber: text })}
                placeholder="Phone Number"
                placeholderTextColor={Color.gray}
                keyboardType={"email-address"}
              />
            </View>

            <View style={[styles.searchSection, { marginTop: 15 }]}>
              <Icon
                style={styles.searchIcon}
                name="lock"
                size={18}
                color={Color.gray}
              />
              <TextInput
                style={[styles.input]}
                value={passwordtext}
                onChangeText={text => this.setState({ passwordtext: text })}
                placeholder="Password"
                placeholderTextColor={Color.gray}
                secureTextEntry={password}
              />
              <MaterialIcon
                style={styles.icon}
                name={this.state.icEye}
                size={20}
                color={Color.gray}
                onPress={this.changePwdType}
              />
            </View>

            <View style={[styles.searchSection, { marginVertical: 15 }]}>
              <Icon
                style={styles.searchIcon}
                name="lock"
                size={18}
                color={Color.gray}
              />
              <TextInput
                style={[styles.input]}
                value={confirmPasswordText}
                placeholder="Confirm Password"
                onChangeText={text =>
                  this.setState({ confirmPasswordText: text })
                }
                placeholderTextColor={Color.gray}
                secureTextEntry={confirmPassword}
              />
              <MaterialIcon
                style={styles.icon}
                name={this.state.confirm}
                size={20}
                color={Color.gray}
                onPress={this.changeConfirmPwdType}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this._showModal_2_LoadingSpinnerOverLay()}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0.1, 0.9]}
                colors={[Color.primary, Color.secondary]}
                style={{
                  height: 48,
                  borderRadius: 6,
                  marginTop: 20,
                  justifyContent: "center",
                  shadowColor: "#323643",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 10
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontFamily: "Nunito-Black"
                  }}
                >
                  SIGN UP
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {/* <Text style={{ fontFamily: "Nunito-Black", color: "black" }}>test</Text>
        <Text style={{color:"black"}}>test</Text> */}
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
export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchSection: {
    flexDirection: "row",
    //justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFF",
    borderRadius: 5
  },
  searchIcon: {
    padding: 12
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#F9FAFF",
    color: Color.gray,
    backgroundColor: "#F9FAFF",
    fontFamily: "Nunito-Regular",
    borderRadius: 5
  },
  icon: {
    position: "absolute",
    top: 15,
    right: 10
  }
});
