import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
  Animated,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  ProgressBarAndroid,
  ActivityIndicatorIOS
} from "react-native";
import { Color, Images, Config } from "common_f";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import { CustomHeader, LoadingSpinnerOverlay } from "component_f";
import Geocoder from "react-native-geocoder";
import { connect } from "react-redux";
import { toast } from "app_f/Omni";
import { Snackbar } from "react-native-paper";
import fetch from "react-native-fetch-polyfill";
import AsyncStorage from "@react-native-community/async-storage";
const { width } = Dimensions.get("window");

class Home extends Component {
  scrollX = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 1,
      visible: false,
      data: ""
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.activity === true) {
      this.fetchData();
    }
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this._modal_2_LoadingSpinnerOverLay.show();
    navigator.geolocation.getCurrentPosition(
      position => {
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
      error => {
        console.log(JSON.stringify(error));
        this.setState({ visible: true });
      }
    );
    // {
    //   enableHighAccuracy: false,
    //   timeout: 2000,
    //   maximumAge: 2000
    // }

    AsyncStorage.getItem("token").then(token => {
      const fetchOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
        timeout: 10000
      };

      fetch(Config.homeUrl, fetchOptions)
        .then(response => {
          if (response.status === 200) {
            response.json().then(responseJSON => {
              console.log(responseJSON);
              this.setState({ data: responseJSON });
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
    });
  };

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

  renderRecommended = () => {
    const { recommended } = this.state.data;
    return (
      <View style={styles.recommendContainer}>
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendText}>Recommended</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.onViewAllScreen({ recommended })}
          >
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "column" }}>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            decelerationRate="normal"
            scrollEventThrottle={100}
            snapToInterval={width - 80}
            snapToAlignment="center"
            data={recommended}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) =>
              this.renderRecommendation(item, index)
            }
          />
        </View>
      </View>
    );
  };

  renderRecommendation = (item, index) => {
    const recommended = this.state.data.recommended;
    const isLastItem = index === recommended.length - 1;
    return (
      <TouchableWithoutFeedback
        activeOpacity={0.5}
        onPress={() => this.props.onProductDetailScreen({ item })}
      >
        <View
          style={[
            styles.recommendation,
            styles.shadow,
            index === 0 ? { marginLeft: 32 } : null,
            isLastItem ? { marginRight: 24 } : null
          ]}
        >
          <View style={[styles.recommendationHeader, styles.shadow]}>
            <Image
              style={styles.recommendationImage}
              source={{ uri: `${Config.baseUrl}${item.image_url[0].image}` }}
            />
          </View>
          <View style={[styles.bottomContainer, styles.shadow]}>
            <Text style={styles.recommendationTitle}>{item.name} </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.recommendlocation}>
                Rs. {Number(item.price)} • 0.4 km from you
              </Text>
            </View>
            <View style={styles.recommendRating}>
              {this.renderRatings(item.rating)}
              <Text style={styles.recommendPrice}>880 ratings</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderRatings(rating) {
    const stars = new Array(5).fill(0);
    return stars.map((_, index) => {
      const activeStar = Math.floor(rating) >= index + 1;
      return (
        <FontAwesome
          name="star"
          key={`star-${index}`}
          size={14}
          color={Color[activeStar ? "tertiary" : "gray"]}
          style={{ justifyContent: "space-evenly" }}
        />
      );
    });
  }

  renderCarousels = () => {
    return (
      <View style={styles.carouselContainer}>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="normal"
          scrollEventThrottle={100}
          // snapToInterval={width - 40}
          snapToAlignment="center"
          style={{ overflow: "visible" }}
          data={this.state.data.top_rated}
          keyExtractor={item => `${item.id}`}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.scrollX } } }
          ])}
          renderItem={({ item }) => this.renderCarousel(item)}
        />
        {this.state.data ? this.renderDots(this.state.data.top_rated) : null}
      </View>
    );
  };

  renderCarousel = item => {
    console.log("inside render", item);
    return (
      <TouchableWithoutFeedback
        style={[styles.shadow, { elevation: 4 }]}
        onPress={() => this.props.onProductDetailScreen({ item })}
      >
        <View style={{ marginBottom: 35 }}>
          <Image
            style={styles.destination}
            imageStyle={{ borderRadius: 7 }}
            resizeMode="cover"
            source={{ uri: `${Config.baseUrl}${item.image_url[0].image}` }}
          />
          <View style={[styles.destinationInfo, styles.shadow]}>
            <Text style={{ color: Color.black, fontFamily: "Nunito-Black" }}>
              {item.name}
            </Text>
            <View style={styles.carouselTextView}>
              <Text
                style={{ color: Color.gray2, fontFamily: "Nunito-Regular" }}
              >
                {item.description}
              </Text>
              <FontAwesome
                name="chevron-right"
                size={16 * 0.75}
                color={Color.gray2}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderDots = item => {
    const dotPosition = Animated.divide(this.scrollX, width);
    console.log("toprated", item);
    return (
      <View style={styles.dotsContainer}>
        {item.map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp"
          });
          return (
            <Animated.View
              key={`step-${index}`}
              style={{
                flex: 0,
                backgroundColor: Color.secondary,
                opacity: borderWidth,
                width: 6,
                height: 6,
                borderRadius: 6,
                marginHorizontal: 5
              }}
            />
          );
        })}
      </View>
    );
  };

  renderRecentlyAdded = () => {
    const { recently_added } = this.state.data;
    const recommended = recently_added;
    return (
      <View style={styles.recommendContainer}>
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendText}>Recently Added</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.onViewAllScreen({ recommended })}
          >
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "column" }}>
          <FlatList
            style={{ overflow: "visible" }}
            data={recently_added}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) =>
              this.renderRecentlyAddedItems(item, index)
            }
          />
        </View>
      </View>
    );
  };

  renderRecentlyAddedItems = (item, index) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.onProductDetailScreen({ item })}
      >
        <View
          style={[
            styles.shadow,
            {
              flexDirection: "row",
              backgroundColor: "#fff",
              padding: 15,
              marginLeft: 32,
              marginRight: 32,
              marginVertical: 6,
              borderRadius: 12,
              flex: 1
            }
          ]}
        >
          <View
            style={{
              flex: 0.3,
              paddingRight: Platform.OS === "ios" ? 14 : 0
            }}
          >
            <Image
              style={{ width: 85, height: 85, borderRadius: 6 }}
              source={{ uri: `${Config.baseUrl}${item.image_url[0].image}` }}
            />
          </View>
          <View
            style={{
              flex: 0.7,
              flexDirection: "column"
            }}
          >
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text
                style={{
                  color: Color.black,
                  fontSize: 16,
                  fontFamily: "Nunito-Bold"
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  color: Color.secondary,
                  fontFamily: "Nunito-Bold",
                  marginRight: 10
                }}
              >
                Rs. {Number(item.price).toFixed(2)}
              </Text>
            </View>
            <Text
              style={{
                color: Color.gray2,
                fontFamily: "Nunito-Regular",
                fontSize: 12,
                marginVertical: 5
              }}
            >
              {item.description}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 3
              }}
            >
              <Text
                style={{
                  color: Color.black,
                  fontFamily: "Nunito-Regular",
                  fontSize: 12,
                  textAlign: "left"
                }}
              >
                Chef: {item.owner.full_name}
              </Text>
              <TouchableWithoutFeedback onPress={() => this.addToCart(item.id)}>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: "Nunito-Bold",
                    backgroundColor: Color.secondary,
                    elevation: 2,
                    borderRadius: 6,
                    padding: 5,
                    textAlign: "right"
                  }}
                >
                  Add to Cart
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  addToCart = id => {
    console.log(id);
    this._modal_2_LoadingSpinnerOverLay.show();
    AsyncStorage.getItem("token").then(token => {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          items: id,
          quantity: 1,
          ordered: false
        }),
        timeout: 10000
      };
      console.log(fetchOptions);
      fetch(Config.addToCartUrl, fetchOptions)
        .then(response => {
          if (response.status === 201) {
            response.json().then(responseJSON => {
              console.log(responseJSON);
              this._modal_2_LoadingSpinnerOverLay.hide();
              this.props.onCartScreen();
            });
          } else {
            response.json().then(responseJSON => {
              this._modal_2_LoadingSpinnerOverLay.hide();
              toast(responseJSON.message);
            });
          }
        })
        .catch(err => {
          console.log(err);
          this._modal_2_LoadingSpinnerOverLay.hide();
          toast("Network request failed");
        });
    });
  };

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* {this.renderHeader()} */}
        <CustomHeader
          onMapScreenPress={this.props.onMapScreenPress}
          onEditProfileScreen={this.props.onEditProfileScreen}
        />
        {this.renderCarousels()}
        {this.renderRecommended()}
        {this.renderRecentlyAdded()}
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: "Retry",
            onPress: () => {
              // Do something
            }
          }}
        >
          Couldn't get your current location
        </Snackbar>
        <LoadingSpinnerOverlay
          ref={component => (this._modal_2_LoadingSpinnerOverLay = component)}
        >
          {this._renderActivityIndicator()}
        </LoadingSpinnerOverlay>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  const { actions } = require("redux_f/LocationRedux");

  return {
    updateCurrentLocation: (long, lat, actualLocation) =>
      dispatch(actions.updateCurrentLocation(long, lat, actualLocation))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
