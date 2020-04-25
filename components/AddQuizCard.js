import React, {Component} from "react";
import PropTypes from "prop-types";
import {Text, View, TextInput, StyleSheet} from "react-native";
import TouchButton from "./TouchButton";
import {gray, green} from "../utils/colors";
import {addCardToDeck} from "../actions/index";
import {addQuizCardToDeck} from "../utils/api";
import {connect} from "react-redux";

export class AddQuizCard extends Component {
  static propTypes = {
    addCardToDeck: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
  };
  listenAndSetQuestionChange = (question) => {
    this.setState({question});
  };

  listenAndSetAnswerChange = (answer) => {
    this.setState({answer});
  };
  state = {
    question: "",
    answer: "",
  };

  submitAddQuizCard = () => {
    const quizCard = {
      question: this.state.question,
      answer: this.state.answer,
    };
    const {addCardToDeck, title, navigation} = this.props;

    addCardToDeck(title, quizCard);
    addQuizCardToDeck(title, quizCard);

    this.setState({question: "", answer: ""});
    navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.block}>
            <Text style={styles.title}>Add a question</Text>
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.question}
              onChangeText={this.listenAndSetQuestionChange}
              onSubmitEditing={() => this.answerTextInput.focus()}
              placeholder="Question"
              returnKeyType="next"
              autoFocus={true}
              blurOnSubmit={false}
            />
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.answer}
              onChangeText={this.listenAndSetAnswerChange}
              onSubmitEditing={this.submitAddQuizCard}
              placeholder="Answer"
              ref={(input) => {
                this.answerTextInput = input;
              }}
              returnKeyType="done"
            />
          </View>
          <TouchButton
            btnStyle={{backgroundColor: green, borderColor: "#fff"}}
            onPress={this.submitAddQuizCard}
            disabled={this.state.question === "" || this.state.answer === ""}
          >
            Submit
          </TouchButton>
        </View>
        <View style={{height: "20%"}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 36,
  },
  container: {
    flex: 1,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    backgroundColor: gray,
    justifyContent: "space-around",
  },
  block: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
    fontSize: 20,
    height: 36,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
});

const mapStateToProps = (state, {navigation}) => {
  const title = navigation.getParam("title", "undefined");

  return {
    title,
  };
};

export default connect(mapStateToProps, {addCardToDeck})(AddQuizCard);
