import {LOGIN_START, LOGIN_FAILED} from "../types";

const INITIAL_STATE = {
    loggedIn: false,
    token: null,
    loading: false,
    error: ''
};

export function authReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_START:
            return {...state, loading: true};
        case LOGIN_FAILED:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

export default authReducer;