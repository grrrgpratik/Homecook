import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Platform,
  ActivityIndicator
} from "react-native";
import { Color, Images, Config } from "common_f";
import { LoadingSpinnerOverlay } from "component_f";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TextField } from "react-native-material-textfield";
import ImageViewer from "react-native-image-zoom-viewer";
import AsyncStorage from "@react-native-community/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import fetch from "react-native-fetch-polyfill";
import { toast } from "app_f/Omni";

class SaveProfileScreen extends Component {
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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>EDIT PROFILE</Text>
            <TouchableOpacity onPress={navigation.getParam("handleSave")}>
              <Text style={[styles.title, { color: Color.secondary }]}>
                SAVE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
      // headerTransparent: true
      //mode: "modal"
    };
  };

  state = {
    fullname: "",
    emailaddress: "",
    phonenumber: "",
    address: "",
    birthday: "",
    image: Images.Profile,
    modalVisible: false
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.handleSave });
    AsyncStorage.getItem("user").then(user => {
      console.log("user id", JSON.parse(user));
      const userinfo = JSON.parse(user);
      this.setState({
        fullname: userinfo.full_name,
        emailaddress: userinfo.email
      });
    });
  }

  handleSave = () => {
    this._modal_2_LoadingSpinnerOverLay.show();
    const {
      fullname,
      emailaddress,
      phonenumber,
      address,
      birthday
    } = this.state;

    const fetchOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailaddress,
        full_name: fullname,
        phoneNumber: phonenumber,
        location: address
      }),
      timeout: 10000
    };

    fetch(Config.editProfileUrl, fetchOptions)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          response.json().then(responseJSON => {
            console.log(responseJSON);
            toast("Profile Detail Saved Successfully");
            this._modal_2_LoadingSpinnerOverLay.hide();
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
  };

  _renderActivityIndicator() {
    return (
      <ActivityIndicator
        animating={true}
        color={Color.secondary}
        size={"small"}
      />
    );
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={-30}
          enabled
        >
          <View style={styles.container}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: true })}
                onLongPress={() => console.log("test")}
              >
                <Image source={Images.Profile} style={styles.avatar} />
              </TouchableOpacity>

              <View
                style={{
                  backgroundColor: Color.secondary,
                  width: 34,
                  height: 34,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 17,
                  position: "absolute",
                  bottom: 27,
                  right: 140,
                  elevation: 2
                }}
              >
                <FontAwesome name="camera" color={"#fff"} size={16} />
              </View>
            </View>

            <View style={{ flex: 1, margin: 32 }}>
              <TextField
                value={this.state.fullname}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                tintColor={Color.secondary}
                onChangeText={text => this.setState({ firstname: text })}
                returnKeyType="next"
                label="Full Name"
              />
              <TextField
                value={this.state.emailaddress}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                tintColor={Color.secondary}
                onChangeText={text => this.setState({ emailaddress: text })}
                returnKeyType="next"
                label="Email"
              />
              <TextField
                value={this.state.phonenumber}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                tintColor={Color.secondary}
                onChangeText={text => this.setState({ phonenumber: text })}
                returnKeyType="next"
                label="Phone Number"
              />
              <TextField
                value={this.state.address}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                tintColor={Color.secondary}
                onChangeText={text => this.setState({ address: text })}
                returnKeyType="next"
                label="Address"
              />
              <TextField
                value={this.state.birthday}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                tintColor={Color.secondary}
                onChangeText={text => this.setState({ birthday: text })}
                returnKeyType="next"
                label="Birthday"
              />
            </View>
          </View>

          <Modal
            visible={this.state.modalVisible}
            transparent={true}
            onRequestClose={() => this.setState({ modalVisible: false })}
          >
            <ImageViewer
              imageUrls={[
                { props: { source: this.state.image }, freeHeight: true }
              ]}
              enableSwipeDown={true}
              enablePreload={true}
              onSwipeDown={() => {
                this.setState({ modalVisible: false });
              }}
              onMove={() => {
                this.setState({ modalVisible: false });
              }}
              saveToLocalByLongPress={true}
            />
          </Modal>

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
export default SaveProfileScreen;

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
  row: {
    flexDirection: "row"
  },
  header: {
    backgroundColor: "#fff",
    padding: 16,
    flexDirection: "row",
    marginTop: Platform.OS === "ios" ? 14 : 0
  },
  back: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 16,
    color: Color.black,
    fontFamily: "Nunito-Black",
    alignSelf: "center",
    marginLeft: 82
    //padding: 10
  },
  titleContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
    //backgroundColor: "red"
  }
});
