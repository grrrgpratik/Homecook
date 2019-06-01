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
  TouchableOpacity
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Color } from "common_f";

const mocks = [1, 2, 3, 4];

const FirstRoute = item => (
  <View
    key={item.toString()}
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
    <View style={{ flex: 0.3, paddingRight: Platform.OS === "ios" ? 14 : 0 }}>
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
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
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
            Pratik Gurung
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
      {console.log(item)}
      {item.item % 2 === 0 ? (
        <Text
          style={{
            color: Color.secondary,
            fontFamily: "Nunito-Regular",
            fontSize: 12,
            marginVertical: 5
          }}
        >
          • Order Delivered
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
          • Waiting for Processing
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
          22 Aug 2019
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

const Route = () => {
  return (
    <ScrollView>
      <FlatList
        data={mocks}
        renderItem={FirstRoute}
        keyExtractor={(item, index) => item.toString()}
      />
    </ScrollView>
  );
};

const width = Dimensions.get("window").width;

export default class ScrollableView extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Current" },
      { key: "second", title: "Past" }
    ]
  };

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>Orders</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderHeader()}
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: Route,
            second: Route
          })}
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
