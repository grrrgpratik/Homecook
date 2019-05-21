import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  FlatList,
  Platform
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Color } from "common_f";
import { ScrollView } from "react-native-gesture-handler";

const mocks = [1, 2, 3, 4];

const FirstRoute = item => (
  <View
    key={item}
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
        <Text
          style={{
            color: Color.black,
            fontSize: 16,
            fontFamily: "Nunito-Bold"
          }}
        >
          Chicken Sandwich
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
        Test Test
      </Text>
      <Text
        style={{
          color: Color.secondary,
          fontFamily: "Nunito-Bold",
          marginRight: 10
        }}
      >
        Rs. 123
      </Text>
    </View>
  </View>
);

const Route = () => {
  return (
    <ScrollView>
      <FlatList
        data={mocks}
        renderItem={FirstRoute}
        keyExtractor={(item, index) => item}
      />
    </ScrollView>
  );
};

const width = Dimensions.get("window").width;

export default class ScrollableView extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Breakfast" },
      { key: "second", title: "Lunch" },
      { key: "third", title: "Dinner" },
      { key: "fourth", title: "Special Item" }
    ]
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: Route,
          second: Route,
          third: Route,
          fourth: Route
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: width }}
        style={{ flex: 1, height: width + 145, padding: 2 }}
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
  }
});
