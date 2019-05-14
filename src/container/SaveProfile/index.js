import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal
} from "react-native";
import { Color, Images } from "common_f";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TextField } from "react-native-material-textfield";
import ImageViewer from "react-native-image-zoom-viewer";

class SaveProfile extends Component {
  state = {
    fullname: "Pratik Gurung",
    emailaddress: "gurung.pratik04@gmail.com",
    phonenumber: "9806678116",
    address: "Rambazar, Pokhara",
    birthday: "Aug 3, 1997",
    image: Images.Profile,
    modalVisible: false
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
          <View style={styles.container}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ modalVisible: true })}
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
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
export default SaveProfile;

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
  }
});
