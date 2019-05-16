import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Color, Images } from "common_f";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("window");

class CustomeHeader extends PureComponent {
  render() {
    console.log("state location", this.props.location);
    const location = this.props.location.actualLocation;

    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.headerView}>
            <View style={styles.options}>
              <Text style={styles.locationText}>Your Location</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                {this.props.mapScreen === true ? (
                  <Text style={styles.actualLocation}>
                    {location.split(",", 2)}
                  </Text>
                ) : (
                  <Text style={styles.actualLocation}>
                    {location.split(",", 1)}
                  </Text>
                )}
                <FontAwesome
                  name="chevron-down"
                  size={16 * 0.75}
                  color={Color.black}
                  style={{ marginLeft: 6, marginTop: 4 }}
                />
              </View>
            </View>
          </View>

          {this.props.mapScreen === true ? (
            <View style={styles.settings}>
              <TouchableOpacity onPress={this.props.onMyLocationPress}>
                <MaterialIcons
                  name="my-location"
                  size={26}
                  color={Color.black}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.settings}>
              <TouchableOpacity onPress={this.props.onMapScreenPress}>
                <Image source={Images.IconMap} style={styles.iconMap} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.onEditProfileScreen}>
                <Image source={Images.Profile} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.location
  };
};

export default connect(
  mapStateToProps,
  null
)(CustomeHeader);

const styles = StyleSheet.create({
  headerContainer: {
    //top: 0,
    // height: height * 0.12,
    width: width,
    flex: 1
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.15,
    paddingHorizontal: 16
  },
  headerView: {
    flex: 2,
    flexDirection: "row"
    //paddingBottom: 5
  },
  options: {
    flex: 1,
    paddingHorizontal: 14
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  locationText: {
    fontSize: 14,
    color: Color.gray,
    marginBottom: 5,
    fontFamily: "Nunito-SemiBold"
  },
  actualLocation: {
    fontSize: 16,
    color: Color.black,
    fontFamily: "Nunito-Bold"
  },
  settings: {
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingRight: 16,
    flexDirection: "row"
  },
  iconMap: { height: 25, width: 25, marginRight: 28 }
});
