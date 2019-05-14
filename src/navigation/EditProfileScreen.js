import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { EditProfile } from "container_f";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Color } from "common_f";

class EditProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              color={"black"}
              size={30}
            />
          </TouchableOpacity>
          <Text style={styles.title}>My Profile</Text>
        </View>
      )
      // headerTransparent: true
      //mode: "modal"
    };
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <EditProfile
        onLogoutPress={() => navigate("Welcome")}
        onSaveProfilePress={() => navigate("SaveProfile")}
      />
    );
  }
}
export default EditProfileScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  header: {
    backgroundColor: "#fff",
    padding: 22
  },
  back: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  title: {
    fontSize: 24,
    color: Color.black,
    fontFamily: "Nunito-Black",
    padding: 10
  }
});
