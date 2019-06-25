import React, { PureComponent } from "react";
import {
  View,
  Text,
  Animated,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import { Color, Config } from "common_f";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { CustomButton } from "component_f";
import styles from "./styles";
import fetch from "react-native-fetch-polyfill";
import AsyncStorage from "@react-native-community/async-storage";

const { width, height } = Dimensions.get("window");

class ProductDetail extends PureComponent {
  scrollX = new Animated.Value(0);

  renderHeaderImage = () => {
    const { image_url } = this.props.product;
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
          {image_url.map((item, index) => (
            <Image
              key={`${index}-${item}`}
              source={{ uri: `${Config.baseUrl}${item.image}` }}
              resizeMode="cover"
              style={{ width, height: width }}
            />
          ))}
        </ScrollView>
        {this.renderDots(image_url)}
      </View>
    );
  };

  renderDots = image_url => {
    const dotPosition = Animated.divide(this.scrollX, width);

    return (
      <View style={[styles.container, styles.row, styles.dotsContainer]}>
        {image_url.map((item, index) => {
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
  addToCart = product => {
    AsyncStorage.getItem("token").then(token => {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          items: product.id,
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

              this.props.onCartScreenPress({ product });
            });
          } else {
            response.json().then(responseJSON => {
              toast(responseJSON.message);
            });
          }
        })
        .catch(err => {
          console.log(err);
          toast("Network request failed");
        });
    });
  };

  render() {
    const { product } = this.props;
    const { product_rating1 } = this.props.product;
    console.log(product);
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 44 }}
        >
          <View style={styles.container}>
            <View style={styles.container}>{this.renderHeaderImage()}</View>
          </View>
          <View style={[styles.container, styles.contentHeader]}>
            <TouchableHighlight
              activeOpacity={0.8}
              onPress={() => this.props.onProfileScreenPress({ product })}
              style={styles.profileButton}
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: "https://randomuser.me/api/portraits/women/44.jpg"
                }}
              />
            </TouchableHighlight>

            <Text style={[styles.title, styles.nunitoBlack]}>
              {product.name}
            </Text>

            <View style={[styles.row, styles.rating]}>
              <View style={[styles.row, { alignItems: "center" }]}>
                {this.renderRatings(product.rating)}
                <Text style={[styles.nunitoRegular, styles.reviewText]}>
                  ({product.rating} reviews)
                </Text>
              </View>
              <Text style={[styles.nunitoBlack, styles.priceText]}>
                Rs {product.price}
              </Text>
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
                  {product.Time_to_make} minutes to wait
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={this.props.onProfileScreenPress}>
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
                    { color: Color.secondary, marginTop: 6, fontSize: 14 }
                  ]}
                >
                  {product.owner.full_name}
                </Text>
              </View>
            </TouchableOpacity>

            <Text style={[styles.nunitoBlack, styles.titleText]}>Details</Text>
            <Text style={[styles.description, styles.nunitoRegular]}>
              {product.description.split("").slice(0, 180)}
            </Text>

            <Text style={[styles.titleText, styles.nunitoBlack]}> Reviews</Text>

            {product_rating1.length > 0 ? (
              product_rating1.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={[styles.row, styles.reviewContainer, styles.shadow]}
                  >
                    <View style={styles.reviewImageContainer}>
                      <Image
                        style={styles.reviewAvatar}
                        source={{
                          uri:
                            "https://randomuser.me/api/portraits/women/44.jpg"
                        }}
                      />
                      <Text
                        style={[
                          styles.nunitoRegular,
                          styles.smallGray,
                          { marginTop: 3 }
                        ]}
                      >
                        {item.owner}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 5,
                        paddingVertical: 22,
                        paddingHorizontal: 6
                      }}
                    >
                      <Text style={[styles.nunitoRegular, styles.regularGray]}>
                        {item.feedback}
                      </Text>
                      <Text style={[styles.nunitoRegular, styles.reviewDate]}>
                        22 Dec, 2018
                      </Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <Text
                style={[
                  styles.nunitoRegular,
                  { color: "black", padding: 20, textAlign: "center" }
                ]}
              >
                No reviews for this product yet.
              </Text>
            )}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CustomButton
            buttonText={"ADD TO CART"}
            onButtonPress={() => this.addToCart(product)}
          />
        </View>
      </View>
    );
  }
}

export default ProductDetail;
