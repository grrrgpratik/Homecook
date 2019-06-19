import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Images, Color, Config } from "common_f";
import { CustomButton, LoadingSpinnerOverlay } from "component_f";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { toast } from "app_f/Omni";
import fetch from "react-native-fetch-polyfill";
import AsyncStorage from "@react-native-community/async-storage";

const { width, height } = Dimensions.get("window");

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icEye: "visibility-off",
      password: true,
      email: "",
      passwordtext: "",
      errors: []
    };
  }

  async onValueChange(item, selectedValue) {
    try {
      console.log(selectedValue);
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.log("AsyncStorage error: " + error.message);
    }
  }

  handleLogin() {
    this._modal_2_LoadingSpinnerOverLay.show();
    const { onLoginPress } = this.props;
    const { email, passwordtext, errors } = this.state;
    //const errors = [];
    console.log(email, passwordtext);
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: passwordtext
      }),
      timeout: 10000
    };

    fetch(Config.loginUrl, fetchOptions)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          response.json().then(responseJSON => {
            console.log(responseJSON);
            this.onValueChange("token", responseJSON.token);
            this.onValueChange("user", JSON.stringify(responseJSON.user));
            this._modal_2_LoadingSpinnerOverLay.hide();
            onLoginPress();
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
  }

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
    const { email, passwordtext, errors, password } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={height * 0.01}
        >
          <Image
            source={Images.logoWithTagline}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.inputContainer}>
            <View style={styles.searchSection}>
              <FontAwesome5
                style={styles.searchIcon}
                name="user-alt"
                size={18}
                color={Color.gray}
              />
              <TextInput
                defaultValue={email}
                onChangeText={text => this.setState({ email: text })}
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={Color.gray}
                keyboardType={"email-address"}
              />
            </View>

            <View
              style={[
                styles.searchSection,
                { marginTop: 15, marginBottom: 15 }
              ]}
            >
              <Icon
                style={styles.searchIcon}
                name="lock"
                size={20}
                color={Color.gray}
              />
              <TextInput
                style={[styles.input]}
                onChangeText={text => this.setState({ passwordtext: text })}
                placeholder="Password"
                placeholderTextColor={Color.gray}
                defaultValue={passwordtext}
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

            <CustomButton
              buttonText={"LOGIN"}
              onButtonPress={() => this.handleLogin()}
            />
            <TouchableOpacity onPress={this.props.onForgetPasswordPress}>
              <Text style={styles.forgetText}>Forgot your password?</Text>
            </TouchableOpacity>
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
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  hasErrors: {
    borderColor: "red"
  },
  logo: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginTop: height / 2 - 250
  },
  inputContainer: {
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30
  },
  textInput: {
    height: 45,
    color: Color.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#D6DDF6",
    backgroundColor: "#F9FAFF",
    borderRadius: 5,
    fontFamily: "Nunito-Regular"
  },
  forgetText: {
    color: Color.gray,
    fontFamily: "Nunito-SemiBold",
    textDecorationLine: "underline",
    margin: 10,
    textAlign: "center"
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
