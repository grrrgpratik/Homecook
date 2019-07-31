import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  FlatList,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ProgressBarAndroid,
  ActivityIndicatorIOS
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Color, Images, Config } from "common_f";
import fetch from "react-native-fetch-polyfill";
import AsyncStorage from "@react-native-community/async-storage";
import { LoadingSpinnerOverlay } from "component_f";
import moment from "moment";

class Route extends Component {
  renderItem = (item, index) => {
    return (
      <View
        style={[
          styles.shadow,
          {
            flexDirection: "row",
            backgroundColor: "#fff",
            padding: 15,
            marginHorizontal: 4,
            marginVertical: 6,
            borderRadius: 7
          }
        ]}
      >
        {console.log("single item==========>", item)}
        <View
          style={{ flex: 0.3, paddingRight: Platform.OS === "ios" ? 14 : 0 }}
        >
          <Image
            style={{ width: 85, height: 85, borderRadius: 6 }}
            source={{
              uri:
                "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80"
            }}
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
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between"
              }}
            >
              <Text
                style={{
                  color: Color.black,
                  fontSize: 16,
                  fontFamily: "Nunito-Bold"
                }}
              >
                {item.item.full_name}
              </Text>
              <Text
                style={{
                  color: Color.gray,
                  fontFamily: "Nunito-Bold",
                  marginRight: 10
                }}
              >
                Rs. 12.08
              </Text>
            </View>
          </View>
          {item.item.id % 2 === 0 ? (
            <Text
              style={{
                color: Color.secondary,
                fontFamily: "Nunito-Regular",
                fontSize: 12,
                marginVertical: 5
              }}
            >
              • Cash on Delivery
            </Text>
          ) : (
            <Text
              style={{
                color: Color.tertiary,
                fontFamily: "Nunito-Regular",
                fontSize: 12,
                marginVertical: 5
              }}
            >
              • Pay with Khalti
            </Text>
          )}
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between"
            }}
          >
            <Text
              style={{
                color: Color.gray2,
                fontFamily: "Nunito-Regular",
                fontSize: 12,
                marginVertical: 5
              }}
            >
              {moment(item.item.date_created).format("MMMM D, YYYY")}
            </Text>
            <Text
              style={{
                color: Color.secondary,
                fontFamily: "Nunito-Bold",
                marginRight: 10
              }}
            >
              Detail
            </Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.props.product}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
}

const width = Dimensions.get("window").width;

export default class ScrollableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Current" },
        { key: "second", title: "Past" }
      ],
      slider1ActiveSlide: 1,
      visible: false,
      data: ""
    };
  }

  componentDidMount() {
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

      fetch(Config.orderHistory, fetchOptions)
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

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
      </View>
    );
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <Route product={this.state.data} />;
      case "second":
        return <Route product={this.state.data} />;

      default:
        return null;
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        <TabView
          navigationState={this.state}
          renderScene={this.renderScene}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: width }}
          style={{ flex: 1, height: width + 145, marginHorizontal: 12 }}
          swipeEnabled={true}
          renderTabBar={props => (
            <TabBar
              {...props}
              scrollEnabled={true}
              indicatorStyle={{ backgroundColor: "transparent" }}
              style={{ backgroundColor: "transparent", overflow: "hidden" }}
              tabStyle={{ backgroundColor: "transparent", width: width / 3.18 }}
              renderLabel={({ route, focused }) => {
                const color = focused ? Color.tertiary : Color.gray;
                const backgroundColor = focused
                  ? "rgba(241, 187, 58,0.3)"
                  : "transparent";
                return (
                  <View
                    style={{
                      borderRadius: 14,
                      paddingVertical: 4,
                      paddingHorizontal: 14,
                      backgroundColor
                    }}
                  >
                    <Text
                      style={{
                        color,
                        fontFamily: "Nunito-SemiBold",
                        margin: 0
                      }}
                    >
                      {route.title}
                    </Text>
                  </View>
                );
              }}
            />
          )}
        />
        <LoadingSpinnerOverlay
          ref={component => (this._modal_2_LoadingSpinnerOverLay = component)}
        >
          {this._renderActivityIndicator()}
        </LoadingSpinnerOverlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
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
  row: {
    flexDirection: "row"
  },
  //   header: {
  //     backgroundColor: "#fff",
  //     padding: 22
  //   },
  back: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "flex-start"
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
  }
});
