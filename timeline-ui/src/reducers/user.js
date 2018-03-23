import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOGIN_ERROR, GET_TIMELINE_REQUEST, GET_TIMELINE_SUCCESS, GET_TIMELINE_ERROR } from '../actions';

export default (state = { data: null, isAuthenticated: false, errorMessage: "", timeline: [], isLoading: false, screen_name: "", count: 10 }, action) => {
    const { type, user, token, timeline, username, errorMessage } = action;

    switch (type) {
        case USER_LOGGED_IN:
            return Object.assign({}, state, {
                isAuthenticated: true, data: user, token: token
            });
        case USER_LOGGED_OUT:
            return Object.assign({}, state, {
                isAuthenticated: false, data: null, token: null, timeline: []
            });
        case USER_LOGIN_ERROR:
            return Object.assign({}, state, {
                errorMessage: errorMessage
            });
        case GET_TIMELINE_REQUEST:
            return Object.assign({}, state, {
                isLoading: true, screen_name: username
            });
        case GET_TIMELINE_SUCCESS:
            return Object.assign({}, state, {
                timeline, isLoading: false
            });
        case GET_TIMELINE_ERROR:
            return Object.assign({}, state, {
                errorMessage: errorMessage, isLoading: false
            });
        default:
            return state;
    }
};