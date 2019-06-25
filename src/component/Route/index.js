import React, { PureComponent } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Platform,
  StyleSheet
} from "react-native";
import { Color, Config } from "common_f";

class Route extends PureComponent {
  renderItem = item => {
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
        <View
          style={{ flex: 0.3, paddingRight: Platform.OS === "ios" ? 14 : 0 }}
        >
          {console.log("inside route rneder", item)}
          <Image
            style={{ width: 85, height: 85, borderRadius: 6 }}
            source={{
              uri: `${Config.baseUrl}${item.item.image_url[0].image}`
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
            <Text
              style={{
                color: Color.black,
                fontSize: 16,
                fontFamily: "Nunito-Bold"
              }}
            >
              {item.item.name}
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
            {item.item.description}
          </Text>
          <Text
            style={{
              color: Color.secondary,
              fontFamily: "Nunito-Bold",
              marginRight: 10
            }}
          >
            {`Rs ${item.item.price}`}
          </Text>
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
          keyExtractor={(item, index) => `route-${index}`}
        />
      </ScrollView>
    );
  }
}
export default Route;

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
