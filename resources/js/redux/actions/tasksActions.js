import {
    FETCH_TASKS,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILED,
    CREATE_TASK_SUCCESS,
    EDIT_TASK_SUCCESS,
    SUBMIT_TASK_FORM
} from "../types";
import axios from 'axios';

import {TASKS_ENDPOINT} from "../../utils/endPoints";

export function fetchTasks(page = 1, perPage = 10) {
    return async (dispatch) => {

        dispatch({type: FETCH_TASKS});

        try {
            const authToken = `Bearer ${localStorage.getItem('token')}`;
            const response = await axios.get(`${TASKS_ENDPOINT}?page=${page}&per_page=${perPage}`, {
                headers: {
                    Authorization: authToken,
                }
            });

            const {data, total, current_page, per_page} = response.data;
            dispatch({type: FETCH_TASKS_SUCCESS, payload: {data, total, current_page, per_page}})

        } catch (e) {
            console.log(e.message);
            dispatch({type: FETCH_TASKS_FAILED, payload: e.message})
        }
    }
}

export function createTask(name, description, _callback) {
    return async (dispatch) => {
        dispatch({type: SUBMIT_TASK_FORM});

        const authToken = `Bearer ${localStorage.getItem('token')}`;
        let formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);

        try {
            await axios.post(TASKS_ENDPOINT, formData, {
                headers: {
                    Authorization: authToken,
                }
            });

            dispatch({type: CREATE_TASK_SUCCESS});
            dispatch(fetchTasks());
            if (_callback) _callback();
        } catch (e) {
            console.log(e.message);
        }
    }
}

export function updateTask(id, name, description, status, page, perPage) {
    return async (dispatch) => {
        dispatch({type: SUBMIT_TASK_FORM});

        const authToken = `Bearer ${localStorage.getItem('token')}`;

        let formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("_method", 'PUT');

        try {
            await axios.post(`${TASKS_ENDPOINT}/${id}`, formData, {
                headers: {
                    Authorization: authToken,
                }
            });

            dispatch({type: EDIT_TASK_SUCCESS});
            dispatch(fetchTasks(page, perPage));
        } catch (e) {
            console.log(e.message);
        }
    }
}

export function deleteTask(id, page, perPage) {
    return async (dispatch) => {
        const authToken = `Bearer ${localStorage.getItem('token')}`;

        try {
            const response = await axios.delete(`${TASKS_ENDPOINT}/${id}`, {
                headers: {
                    Authorization: authToken,
                }
            });

            dispatch(fetchTasks(page, perPage));
        } catch (e) {
            console.log(e.message);
        }
    }
}