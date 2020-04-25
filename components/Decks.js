import React, {Component} from "react";
import PropTypes from "prop-types";
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import {connect} from "react-redux";
import DeckItem from "./DeckItem";
import {gray, purple} from "../utils/colors";
import CustomButton from "./CustomButton";
import {setInitialData} from "../actions/index";

export class Decks extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setInitialData: PropTypes.func.isRequired,
    decks: PropTypes.object.isRequired,
  };
  componentDidMount() {
    this.props.setInitialData();
  }
  render() {
    const {decks, navigation} = this.props;

    return Object.values(decks).length > 0 ? (
      <View style={styles.container}>
        <Text style={styles.title}>Mobile Flashcards</Text>
        <FlatList
          data={Object.values(decks)}
          renderItem={({item}) => (
            <TouchableOpacity
              key={item.title}
              onPress={() =>
                navigation.navigate("DeckDetail", {title: item.title})
              }
            >
              <DeckItem id={item.title} key={item.title} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    ) : (
      <View style={styles.blank}>
        <Text style={{fontSize: 18}}>There is no card in deck </Text>
        <CustomButton
          onPress={() => {
            navigation.navigate("AddDeck", {title: "Add Deck"});
          }}
        >
          {" "}
          Create DeckItem{" "}
        </CustomButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    marginBottom: 12,
    textAlign: "center",
    color: purple,
  },
  container: {
    flex: 1,
    paddingRight: 12,
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 12,
    backgroundColor: gray,
  },
});

const mapStateToProps = (state) => ({decks: state});

export default connect(mapStateToProps, {setInitialData})(Decks);
