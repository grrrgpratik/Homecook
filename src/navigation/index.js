import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import AuthLoadingScreen from "./AuthLoadingScreen";
import WelcomeScreen from "./WelcomeScreen";
import SignupScreen from "./SignupScreen";
import CartScreen from "./CartScreen";
import SearchScreen from "./SearchScreen";
import OrderScreen from "./OrderScreen";
import MapScreen from "./MapScreen";
import ProductDetailScreen from "./ProductDetailScreen";

import { TabBar, TabBarIcon } from "component_f";
import { Images, Color } from "common_f";

const LoginStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    Signup: SignupScreen
  },
  {
    mode: "modal"
  }
);

const HomeScreenStack = createStackNavigator({
  HomeStk: HomeScreen,
  Map: MapScreen,
  Product: ProductDetailScreen
});

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreenStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon icon={Images.IconHome} tintColor={tintColor} />
        )
      }
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon icon={Images.IconSearch} tintColor={tintColor} />
        )
      }
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon icon={Images.IconCart} tintColor={tintColor} />
        )
      }
    },
    Order: {
      screen: OrderScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <TabBarIcon icon={Images.IconOrder} tintColor={tintColor} />
        )
      }
    }
  },
  {
    tabBarComponent: TabBar,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: Color.tertiary,
      inactiveTintColor: Color.gray
    },
    lazy: true
  }
);

const MainAppNavigation = createSwitchNavigator({
  // Au thLoading: { screen: AuthLoadingScreen },
  LoginStack: { screen: LoginStack },
  Dashboard: { screen: AppNavigator }
});

export default createAppContainer(MainAppNavigation);
