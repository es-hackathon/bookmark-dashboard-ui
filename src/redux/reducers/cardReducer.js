import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function cardReducer(state = initialState.cards, action) {
    switch (action.type) {
        case types.CREATE_CARD_SUCCESS:
            return [...state, { ...action.card }];
        case types.UPDATE_CARD_SUCCESS:
            return state.map(card =>
                card.id === action.card.id ? action.card : card)
        case types.LOAD_CARDS_SUCCESS:
            return action.cards;
        case types.DELETE_CARD_OPTIMISTIC:
            return state.filter(card => card.id !== action.card.id);
        default:
            return state;
    }
}