import { combineReducers } from "redux";
import cards from "./cardReducer";
import groups from "./groupReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
    groups,
    cards,
    apiCallsInProgress
});

export default rootReducer;