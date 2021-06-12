import {
    LOGIN_START
} from "../types";

function login(email, password) {
    return (dispatch) => {
        dispatch({type: LOGIN_START});
        //TODO
    };
}