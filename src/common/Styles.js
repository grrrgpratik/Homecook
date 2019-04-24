
import { Dimensions, Platform } from "react-native";
import Device from "./Device";


const { height, width, heightWindow } = Dimensions.get("window");

const Styles = {
    width: width,
    height: Platform.OS !== "ios" ? height : height - 20,

app: {
    flexGrow: 1,
    backgroundColor: Device.isIphoneX ? "#FFF" : "#FFF",
    paddingTop: Device.ToolbarHeight,
  },
  FontSize: {
    tiny: 12,
    small: 14,
    medium: 16,
    big: 18,
    large: 20,
  },
  IconSize: {
    TextInput: 25,
    ToolBar: 18,
    Inline: 20,
    SmallRating: 14,
  },
}

export default Styles;