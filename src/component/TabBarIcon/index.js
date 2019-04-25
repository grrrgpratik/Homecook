
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, Image } from "react-native";


class TabBarIcon extends PureComponent {
  static propTypes = {
    icon: PropTypes.any,
    tintColor: PropTypes.string,
    css: PropTypes.any,
    carts: PropTypes.object,
    cartIcon: PropTypes.any
  };

  render() {
    const { icon, tintColor, css, cartIcon, carts } = this.props;

    const numberWrap = (number = 0) => (
      <View style={styles.numberWrap}>
        <Text style={styles.number}>{number}</Text>
      </View>
    );
    return (
      <View style={{ justifyContent: "center" }}>
        <Image
          ref={comp => (this._image = comp)}
          source={icon}
          style={[styles.icon, { tintColor }, css]}
        />
        {/*  {wishlistIcon && wishList.total > 0 && numberWrap(wishList.total || 0)} */}
        {cartIcon && carts.total > 0 && numberWrap(carts.total || 0)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  numberWrap: {
    
    position: "absolute",
    top: -10,
    right: -10,
    height: 18,
    minWidth: 18,
    backgroundColor: "red",
    borderRadius: 9
  },
  number: {
    color: "white",
    fontSize: 12,
    marginLeft: 3,
    marginRight: 3
  }
});

export default TabBarIcon;
