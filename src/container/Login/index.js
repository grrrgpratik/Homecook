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
  Keyboard
} from "react-native";
import { Images, Color } from "common_f";
import LinearGradient from "react-native-linear-gradient";

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
            <TextInput
              defaultValue={email}
              onChangeText={text => this.setState({ email: text })}
              style={styles.textInput}
              placeholder="Username"
              placeholderTextColor={Color.gray}
              keyboardType={"email-address"}
            />
            <TextInput
              style={[styles.textInput, { marginTop: 15, marginBottom: 15 }]}
              onChangeText={text => this.setState({ password: text })}
              placeholder="Password"
              placeholderTextColor={Color.gray}
              keyboardType={"visible-password"}
              defaultValue={password}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.handleLogin()}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                locations={[0.1, 0.9]}
                colors={[Color.primary, Color.secondary]}
                style={styles.linerBackground}
              >
                <Text style={styles.loginText}>LOGIN</Text>
              </LinearGradient>
            </TouchableOpacity>

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
  linerBackground: {
    height: 48,
    borderRadius: 6,
    marginTop: 20,
    justifyContent: "center",
    shadowColor: "#323643",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10
  },
  loginText: {
    textAlign: "center",
    color: "white",
    fontFamily: "Nunito-Black"
  },
  forgetText: {
    color: Color.gray,
    fontFamily: "Nunito-SemiBold",
    textDecorationLine: "underline",
    margin: 10,
    textAlign: "center"
  }
});
