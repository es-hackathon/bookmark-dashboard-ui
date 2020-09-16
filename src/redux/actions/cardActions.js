import * as types from "./actionTypes";
import * as cardApi from "../../api/cardApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCardSuccess(cards) {
    return { type: types.LOAD_CARDS_SUCCESS, cards }
}

export function createCardSuccess(card) {
    return { type: types.CREATE_CARD_SUCCESS, card };
}

export function updateCardSuccess(card) {
    return { type: types.UPDATE_CARD_SUCCESS, card };
}

export function deleteCardOptimistic(card) {
    return { type: types.DELETE_CARD_OPTIMISTIC, card };
}

export function loadCards() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return cardApi
            .getCards()
            .then(cards => {
                dispatch(loadCardSuccess(cards));
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}

export function saveCard(card) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return cardApi
            .saveCard(card)
            .then(savedCard => {
                card.id
                    ? dispatch(updateCardSuccess(savedCard))
                    : dispatch(createCardSuccess(savedCard));
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}


export function deleteCard(card) {
    return function (dispatch) {
        dispatch(deleteCardOptimistic(card));
        return cardApi.deleteCard(card.id);
    };
}