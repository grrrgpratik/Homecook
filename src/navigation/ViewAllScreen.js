import React, { Component } from "react";
import { ViewAll } from "container_f";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Color } from "common_f";

class ViewAllScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              color={"black"}
              size={30}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Recommended</Text>
        </View>
      )
      // headerTransparent: true
      //mode: "modal"
    };
  };
  render() {
    const { navigate, state } = this.props.navigation;
    console.log(state.params);
    return (
      <ViewAll
        product={state.params.product.recommended}
        onProductDetailScreen={product => navigate("Product", { product })}
      />
    );
  }
}
export default ViewAllScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  header: {
    backgroundColor: "#fff",
    padding: 22
  },
  back: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  title: {
    fontSize: 24,
    color: Color.black,
    fontFamily: "Nunito-Black",
    paddingHorizontal: 10
  }
});
