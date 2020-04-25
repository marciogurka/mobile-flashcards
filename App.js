import React from "react";
import PropTypes from "prop-types";
import {View, StatusBar} from "react-native";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {Provider} from "react-redux";
import reducer from "./reducers/index";
import Constants from "expo-constants";
import AppNavigationContainer from "./navigation/AppNavigationContainer";
import {setLocalNotification} from "./utils/helpers";
import {purple} from "./utils/colors";

const store = createStore(reducer, applyMiddleware(thunk, logger));

const MainFlashCardStatusBar = ({backgroundColor, ...props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

MainFlashCardStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MainFlashCardStatusBar
            backgroundColor={purple}
            barStyle="light-content"
          />
          <AppNavigationContainer />
        </View>
      </Provider>
    );
  }
}
