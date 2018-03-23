import React from 'react';
import { render } from 'react-dom';
import Root from './Root'
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { saveState, loadState } from './store/localStorage'

import './index.css';

const persistedState = loadState();

const store = createStore(
    rootReducer, persistedState, applyMiddleware(thunk)
);

store.subscribe(() => {
    saveState({
        user: store.getState().user
    });
});

const rootEl = document.getElementById('root');

render(<Root store={store} />, rootEl);


registerServiceWorker();
