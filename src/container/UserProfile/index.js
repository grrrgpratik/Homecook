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
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import { Color, Config } from "common_f";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  CustomButton,
  ScrollableView,
  LoadingSpinnerOverlay
} from "component_f";
import styles from "./styles";
import { toast } from "app_f/Omni";
import fetch from "react-native-fetch-polyfill";
import AsyncStorage from "@react-native-community/async-storage";

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
      "Hello I am Lelia. I love cooking and I get complete satisfaction and happiness when my food is been enjoyed and appreciated by someone else.",
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

class UserProfile extends PureComponent {
  scrollX = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      userdata: null
    };
  }

  componentDidMount() {
    console.log(this.props.owner);
    this._modal_2_LoadingSpinnerOverLay.show();
    AsyncStorage.getItem("token").then(token => {
      const fetchOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
        timeout: 10000
      };

      fetch(`${Config.getUserInfoUrl}${this.props.owner.id}`, fetchOptions)
        .then(response => {
          if (response.status === 200) {
            response.json().then(responseJSON => {
              console.log(responseJSON);
              this.setState({ userdata: responseJSON });
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
  }

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

  renderHeaderImage = () => {
    {
      return (
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
          resizeMode="cover"
          style={{ width, height: width }}
        />
      );
    }
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
    const { userdata } = this.state;
    console.log(userdata);
    if (userdata !== null) {
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 44 }}
        >
          <View style={styles.container}>
            <View style={styles.container}>{this.renderHeaderImage()}</View>
          </View>
          <View style={[styles.container, styles.contentHeader]}>
            {/* <TouchableHighlight
            activeOpacity={0.8}
            onPress={this.props.onProfileScreenPress}
            style={styles.profileButton}
          >
            <Image
              style={styles.avatar}
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg"
              }}
            />
          </TouchableHighlight> */}

            <Text style={[styles.title, styles.nunitoBlack]}>
              {userdata.user.full_name}
            </Text>

            <View style={[styles.row, styles.rating]}>
              <View style={[styles.row, { alignItems: "center" }]}>
                {this.renderRatings(article[0].rating)}
                <Text style={[styles.nunitoRegular, styles.reviewText]}>
                  ({article[0].reviews} reviews)
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
                Breakfast • Lunch • Dinner • Snacks
              </Text>
            </View>

            <View style={[styles.row, styles.textContainer]}>
              <Text style={[styles.nunitoRegular, styles.regularGray]}>
                {userdata.user.location}
              </Text>
              <Text style={[styles.nunitoRegular, styles.smallGray]}>
                Free Shipping
              </Text>
            </View>

            <Text style={[styles.nunitoBlack, styles.titleText]}>Bio</Text>
            <Text style={[styles.description, styles.nunitoRegular]}>
              {article[0].description.split("").slice(0, 180)}
            </Text>

            <Text style={[styles.titleText, styles.nunitoBlack]}>Menu</Text>
            <View style={{ flex: 1 }}>
              <ScrollableView userProduct={userdata.user_product} />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton buttonText={"SUBCRIBE"} />
          </View>
          <LoadingSpinnerOverlay
            ref={component => (this._modal_2_LoadingSpinnerOverLay = component)}
          >
            {this._renderActivityIndicator()}
          </LoadingSpinnerOverlay>
        </ScrollView>
      );
    } else {
      return (
        <View>
          <LoadingSpinnerOverlay
            ref={component => (this._modal_2_LoadingSpinnerOverLay = component)}
          >
            {this._renderActivityIndicator()}
          </LoadingSpinnerOverlay>
        </View>
      );
    }
  }
}

export default UserProfile;
