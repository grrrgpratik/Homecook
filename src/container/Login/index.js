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
  ScrollView
} from "react-native";
import { Images, Color } from "common_f";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

class Login extends Component {
  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={height * 0.01}
        >
          <Image
            source={Images.logoWithTagline}
            style={{
              height: 200,
              width: 200,
              alignSelf: "center",
              marginTop: height / 2 - 250
            }}
            resizeMode="contain"
          />
          <View
            style={{
              justifyContent: "center",
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 30
            }}
          >
            <TextInput
              style={{
                height: 45,
                color: Color.gray,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: "#D6DDF6",
                backgroundColor: "#F9FAFF",
                borderRadius: 5,
                fontFamily: "Nunito-Regular"
              }}
              placeholder="Username"
              placeholderTextColor={Color.gray}
              keyboardType={"email-address"}
            />
            <TextInput
              style={{
                height: 45,
                color: Color.gray,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: "#D6DDF6",
                backgroundColor: "#F9FAFF",
                fontFamily: "Nunito-Regular",
                borderRadius: 5,
                marginTop: 15,
                marginBottom: 15
              }}
              placeholder="Password"
              placeholderTextColor={Color.gray}
              keyboardType={"visible-password"}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.props.onLoginPress}
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
                  LOGIN
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text
              style={{
                color: Color.gray,
                fontFamily: "Nunito-SemiBold",
                textDecorationLine: "underline",
                margin: 10,
                textAlign: "center"
              }}
            >
              Forgot your password?
            </Text>
          </View>
          {/* <Text style={{ fontFamily: "Nunito-Black", color: "black" }}>test</Text>
        <Text style={{color:"black"}}>test</Text> */}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
