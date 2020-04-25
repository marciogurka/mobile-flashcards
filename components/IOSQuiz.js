import React, {Component} from "react";
import {View, Text, StyleSheet, ScrollView, Dimensions} from "react-native";
import TextButton from "./TextButton";
import TouchButton from "./TouchButton";
import {gray, green, red, textGray, darkGray, white} from "../utils/colors";
import {connect} from "react-redux";
import {withNavigation} from "react-navigation";
import PropTypes from "prop-types";

const screen = {
  ANSWER: "answer",
  QUESTION: "question",
  RESULT: "result",
};
const answer = {
  CORRECT: "correctQuestionCount",
  INCORRECTQUESTIONCOUNT: "incorrectQuestionCount",
};
const SCREEN_WIDTH = Dimensions.get("window").width;

class IOSQuiz extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired,
  };
  state = {
    show: screen.QUESTION,
    correctQuestionCount: 0,
    incorrectQuestionCount: 0,
    totalQuestionCount: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0),
  };
  changePage = () => {
    this.setState({
      show: screen.QUESTION,
    });
  };
  setAnswer = (response, page) => {
    if (response === answer.CORRECT) {
      this.setState((prevState) => ({
        correctQuestionCount: prevState.correctQuestionCount + 1,
      }));
    } else {
      this.setState((prevState) => ({
        incorrectQuestionCount: prevState.incorrectQuestionCount + 1,
      }));
    }
    this.setState(
      (prevState) => ({
        answered: prevState.answered.map((val, idx) =>
          page === idx ? 1 : val
        ),
      }),
      () => {
        const {
          correctQuestionCount,
          incorrectQuestionCount,
          totalQuestionCount,
        } = this.state;

        if (
          totalQuestionCount ===
          correctQuestionCount + incorrectQuestionCount
        ) {
          this.setState({show: screen.RESULT});
        } else {
          this.scrollView.scrollTo({x: (page + 1) * SCREEN_WIDTH});
          this.setState((prevState) => ({
            show: screen.QUESTION,
          }));
        }
      }
    );
  };
  reset = () => {
    this.setState((prevState) => ({
      show: screen.QUESTION,
      correctQuestionCount: 0,
      incorrectQuestionCount: 0,
      answered: Array(prevState.totalQuestionCount).fill(0),
    }));
  };
  render() {
    const {questions} = this.props.deck;
    const {show} = this.state;

    if (questions.length === 0) {
      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, {textAlign: "center"}]}>
              You cannot take a quiz because there are no cards in the deck.
            </Text>
            <Text style={[styles.count, {textAlign: "center"}]}>
              Please add some cards and try again.
            </Text>
          </View>
        </View>
      );
    }

    if (this.state.show === screen.RESULT) {
      const {correctQuestionCount, totalQuestionCount} = this.state;
      const percent = (
        (correctQuestionCount / totalQuestionCount) *
        100
      ).toFixed(0);
      const resultStyle = percent >= 70 ? styles.goodResult : styles.badResult;

      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, {textAlign: "center"}]}>
              Quiz Complete!
            </Text>
            <Text style={resultStyle}>
              {correctQuestionCount} / {totalQuestionCount} correct
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={[styles.count, {textAlign: "center"}]}>
              Percentage of correct question
            </Text>
            <Text style={resultStyle}>{percent}%</Text>
          </View>
          <View>
            <TouchButton
              btnStyle={{backgroundColor: green, borderColor: white}}
              onPress={this.reset}
            >
              Restart Quiz
            </TouchButton>
            <TouchButton
              btnStyle={{backgroundColor: gray, borderColor: textGray}}
              txtStyle={{color: textGray}}
              onPress={() => {
                this.reset();
                this.props.navigation.goBack();
              }}
            >
              Back To Deck
            </TouchButton>
            <TouchButton
              btnStyle={{backgroundColor: gray, borderColor: textGray}}
              txtStyle={{color: textGray}}
              onPress={() => {
                this.reset();
                this.props.navigation.navigate("Home");
              }}
            >
              Home
            </TouchButton>
          </View>
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.container}
        pagingEnabled={true}
        horizontal={true}
        onMomentumScrollBegin={this.changePage}
        ref={(scrollView) => {
          this.scrollView = scrollView;
        }}
      >
        {questions.map((question, idx) => (
          <View style={styles.pageStyle} key={idx}>
            <View style={styles.block}>
              <Text style={styles.count}>
                {idx + 1} / {questions.length}
              </Text>
            </View>
            <View style={[styles.block, styles.questionContainer]}>
              <Text style={styles.questionText}>
                {show === screen.QUESTION ? "Question" : "Answer"}
              </Text>
              <View style={styles.questionWrapper}>
                <Text style={styles.title}>
                  {show === screen.QUESTION
                    ? question.question
                    : question.answer}
                </Text>
              </View>
            </View>
            {show === screen.QUESTION ? (
              <TextButton
                txtStyle={{color: red}}
                onPress={() => this.setState({show: screen.ANSWER})}
              >
                Show Answer
              </TextButton>
            ) : (
              <TextButton
                txtStyle={{color: red}}
                onPress={() => this.setState({show: screen.QUESTION})}
              >
                Show Question
              </TextButton>
            )}
            <View>
              <TouchButton
                btnStyle={{backgroundColor: green, borderColor: white}}
                onPress={() => this.setAnswer(answer.CORRECT, idx)}
                disabled={this.state.answered[idx] === 1}
              >
                Correct
              </TouchButton>
              <TouchButton
                btnStyle={{backgroundColor: red, borderColor: white}}
                onPress={() =>
                  this.setAnswer(answer.INCORRECTQUESTIONCOUNT, idx)
                }
                disabled={this.state.answered[idx] === 1}
              >
                Incorrect
              </TouchButton>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    marginBottom: 18,
  },
  count: {
    fontSize: 24,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  questionContainer: {
    borderWidth: 1,
    backgroundColor: white,
    borderColor: darkGray,
    borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flexGrow: 1,
  },
  questionWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  questionText: {
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 20,
  },
  goodResult: {
    color: green,
    fontSize: 40,
    textAlign: "center",
  },
  badResult: {
    color: red,
    fontSize: 40,
    textAlign: "center",
  },
  pageStyle: {
    flex: 1,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 16,
    backgroundColor: gray,
    justifyContent: "space-around",
    width: SCREEN_WIDTH,
  },
});

const mapStateToProps = (state, {title}) => {
  const deck = state[title];

  return {
    deck,
  };
};

export default withNavigation(connect(mapStateToProps)(IOSQuiz));
