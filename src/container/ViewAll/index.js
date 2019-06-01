import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ScrollView
} from "react-native";
import { Color } from "common_f";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

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
  },
  {
    id: 5,
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
    id: 6,
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
  },
  {
    id: 7,
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
  }
];

class ViewAll extends Component {
  renderRecommended = () => {
    return (
      <View style={styles.recommendContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          numColumns={2}
          // decelerationRate="normal"
          // scrollEventThrottle={100}
          // snapToInterval={width - 60}
          // snapToAlignment="center"
          data={mocks}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item, index }) =>
            this.renderRecommendation(item, index)
          }
        />
      </View>
    );
  };

  renderRecommendation = (item, index) => {
    //const isLastItem = index === mocks.length - 1;
    return (
      <TouchableWithoutFeedback
        activeOpacity={0.5}
        onPress={this.props.onProductDetailScreen}
        // style={[styles.shadow, { backgroundColor: 'red' }]}
      >
        <View style={[styles.recommendation, styles.shadow]}>
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

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {this.renderRecommended()}
      </ScrollView>
    );
  }
}
export default ViewAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 24
  },
  recommendContainer: {
    flex: 1,
    flexDirection: "column",
    paddingBottom: 20
    //backgroundColor: "red"
  },
  recommendation: {
    flexDirection: "column",
    width: width / 2 - 50,
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 10
  },

  recommendationImage: {
    width: width / 2 - 50,
    height: 160
  },
  recommendedHeader: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 36,
    marginVertical: 36 * 0.66,
    flexDirection: "row"
  },
  recommendationHeader: {
    flex: 1,
    overflow: "hidden",
    //borderRadius: 8,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12
    // backgroundColor: Color.black
  },
  shadow: {
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.24,
    shadowRadius: 5,
    elevation: 2
  },
  bottomContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    overflow: "hidden",
    padding: 14,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
  },
  recommendationTitle: {
    fontSize: 16,
    paddingBottom: 4,
    color: Color.black,
    fontFamily: "Nunito-Bold"
  },
  recommendlocation: {
    color: Color.black,
    fontFamily: "Nunito-Regular",
    fontSize: 10
  },
  recommendRating: {
    flexDirection: "row",
    marginTop: 16
  },
  recommendPrice: {
    color: Color.secondary,
    fontFamily: "Nunito-Regular",
    fontSize: 10,
    marginLeft: 8
  }
});
