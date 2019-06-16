import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Image,
  FlatList,
  Dimensions
} from "react-native";
import { Color } from "common_f";
import Icon from "react-native-vector-icons/Ionicons";
import { CustomButton, EmptyCart } from "component_f";

const { width } = Dimensions.get("window");

const mocks = [
  {
    id: 1,
    user: {
      name: "Chicken Momo",
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
      name: "Fried Rice",
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
  }
];

class Cart extends Component {
  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
      </View>
    );
  }

  renderCartItem() {
    return (
      <View style={styles.recommendContainer}>
        <View style={{ flexDirection: "column" }}>
          <FlatList
            style={{ overflow: "visible" }}
            data={mocks}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) => this.renderItem(item, index)}
          />
        </View>
      </View>
    );
  }

  renderItem = (item, index) => {
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
            borderRadius: 12
          }
        ]}
      >
        <View style={{ flex: 0.25 }}>
          <Image
            style={{ width: 65, height: 65, borderRadius: 6 }}
            source={{ uri: item.preview }}
          />
        </View>
        <View
          style={{
            flex: 0.75,
            flexDirection: "column"
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              //alignItems: "flex-start",
              flexDirection: "row"
            }}
          >
            <View style={{ flexDirection: "column" }}>
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
                  marginRight: 10,
                  marginBottom: 10
                }}
              >
                Rs. {Number(item.price).toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                justifyContent: "flex-start"
              }}
            >
              <Icon
                style={{ padding: 4 }}
                name="ios-close"
                size={30}
                color={Color.black}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
              // backgroundColor: "red"
            }}
          >
            <Text
              style={{
                color: Color.black,
                fontSize: 14,
                fontFamily: "Nunito-Regular"
              }}
            >
              Made by:
              <Text
                style={{
                  color: Color.gray,
                  fontSize: 14,
                  fontFamily: "Nunito-Regular"
                }}
              >
                {" Pratik Gurung"}
              </Text>
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: Color.gray,
                  fontSize: 20,
                  fontFamily: "Nunito-Regular",
                  paddingHorizontal: 10
                }}
              >
                -
              </Text>

              <Text style={styles.regularText}>{item.id}</Text>

              <Text
                style={{
                  color: Color.gray,
                  fontSize: 20,
                  fontFamily: "Nunito-Regular",
                  paddingHorizontal: 10
                }}
              >
                +
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderSubTotal() {
    return (
      <View style={{ paddingBottom: 28 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginLeft: width * 0.5,
            paddingVertical: 4
          }}
        >
          <Text
            style={{
              color: Color.gray,
              fontSize: 14,
              fontFamily: "Nunito-Bold"
            }}
          >
            Sub Total
          </Text>
          <Text
            style={{
              color: Color.gray,
              fontSize: 14,
              fontFamily: "Nunito-Bold"
            }}
          >
            Rs. 100
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginLeft: width * 0.5,
            paddingVertical: 4
          }}
        >
          <Text
            style={{
              color: Color.gray,
              fontSize: 14,
              fontFamily: "Nunito-Bold"
            }}
          >
            Delivery
          </Text>
          <Text
            style={{
              color: Color.gray,
              fontSize: 14,
              fontFamily: "Nunito-Bold"
            }}
          >
            Rs. 10
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginLeft: width * 0.5,
            paddingVertical: 4
          }}
        >
          <Text
            style={{
              color: Color.black,
              fontSize: 18,
              fontFamily: "Nunito-Black"
            }}
          >
            Total
          </Text>
          <Text
            style={{
              color: Color.black,
              fontSize: 18,
              fontFamily: "Nunito-Black"
            }}
          >
            Rs. 100
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      // <View style={styles.container}>
      //   {this.renderHeader()}
      //   {this.renderCartItem()}
      //   {this.renderSubTotal()}
      //   <View style={styles.buttonContainer}>
      //     <CustomButton buttonText={'PROCEED TO CHECKOUT'} />
      //   </View>
      //   </View>
      <EmptyCart onEmptyCartPress={this.props.onHomeScreenPress} />
    );
  }
}
export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcfcfc"
  },
  header: {
    padding: 20
  },
  title: {
    fontSize: 24,
    color: Color.black,
    fontFamily: "Nunito-Black",
    paddingHorizontal: 10,
    marginTop: Platform.OS === "ios" ? 14 : 0
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFF",
    margin: 32,
    borderRadius: 22
  },
  searchIcon: {
    paddingBottom: 10
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#F9FAFF",
    color: Color.gray,
    backgroundColor: "#F9FAFF",
    fontFamily: "Nunito-Regular",
    borderRadius: 22
  },
  recentSearchText: {
    color: Color.black,
    fontFamily: "Nunito-Bold",
    paddingHorizontal: 34,
    paddingBottom: 10,
    fontSize: 20
  },
  recentText: {
    color: Color.gray,
    fontFamily: "Nunito-Regular",
    paddingHorizontal: 34,
    paddingBottom: 10,
    fontSize: 16
  },
  recommendContainer: { flex: 1, flexDirection: "column", paddingTop: 7 },
  recommendedHeader: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 36,
    paddingVertical: 20,
    flexDirection: "row"
  },
  recommendText: {
    fontSize: 14 * 1.4,
    color: Color.black,
    fontFamily: "Nunito-Black"
  },
  viewAllText: { color: Color.gray2, fontFamily: "Nunito-Regular" },
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2
  },
  searchIcon: {
    padding: 12
  },
  buttonContainer: {
    // position: "absolute",
    // bottom: -15,
    // left: 0,
    // right: 0,
    paddingHorizontal: 32,

    justifyContent: "center",
    paddingBottom: 20
    //alignItems: "flex-start"
  },
  regularText: {
    color: Color.black,
    fontSize: 18,
    fontFamily: "Nunito-Black",
    alignSelf: "center"
  }
});
