import React from "react";
import { Text, View, Dimensions } from "react-native";

import ScrollableTabView, {
  ScrollableTabBar
} from "react-native-scrollable-tab-view";

const width = Dimensions.get("window").width;

export default () => {
  return (
    <ScrollableTabView
      style={{ marginTop: 20, height: width, marginLeft: 15 }}
      initialPage={0}
      renderTabBar={() => <ScrollableTabBar />}
      
    >
      <Text tabLabel="Breakfast" style={{ color: "black" }}>
        My
      </Text>
      <Text tabLabel="Lunch" style={{ color: "black" }}>
        favorite
      </Text>
      <Text tabLabel="Dinner" style={{ color: "black" }}>
        project
      </Text>
      <Text tabLabel="Special Items" style={{ color: "black" }}>
        favorite
      </Text>
    </ScrollableTabView>
  );
};
