/**
 * @format
 */

import { AppRegistry, YellowBox } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import ReduxWrapper from "./src/ReduxWrapper";

YellowBox.ignoreWarnings([
  "Warning: componentWillReceiveProps is deprecated",
  "Module RCTImageLoader"
]);
YellowBox.ignoreWarnings([
  "Warning: componentWillUpdate is deprecated",
  "Module RCTImageLoader"
]);
AppRegistry.registerComponent(appName, () => ReduxWrapper);
