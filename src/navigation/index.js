import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import AuthLoadingScreen from "./AuthLoadingScreen";
import WelcomeScreen from "./WelcomeScreen";
import SignupScreen from "./SignupScreen";
import CartScreen from "./CartScreen";
import SearchScreen from "./SearchScreen";
import OrderScreen from "./OrderScreen";

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

const AppNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Search: SearchScreen,
  Cart: CartScreen,
  Order: OrderScreen
});

const MainAppNavigation = createSwitchNavigator({
  // Au thLoading: { screen: AuthLoadingScreen },
  LoginStack: { screen: LoginStack },
  Dashboard: { screen: AppNavigator }
});

export default createAppContainer(MainAppNavigation);
