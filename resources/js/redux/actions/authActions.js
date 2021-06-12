import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_USER
} from "../types";
import history from '../../utils/history';
import axios from 'axios';

import {LOGIN_ENDPOINT, LOGOUT_ENDPOINT} from "../../utils/endPoints";

export function login(email, password) {
    return async (dispatch) => {
        dispatch({type: LOGIN_START});

        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await axios.post(LOGIN_ENDPOINT, formData);
            localStorage.setItem("token", response.data.token);
            dispatch({type: LOGIN_SUCCESS, payload: response.data.token});
            history.push('/');
        } catch (e) {
            dispatch({type: LOGIN_FAILED, payload: e.message});
        }
    };
}

export function logout() {
    return async (dispatch) => {
        try {
            const authToken = `Bearer ${localStorage.getItem('token')}`;
            await axios.post(LOGOUT_ENDPOINT, null, {
                headers: {
                    Authorization: authToken,
                }
            });
        } catch (e) {
            console.log(e.message);
        }
        localStorage.removeItem("token");
        dispatch({type: LOGOUT_USER});
        history.push("/");
    }
}