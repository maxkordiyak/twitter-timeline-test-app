import userReducer from './user';
import { GET_TIMELINE_ERROR, GET_TIMELINE_REQUEST, GET_TIMELINE_SUCCESS } from "../actions";

describe('Reducer: user', () => {

    describe('when passed no state', () => {
        it('should return the initial state', () => {
            expect(
                userReducer(undefined, {})
            ).toMatchSnapshot();
        });
    });

    describe('when a search request is pending', () => {
        it('should set isLoading to true', () => {
            const beforeState = {
                isLoading: false,
            };
            const afterState = userReducer(beforeState, { type: 'GET_TIMELINE_REQUEST' });

            expect(
                afterState
            ).toMatchSnapshot();
        });
    });

    describe('when a search request is successful', () => {
        it('should update the state with the user timeline data', () => {
            const beforeState = {
                isLoading: false,
                timeline: [],
            };
            const action = {
                payload: {
                    timeline: [1, 2]
                },
                type: 'GET_TIMELINE_SUCCESS',
            };
            const afterState = userReducer(beforeState, action);

            expect(
                afterState
            ).toMatchSnapshot();
            expect(afterState).not.toBe(beforeState);
        });
    });

    describe('when a search request fails', () => {
        it('should update the state with an error message', () => {
            const beforeState = {
                errorMessage: "",
                isLoading: false
            };
            const error = new Error('Unauthorized');
            error.response = {test: 'test'};

            const action = {
                type: 'GET_TIMELINE_ERROR',
                errorMessage: error
            };
            const afterState = userReducer(beforeState, action);

            expect(
                afterState
            ).toMatchSnapshot();
            expect(afterState).not.toBe(beforeState);
        });
    });

});
