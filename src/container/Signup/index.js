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
import { Images, Color } from "common_f";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LoadingSpinnerOverlay } from "component_f";

const { width, height } = Dimensions.get("window");

class Signup extends Component {
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
    //simulate http request
    setTimeout(() => {
      this._modal_2_LoadingSpinnerOverLay.hide();
    }, 3000);
  };

  render() {
    return (
      <ScrollView>
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
                placeholder="Password"
                placeholderTextColor={Color.gray}
                keyboardType={"email-address"}
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
                placeholder="Confirm Password"
                placeholderTextColor={Color.gray}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this._showModal_2_LoadingSpinnerOverLay}
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
  }
});
