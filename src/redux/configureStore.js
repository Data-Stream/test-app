import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger/src';
import tests from './features/tests';
import questions from './features/questions';
import answers from './features/answers';

const rootReducer = combineReducers({
  tests,
  questions,
  answers
});

const logger = createLogger({
  collapsed: true,
  diff: true,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));

