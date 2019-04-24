import React, { Component } from "react";
import { Provider } from "react-redux";
import Router from "./Router";
import store from "store_f/configureStore";

class ReduxWrapper extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router/>
      </Provider>
    );
  }
}
export default ReduxWrapper;
