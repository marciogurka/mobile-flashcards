import {AsyncStorage} from "react-native";
import {decks} from "./_DATA";

const FLASHCARD_STORAGE_KEY = "MobileFlashCard:storage";

export function getData() {
  return decks;
}

export async function fetchDecks() {
  try {
    const storeResults = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);

    if (storeResults === null) {
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(decks));
    }

    return storeResults === null ? decks : JSON.parse(storeResults);
  } catch (err) {
    console.log(err);
  }
}

export async function getDeckById(id) {
  try {
    const storeResults = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);

    return JSON.parse(storeResults)[id];
  } catch (err) {
    console.log(err);
  }
}

export async function removeDeckItem(key) {
  try {
    const results = await AsyncStorage.getItem(FLASHCARD_STORAGE_KEY);
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}
export async function saveDeckTitle(title) {
  try {
    await AsyncStorage.mergeItem(
      FLASHCARD_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: [],
        },
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function addQuizCardToDeck(title, card) {
  try {
    const deck = await getDeckById(title);

    await AsyncStorage.mergeItem(
      FLASHCARD_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card),
        },
      })
    );
  } catch (err) {
    console.log(err);
  }
}
