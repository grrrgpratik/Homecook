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
  Platform
} from "react-native";
import { Color, Images } from "common_f";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import { CustomHeader } from "component_f";
import Geocoder from "react-native-geocoder";
import { connect } from "react-redux";
import { toast } from "app_f/Omni";
import { Snackbar } from "react-native-paper";

const { width } = Dimensions.get("window");
const ENTRIES1 = [
  {
    title: "Momo Chicken",
    subtitle: "Rs 150",
    illustration: Images.ChickenMomo
  },
  {
    title: "Biryani Chicken",
    subtitle:
      "Biryani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent.",
    illustration: Images.BiryaniChicken
  },
  {
    title: "Buff Samaya Baji Set",
    subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
    illustration: Images.BuffSamayaBaji
  },
  {
    title: "Chicken sandwich",
    subtitle: "Lorem ipsum dolor sit amet",
    illustration: Images.AlooDum
  }
];

const mocks = [
  {
    id: 1,
    user: {
      name: "Lelia Chavez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    saved: true,
    location: "0.4 Km from you",
    temperature: 34,
    title: "Santorini",
    description:
      "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC",
    rating: 4.3,
    price: 224.0,
    reviews: 3212,
    preview:
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    user: {
      name: "Lelia Chavez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    saved: false,
    location: "0.4 Km from you",
    temperature: 34,
    title: "Loutraki",
    description: "This attractive small town, 80 kilometers from Athens",
    rating: 4.6,
    reviews: 3212,
    price: 122.0,
    preview:
      "https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    user: {
      name: "Lelia Chavez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    saved: true,
    location: "0.4 Km from you",
    temperature: 34,
    title: "Santorini",
    description: "Santorini - Description",
    rating: 3.2,
    reviews: 3212,
    price: 432.0,
    preview:
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 4,
    user: {
      name: "Lelia Chavez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    location: "0.4 Km from you",
    temperature: 34,
    title: "Loutraki",
    description: "This attractive small town, 80 kilometers from Athens",
    rating: 5,
    reviews: 3212,
    price: 400.0,
    preview:
      "https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

class Home extends Component {
  scrollX = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 1,
      visible: false
    };
  }

  // componentDidMount() {
  //   console.log("inside component");
  //   navigator.geolocation.getCurrentPosition(
  //     position => {
  //       const geo = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude
  //       };
  //       Geocoder.geocodePosition(geo)
  //         .then(res => {
  //           console.log(res);
  //           this.props.updateCurrentLocation(
  //             geo.lng,
  //             geo.lat,
  //             res[0].formattedAddress
  //           );
  //         })
  //         .catch(err => toast(err));
  //     },
  //     error => {
  //       console.log(JSON.stringify(error));
  //       this.setState({ visible: true });
  //     }
  //     // {
  //     //   enableHighAccuracy: false,
  //     //   timeout: 2000,
  //     //   maximumAge: 2000
  //     // }
  //   );
  // }

  renderRecommended = () => {
    return (
      <View style={styles.recommendContainer}>
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendText}>Recommended</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.props.onViewAllScreen}
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
            snapToInterval={width - 60}
            snapToAlignment="center"
            data={mocks}
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
    const isLastItem = index === mocks.length - 1;
    return (
      <TouchableWithoutFeedback
        activeOpacity={0.5}
        onPress={this.props.onProductDetailScreen}
        // style={[styles.shadow, { backgroundColor: 'red' }]}
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
              source={{ uri: item.preview }}
            />
          </View>
          <View style={[styles.bottomContainer, styles.shadow]}>
            <Text style={styles.recommendationTitle}>{item.title} </Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.recommendlocation}>
                Rs. {Number(item.price)}
              </Text>
              <View
                style={{
                  marginVertical: 6,
                  marginLeft: 4,
                  marginRight: 2,
                  width: 4,
                  height: 4,
                  borderRadius: 6,
                  backgroundColor: Color.black
                }}
              />
              <Text style={styles.recommendlocation}> {item.location}</Text>
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
          data={ENTRIES1}
          keyExtractor={(item, index) => `${item.title}`}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.scrollX } } }
          ])}
          renderItem={({ item }) => this.renderCarousel(item)}
        />
        {this.renderDots()}
      </View>
    );
  };

  renderCarousel = item => {
    console.log("inside render", item);
    return (
      <TouchableWithoutFeedback style={[styles.shadow, { elevation: 4 }]}>
        <View style={{ marginBottom: 35 }}>
          <Image
            style={styles.destination}
            imageStyle={{ borderRadius: 7 }}
            resizeMode="cover"
            source={item.illustration}
          />
          <View style={[styles.destinationInfo, styles.shadow]}>
            <Text style={{ color: Color.black, fontFamily: "Nunito-Black" }}>
              {item.title}
            </Text>
            <View style={styles.carouselTextView}>
              <Text
                style={{ color: Color.gray2, fontFamily: "Nunito-Regular" }}
              >
                {item.subtitle.split("").slice(0, 50)}...
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

  renderDots() {
    const dotPosition = Animated.divide(this.scrollX, width);
    return (
      <View style={styles.dotsContainer}>
        {mocks.map((item, index) => {
          const borderWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp"
          });
          return (
            <Animated.View
              key={`step-${item.id}`}
              // style={[
              //   styles.dots,
              //   //styles.activeDot,
              //   { opacity: borderWidth }
              // ]}
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
  }

  renderRecentlyAdded = () => {
    return (
      <View style={styles.recommendContainer}>
        <View style={styles.recommendedHeader}>
          <Text style={styles.recommendText}>Recently Added</Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "column" }}>
          <FlatList
            style={{ overflow: "visible" }}
            data={mocks}
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
      <View
        style={[
          styles.shadow,
          {
            flexDirection: "row",
            backgroundColor: "#fff",
            padding: 15,
            //marginHorizontal: 20,
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
            //backgroundColor: 'blue',
            paddingRight: Platform.OS === "ios" ? 14 : 0
          }}
        >
          <Image
            style={{ width: 85, height: 85, borderRadius: 6 }}
            source={{ uri: item.preview }}
          />
        </View>
        <View
          style={{
            flex: 0.7,
            flexDirection: "column"
            //backgroundColor: 'red'
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
              {item.title}
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
        </View>
      </View>
    );
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
