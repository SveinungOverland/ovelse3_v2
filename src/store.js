import { applyMiddleware, createStore } from 'redux';

import reducer from "./Reducers";

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

const middleware = applyMiddleware(promise(), thunk, logger());

export default createStore(reducer, middleware);