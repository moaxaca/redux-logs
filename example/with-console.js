'use strict';

const { createStore, applyMiddleware } = require('redux');
const {
  incrementAction,
  decrementAction,
  throwAction,
  reducer,
} = require('./counter');
const reduxLogs = require('../');

const logHistoryToConsole = (history, state) => {
  console.groupCollapsed('History & State');
  console.log('History:', history);
  console.log('State:', state);
  console.groupEnd();
};

const { getHistory, flushHistory, reduxLogsMiddleware } = reduxLogs({
  maxHistorySize: 10,
  onError: (history, state, flush) => {
    logHistoryToConsole(history, state);
    flush();
  },
});

const store = createStore(
  reducer,
  applyMiddleware(
    reduxLogsMiddleware
  )
);

store.dispatch(incrementAction());
store.dispatch(incrementAction());
logHistoryToConsole(getHistory(), store.getState());
store.dispatch(incrementAction());
flushHistory();
store.dispatch(decrementAction());
store.dispatch(throwAction());
