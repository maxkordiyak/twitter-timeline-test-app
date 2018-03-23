import axios from 'axios';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const GET_TIMELINE_REQUEST = 'GET_TIMELINE_REQUEST';
export const GET_TIMELINE_ERROR = 'GET_TIMELINE_ERROR';
export const GET_TIMELINE_SUCCESS = 'GET_TIMELINE_SUCCESS';

const BASE_URL = 'http://localhost:3001/api/user';

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

export function onLoginError(error) {
    return {
        type: USER_LOGIN_ERROR,
        errorMessage: error
    }
}

export function onLoginSuccess(token, user) {
    localStorage.setItem('token', token);
    return {
        type: USER_LOGGED_IN, token, user
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('state');

    return {
        type: USER_LOGGED_OUT
    }
}

function getUserTimelineRequest() {
    return {
        type: GET_TIMELINE_REQUEST
    }
}

function getUserTimelineError(error) {
    return {
        type: GET_TIMELINE_ERROR,
        errorMessage: error
    }
}

function getUserTimelineSuccess(response) {
    return {
        type: GET_TIMELINE_SUCCESS,
        timeline: response.data
    }
}

export function getUserTimeline(username) {
    return (dispatch, getState) => {
        dispatch(getUserTimelineRequest(username));

        axiosInstance.get('/search', {
            headers: {
                'Accept': 'application/json',
                'Authorization': getState().user.token,
                'x-auth-token': getState().user.token
            },
            params: {
                username: username
            }
        })
            .then(response => dispatch(getUserTimelineSuccess(response.data)))
            .catch(error => {
                const errorMessage = error.response.statusText;
                dispatch(getUserTimelineError(errorMessage));
                setTimeout(() => {
                    dispatch(getUserTimelineError(""))
                }, 3000);
            });
    };
}
