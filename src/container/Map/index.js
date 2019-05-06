import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import MapView from "react-native-maps";
import { Color } from "common_f";
import { CustomButton, CustomHeader } from "component_f";

import Geocoder from "react-native-geocoder";
import { connect } from "react-redux";

const { Marker } = MapView;
const { height, width } = Dimensions.get("screen");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      actualLocation: "Searching..."
    };
  }

  getActualLocation = () => {
    const geo = {
      lat: 28.222392 || this.state.latitude,
      lng: 83.993712 || this.state.longitude
    };
    Geocoder.geocodePosition(geo)
      .then(res => {
        console.log(res);
        this.setState({
          actualLocation: res[0].formattedAddress
        });
      })
      .catch(err => console.log(err));
  };

  setLocation = () => {};

  render() {
    const { latitude, longitude } = this.props.location;

    return (
      <View style={styles.container}>
        <CustomHeader mapScreen={true} />
        <MapView
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          showsMyLocationButton
          style={styles.map}
          zoomEnabled={true}
          minZoomLevel={10}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude
            }}
          >
            <View style={styles.myMarker}>
              <View style={styles.myMarkerDot} />
            </View>
          </Marker>
        </MapView>
        <View style={styles.buttonContainer}>
          <CustomButton
            buttonText={"SET LOCATION"}
            onButtonPress={() => this.setLocation()}
          />
          {console.log("actual location", this.state.actualLocation)}
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
)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 7
  },
  myMarker: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(10, 196, 186, 0.3)"
  },
  myMarkerDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: Color.primary
  },
  shadow: {
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  buttonContainer: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    padding: 25
  }
});
