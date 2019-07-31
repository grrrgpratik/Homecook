import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { View, Text, StyleSheet } from "react-native";
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
import UserProfileScreen from "./UserProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import SaveProfileScreen from "./SaveProfileScreen";
import ViewAllScreen from "./ViewAllScreen";
import ForgetPasswordScreen from "./ForgetPassword";
import SignUpComplete from "./SignUpComplete";
import OrderComplete from "./OrderComplete";
import DeliveryScreen from "./DeliveryScreen";
import PaymentScreen from "./PaymentScreen";
import KhaltiScreen from "./KhaltiScreen";

import { TabBar, TabBarIcon } from "component_f";
import { Images, Color } from "common_f";

const LoginStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    ForgetPassword: ForgetPasswordScreen,
    SignUpComplete: SignUpComplete
  },
  {
    mode: "modal"
  }
);

const HomeScreenStack = createStackNavigator(
  {
    HomeStk: HomeScreen,
    Map: MapScreen,
    Product: ProductDetailScreen,
    UserProfile: UserProfileScreen,
    EditProfile: EditProfileScreen,
    SaveProfile: SaveProfileScreen,
    ViewAll: ViewAllScreen
  },
  {
    mode: "modal"
  }
);

HomeScreenStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

const CartScreenStack = createStackNavigator(
  {
    Cart: CartScreen,
    Delivery: DeliveryScreen,
    Payment: PaymentScreen,
    Khalti: KhaltiScreen,
    OrderCompleteScreen: OrderComplete
  },
  {
    mode: "modal"
  }
);

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
      screen: CartScreenStack,
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
  AuthLoading: { screen: AuthLoadingScreen },
  LoginStack: { screen: LoginStack },
  Dashboard: { screen: AppNavigator }
});

export default createAppContainer(MainAppNavigation);
