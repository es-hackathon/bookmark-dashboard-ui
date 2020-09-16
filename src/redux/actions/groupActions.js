import * as types from "./actionTypes";
import * as groupApi from "../../api/groupApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadGroupSuccess(groups) {
    return { type: types.LOAD_GROUPS_SUCCESS, groups }
}

export function createGroupSuccess(group) {
    return { type: types.CREATE_GROUP_SUCCESS, group };
}

export function updateGroupSuccess(group) {
    return { type: types.UPDATE_GROUP_SUCCESS, group };
}

export function deleteGroupOptimistic(group) {
    return { type: types.DELETE_GROUP_OPTIMISTIC, group };
}

export function loadGroups() {
    return function (dispatch) {
        dispatch(beginApiCall());
        return groupApi
            .getGroups()
            .then(groups => {
                dispatch(loadGroupSuccess(groups));
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}

export function saveGroup(group) {
    //eslint-disable-next-line no-unused-vars
    return function (dispatch, getState) {
        dispatch(beginApiCall());
        return groupApi
            .saveGroup(group)
            .then(savedGroup => {
                group.id
                    ? dispatch(updateGroupSuccess(savedGroup))
                    : dispatch(createGroupSuccess(savedGroup));
            })
            .catch(error => {
                dispatch(apiCallError(error));
                throw error;
            });
    };
}


export function deleteGroup(group) {
    return function (dispatch) {
        // Doing optimistic delete, so not dispatching begin/end api call
        // actions, or apiCallError action since we're not showing the loading status for this.
        dispatch(deleteGroupOptimistic(group));
        return groupApi.deleteGroup(group.id);
    };
}