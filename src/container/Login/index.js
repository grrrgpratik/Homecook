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
  Keyboard
} from "react-native";
import { Images, Color } from "common_f";
import { CustomButton } from "component_f";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const { width, height } = Dimensions.get("window");

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: []
  };

  handleLogin() {
    const { onLoginPress } = this.props;
    const { email, password, errors } = this.state;
    //const errors = [];

    this.setState({ errors: [] });

    Keyboard.dismiss();
    // console.log(email, password);
    // if (email === "" || email === null) {
    //   errors.push("email");
    //   this.setState({ errors });
    // }
    // console.log(errors);

    // if (password === "" || password === null) {
    //   errors.push("password");
    //   this.setState({ errors });
    // }
    console.log(errors);
    if (!errors.length) {
      onLoginPress();
    }
  }

  render() {
    const { email, password, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
    return (
      <ScrollView>
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
                onChangeText={text => this.setState({ password: text })}
                placeholder="Password"
                placeholderTextColor={Color.gray}
                defaultValue={password}
              />
            </View>

            <CustomButton
              buttonText={"LOGIN"}
              onButtonPress={() => this.handleLogin()}
            />

            <Text style={styles.forgetText}>Forgot your password?</Text>
          </View>
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
  }
});
