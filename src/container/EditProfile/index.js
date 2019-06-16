import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Color, Images, Config } from "common_f";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-community/async-storage";

class EditProfile extends Component {
  onLogoutPress = () => {
    AsyncStorage.removeItem("token").then(() => {
      this.props.onLogoutPress();
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.row, styles.profileContainer]}>
          <Image source={Images.Profile} style={styles.avatar} />
          <View style={{ marginHorizontal: 20 }}>
            <Text style={[styles.name, styles.nunitoBold]}>Pratik Gurung</Text>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={this.props.onSaveProfilePress}
            >
              <Text style={[styles.subtitle, styles.nunitoSemiBold]}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ backgroundColor: "white" }}>
          <View style={[styles.row, styles.optionContainer]}>
            <View style={{ justifyContent: "center" }}>
              <Text style={[styles.nunitoSemiBold, styles.regularBlack]}>
                Notifications
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              color={Color.gray2}
              size={24}
            />
          </View>
        </View>

        <View style={{ backgroundColor: "white" }}>
          <View style={[styles.row, styles.optionContainer]}>
            <View style={{ justifyContent: "center" }}>
              <Text style={[styles.nunitoSemiBold, styles.regularBlack]}>
                Language
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              color={Color.gray2}
              size={24}
            />
          </View>
        </View>

        <View style={{ backgroundColor: "white" }}>
          <View style={[styles.row, styles.optionContainer]}>
            <View style={{ justifyContent: "center" }}>
              <Text style={[styles.nunitoSemiBold, styles.regularBlack]}>
                Change Password
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              color={Color.gray2}
              size={24}
            />
          </View>
        </View>

        <View style={{ backgroundColor: "white", marginTop: 20 }}>
          <View style={[styles.row, styles.optionContainer]}>
            <View style={{ justifyContent: "center" }}>
              <Text style={[styles.nunitoSemiBold, styles.regularBlack]}>
                Clear Cache
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              color={Color.gray2}
              size={24}
            />
          </View>
        </View>

        <View style={{ backgroundColor: "white" }}>
          <View style={[styles.row, styles.optionContainer]}>
            <View style={{ justifyContent: "center" }}>
              <Text style={[styles.nunitoSemiBold, styles.regularBlack]}>
                Terms and Condition
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              color={Color.gray2}
              size={24}
            />
          </View>
        </View>

        <View style={{ backgroundColor: "white" }}>
          <View style={[styles.row, styles.optionContainer]}>
            <View style={{ justifyContent: "center" }}>
              <Text style={[styles.nunitoSemiBold, styles.regularBlack]}>
                Contact Us
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              color={Color.gray2}
              size={24}
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.onLogoutPress()}
        >
          <View style={{ backgroundColor: "white", marginTop: 30 }}>
            <View style={[styles.row, styles.logout]}>
              <Text style={[styles.nunitoSemiBold, styles.logoutText]}>
                Log Out
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6"
  },
  row: {
    flexDirection: "row"
  },
  content: {
    // padding: 24
  },
  shadow: {
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  title: {
    fontSize: 24,
    color: Color.black
  },
  nunitoBlack: {
    fontFamily: "Nunito-Black"
  },
  nunitoRegular: {
    fontFamily: "Nunito-Regular"
  },
  nunitoBold: {
    fontFamily: "Nunito-Bold"
  },
  nunitoSemiBold: {
    fontFamily: "Nunito-SemiBold"
  },
  regularBlack: { color: Color.black, fontSize: 16 },
  smallBlack: { color: Color.black, fontSize: 12 },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  subtitle: {
    fontSize: 16,
    color: Color.secondary,
    paddingTop: 2
  },
  name: {
    fontSize: 20,
    color: Color.black
  },
  profileContainer: {
    backgroundColor: Color.white,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginVertical: 20
  },
  optionContainer: {
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 24
  },
  logout: {
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  logoutText: { color: Color.secondary, fontSize: 16 }
});
