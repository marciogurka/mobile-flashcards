import React, {Component} from "react";
import PropTypes from "prop-types";
import AndroidQuiz from "./AndroidQuiz";
import IOSQuiz from "./IOSQuiz";
import {setLocalNotification, clearLocalNotification} from "../utils/helpers";
import {StyleSheet, Platform, View} from "react-native";
import {gray} from "../utils/colors";

export class CustomQuiz extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };
  static navigationOptions = ({navigation}) => {
    const title = navigation.getParam("title", "");
    return {
      title: `${title} Quiz`,
    };
  };
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }
  render() {
    const {navigation} = this.props;
    const title = navigation.getParam("title", "");

    return (
      <View style={styles.container}>
        {Platform.OS === "android" ? (
          <AndroidQuiz title={title} />
        ) : (
          <IOSQuiz title={title} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  count: {
    color: gray,
    fontSize: 20,
    marginTop: 10,
  },
});

export default CustomQuiz;
