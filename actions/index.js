import {fetchDecks} from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const REMOVE_DECK = "REMOVE_DECK";
export const ADD_CARD = "ADD_CARD";
export const RESET_STORE = "RESET_STORE";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id,
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  };
}

export function addCardToDeck(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  };
}

export function resetStore() {
  return {
    type: RESET_STORE,
  };
}
export function setInitialData() {
  return (dispatch) => {
    return fetchDecks().then((decks) => {
      dispatch(receiveDecks(decks));
    });
  };
}