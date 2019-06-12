import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Color, Images} from "common_f";
import{CustomButton} from "component_f";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

const { height, width } = Dimensions.get("window");

class ForgetPasswordScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={[styles.row, styles.header]}>
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
        </View>
      ),
      headerTransparent: true
      //mode: "modal"
    };
  };
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always"  >
      <View style={styles.container}>
        <Image
          source={Images.ForgetPassword}
          style={{ width: width, height: height/2, marginTop: 30 }}
        />
        <View
          style={{
        //    marginTop: 50,
            flex: 1,
            alignItems: "center",
            paddingHorizontal: 30
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: 24,
              //fontWeight: "bold",
              fontFamily: "Nunito-Black",
              marginBottom: 15,
            //  marginTop:20
            }}
          >
            Forgot Password ?
          </Text>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 16,
              fontFamily: "Nunito-Regular"
            }}
          >
            Enter your registered email to receive instructions on how to reset
            your password.
          </Text>
          <TextInput
                style={[styles.input]}
               
                placeholder="Enter your email"
                placeholderTextColor={Color.gray}
                
              />  
              
          </View>
          </View>
          <View style={{ paddingHorizontal : 35, paddingBottom: 80}} > 
              <CustomButton
              buttonText={"RECOVER PASSWORD"}
              onButtonPress={() => this.handleLogin()}
            />     
            </View>

      </ScrollView>
    );
  }
}
export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
    //justifyContent: "center"
  },
  row: {
    flexDirection: "row"
  },
  header: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 0,
    padding: 36,
    marginTop: Platform.OS === "ios" ? 14 : 0
  },
  back: {
    width: 16 * 3,
    height: 16 * 3,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  input: { 
    marginTop: 40,
    marginBottom: 10,
    width:340,
    backgroundColor: "#F9FAFF",
    color: Color.gray,
    backgroundColor: "#F9FAFF",
    fontFamily: "Nunito-Regular",
    borderRadius: 5
  },
});
