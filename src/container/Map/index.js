import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import MapView from "react-native-maps";
import { Color } from "common_f";
import { CustomButton, CustomHeader } from "component_f";
import { toast } from "app_f/Omni";
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
      latitude: this.props.location.latitude,
      longitude: this.props.location.longitude,
      actualLocation: "Searching...",
      locationChosen: false,
      latitudeDelta: 0.0922,
      longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
    };
  }

  getActualLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.map.animateToCoordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          locationChosen: true
        });
        const geo = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        Geocoder.geocodePosition(geo)
          .then(res => {
            console.log(res);
            this.props.updateCurrentLocation(
              geo.lng,
              geo.lat,
              res[0].formattedAddress
            );
          })
          .catch(err => toast(err));
      },
      error => toast(JSON.stringify(error)),
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 2000
      }
    );
  };

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToCoordinate({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState({
      latitude: coords.latitude,
      longitude: coords.longitude,
      locationChosen: true
    });
    const geo = {
      lat: coords.latitude,
      lng: coords.longitude
    };
    Geocoder.geocodePosition(geo)
      .then(res => {
        console.log(res);
        this.props.updateCurrentLocation(
          geo.lng,
          geo.lat,
          res[0].formattedAddress
        );
      })
      .catch(err => toast(err));
  };

  // this.props.onLocationPick({
  //   latitude: coords.latitude,
  //   longitude: coords.longitude
  // });

  setLocation = () => {};

  render() {
    const { latitude, longitude } = this.props.location;

    return (
      <View style={styles.container}>
        <CustomHeader
          mapScreen={true}
          onMyLocationPress={this.getActualLocation}
        />
        <MapView
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          onPress={this.pickLocationHandler}
          region={
            !this.state.locationChosen
              ? {
                  latitude: Number(this.state.latitude),
                  longitude: Number(this.state.longitude),
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA
                }
              : null
          }
          showsMyLocationButton
          style={styles.map}
          zoomEnabled={true}
          minZoomLevel={10}
          ref={ref => (this.map = ref)}
        >
          {this.state.locationChosen ? (
            <Marker
              coordinate={{
                latitude: Number(this.state.latitude),
                longitude: Number(this.state.longitude)
              }}
            >
              <View style={styles.myMarker}>
                <View style={styles.myMarkerDot} />
              </View>
            </Marker>
          ) : (
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
          )}
        </MapView>
        <View style={styles.buttonContainer}>
          <CustomButton
            buttonText={"SET LOCATION"}
            onButtonPress={() => this.props.onSetUpLocation()}
          />
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

const mapDispatchToProps = dispatch => {
  const { actions } = require("redux_f/LocationRedux");

  return {
    updateCurrentLocation: (long, lat, actualLocation) =>
      dispatch(actions.updateCurrentLocation(long, lat, actualLocation))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
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
