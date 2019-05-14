/**
 * @format
 */

import { AppRegistry, YellowBox } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import ReduxWrapper from "./src/ReduxWrapper";

YellowBox.ignoreWarnings([
  "Warning: componentWillUpdate is deprecated",
  "Module RCTImageLoader",
  "animateToCoordinate() is deprecated",
  "Warning: componentWillMount is deprecated",
  "Warning: componentWillReceiveProps is deprecated"
]);
AppRegistry.registerComponent(appName, () => ReduxWrapper);
