import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacity, View, Platform } from "react-native";
import { ProductDetail } from "container_f";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";

class ProductDetailScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={[styles.row, styles.header]}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              color={"#fff"}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="more-horizontal" color={"#fff"} size={30} />
          </TouchableOpacity>
        </View>
      ),
      headerTransparent: true
      //mode: "modal"
    };
  };
  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <ProductDetail
        product={state.params.product.item}
        onProfileScreenPress={() => navigate("UserProfile")}
        onCartScreenPress={product => navigate("Cart", { product })}
      />
    );
  }
}
export default ProductDetailScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  },
  header: {
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 0,
    padding: 36,
    marginTop: Platform.OS === "ios" ? 14 : 0
  },
  back: {
    width: 16 * 3,
    height: 16 * 3,
    justifyContent: "center",
    alignItems: "flex-start"
  }
});
