import React, {Component} from "react";
import PropTypes from "prop-types";
import {View, StyleSheet} from "react-native";
import TextButton from "./TextButton";
import DeckItem from "./DeckItem";
import TouchButton from "./TouchButton";
import {gray, textGray, green, white, red} from "../utils/colors";
import {connect} from "react-redux";
import {removeDeckItem} from "../utils/api";
import {removeDeck} from "../actions/index";

export class DeckDetail extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    removeDeck: PropTypes.func.isRequired,
    deck: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  deleteItem = (id) => {
    const {removeDeck, navigation} = this.props;

    removeDeck(id);
    removeDeckItem(id);
    navigation.goBack();
  };

  render() {
    const {deck} = this.props;

    return (
      <View style={styles.container}>
        <DeckItem id={deck.title} />
        <View>
          <TouchButton
            btnStyle={{backgroundColor: white, borderColor: textGray}}
            txtStyle={{color: textGray}}
            onPress={() =>
              this.props.navigation.navigate("AddQuizCard", {title: deck.title})
            }
          >
            Add Card
          </TouchButton>

          {deck.questions.length !== 0 && (
            <TouchButton
              btnStyle={{backgroundColor: green, borderColor: white}}
              txtStyle={{color: white}}
              onPress={() =>
                this.props.navigation.navigate("CustomQuiz", {
                  title: deck.title,
                })
              }
            >
              Start Quiz
            </TouchButton>
          )}
        </View>
        <TextButton
          onPress={() => this.deleteItem(deck.title)}
          txtStyle={{color: red}}
        >
          Delete DeckItem
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingRight: 12,
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 12,
    backgroundColor: gray,
  },
});

const mapStateToProps = (state, {navigation}) => {
  const title = navigation.getParam("title", "undefined");
  const deck = state[title];

  return {
    deck,
  };
};

export default connect(mapStateToProps, {removeDeck})(DeckDetail);
