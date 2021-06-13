import {
    FETCH_TASKS,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILED,
    CREATE_TASK,
    CREATE_TASK_SUCCESS,
    EDIT_TASK_SUCCESS
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

export function createTask(name, description) {
    return async (dispatch) => {
        dispatch({type: CREATE_TASK});

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
        } catch (e) {
            console.log(e.message);
        }
    }
}

export function updateTask(id, name, description, status) {
    return async (dispatch) => {
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
            dispatch(fetchTasks());
        } catch (e) {
            console.log(e.message);
        }
    }
}