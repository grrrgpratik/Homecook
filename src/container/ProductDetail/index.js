import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity
} from "react-native";
import { Color } from "common_f";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { CustomButton } from "component_f";

const article = [
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
      "A chunky salad of cucumbers, cherry tomatoes, peppery mint leaves drizzeled with a black olives sauce.",
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
    ],
    review: [
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80"
    ]
  }
];
const { width, height } = Dimensions.get("window");

class ProductDetail extends Component {
  scrollX = new Animated.Value(0);

  renderHeaderImage = () => {
    return (
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="normal"
          scrollEventThrottle={16}
          snapToAlignment="center"
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.scrollX } } }
          ])}
        >
          {article[0].images.map((img, index) => (
            <Image
              key={`${index}-${img}`}
              source={{ uri: img }}
              resizeMode="cover"
              style={{ width, height: width }}
            />
          ))}
        </ScrollView>
        {this.renderDots()}
      </View>
    );
  };

  renderDots = () => {
    const dotPosition = Animated.divide(this.scrollX, width);

    return (
      <View style={[styles.container, styles.row, styles.dotsContainer]}>
        {article[0].images.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp"
          });
          return (
            <Animated.View
              key={`step-${item}-${index}`}
              style={[styles.dots, { opacity }]}
            />
          );
        })}
      </View>
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
          style={{ justifyContent: "space-evenly", marginRight: 3 }}
        />
      );
    });
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 44 }}
      >
        <View style={styles.container}>
          <View style={styles.container}>{this.renderHeaderImage()}</View>
        </View>
        <View style={[styles.container, styles.contentHeader]}>
          <TouchableOpacity
            style={Platform.OS === "android" ? { elevation: 2 } : styles.shadow}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg"
              }}
            />
          </TouchableOpacity>

          <Text style={[styles.title, styles.nunitoBlack]}>
            {article[0].title}
          </Text>

          <View style={[styles.row, styles.rating]}>
            <View style={[styles.row, { alignItems: "center" }]}>
              {this.renderRatings(article[0].rating)}
              <Text style={[styles.nunitoRegular, styles.reviewText]}>
                ({article[0].reviews} reviews)
              </Text>
            </View>
            <Text style={[styles.nunitoBlack, styles.priceText]}>Rs 8.00</Text>
          </View>

          <View style={[styles.row, styles.textContainer]}>
            <Text style={[styles.nunitoRegular, styles.regularGray]}>
              Ranipauwa, Pokhara
            </Text>
            <Text style={[styles.nunitoRegular, styles.smallGray]}>
              Free Shipping
            </Text>
          </View>

          <View style={[styles.row, styles.textContainer]}>
            <View style={styles.row}>
              <EvilIcons
                name="location"
                size={18}
                color={Color.black}
                style={{ alignSelf: "center", marginRight: 3 }}
              />
              <Text style={[styles.nunitoRegular, styles.regularGray]}>
                3.5 km away
              </Text>
            </View>
            <View style={styles.row}>
              <Ionicons
                name="ios-timer"
                size={16}
                color={Color.black}
                style={{ alignSelf: "center", marginRight: 4 }}
              />
              <Text style={[styles.nunitoRegular, styles.smallGray]}>
                22 minutes to wait
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text
              style={[
                styles.nunitoRegular,
                { color: Color.black, marginTop: 6 }
              ]}
            >
              Chef:{" "}
            </Text>
            <Text
              style={[
                styles.nunitoRegular,
                { color: Color.secondary, marginTop: 6 }
              ]}
            >
              Pratik Gurung
            </Text>
          </View>

          <Text style={[styles.nunitoBlack, styles.titleText]}>Details</Text>
          <Text style={[styles.description, styles.nunitoRegular]}>
            {article[0].description.split("").slice(0, 180)}
          </Text>

          <Text style={[styles.titleText, styles.nunitoBlack]}> Reviews</Text>

          {article[0].review.map((item, index) => {
            return (
              <View key={index} style={[styles.row, styles.reviewContainer]}>
                <View style={styles.reviewImageContainer}>
                  <Image
                    style={styles.reviewAvatar}
                    source={{
                      uri: "https://randomuser.me/api/portraits/women/44.jpg"
                    }}
                  />
                  <Text
                    style={[
                      styles.nunitoRegular,
                      styles.smallGray,
                      { marginTop: 3 }
                    ]}
                  >
                    Pratik Gurung
                  </Text>
                </View>

                <View style={{ flex: 5, padding: 22 }}>
                  <Text style={[styles.nunitoRegular, styles.regularGray]}>
                    We had such delicious food and dishes. Fantastic thalis,
                    superb
                  </Text>
                  <Text style={[styles.nunitoRegular, styles.reviewDate]}>
                    22 Dec, 2018
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton buttonText={"ADD TO CART"} />
        </View>
      </ScrollView>
    );
  }
}
export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: "row"
  },
  dotsContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 48,
    right: 0,
    left: 0
  },
  dots: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
    backgroundColor: Color.white
  },
  contentHeader: {
    padding: 32,
    backgroundColor: "#fcfcfc",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -18
  },
  avatar: {
    position: "absolute",
    bottom: 8,
    right: 18,
    width: 36 * 2,
    height: 36 * 2,
    borderRadius: 36
  },
  reviewAvatar: {
    width: 24 * 2,
    height: 24 * 2,
    borderRadius: 24
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
  description: {
    fontSize: 14,
    color: Color.black
  },
  nunitoBlack: {
    fontFamily: "Nunito-Black"
  },
  nunitoRegular: {
    fontFamily: "Nunito-Regular"
  },
  rating: {
    marginTop: 12,
    justifyContent: "space-between"
  },
  reviewText: { marginLeft: 8, color: Color.black, fontSize: 14 },
  priceText: { color: Color.secondary, fontSize: 20 },
  textContainer: {
    marginTop: 6,
    justifyContent: "space-between"
  },
  regularGray: { color: Color.black, fontSize: 14 },
  smallGray: { color: Color.black, fontSize: 12 },
  titleText: {
    marginTop: 25,
    color: Color.black,
    fontSize: 24,
    marginBottom: 5
  },
  reviewContainer: {
    borderRadius: 7,
    elevation: 1,
    backgroundColor: "#fff",
    marginVertical: 5
  },
  reviewImageContainer: {
    flex: 1,
    padding: 22,
    alignItems: "center",
    justifyContent: "center"
  },
  reviewDate: { color: Color.gray, fontSize: 12, paddingTop: 28 },
  buttonContainer: {
    position: "absolute",
    bottom: -15,
    left: 0,
    right: 0,
    padding: 32
  }
});
