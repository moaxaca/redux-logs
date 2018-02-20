const { createStore, applyMiddleware } = require('redux'); // eslint-disable-line
const {
  incrementAction,
  decrementAction,
  throwAction,
  reducer,
} = require('./counter');
const reduxLogs = require('../');

const syncHistory = (batch) => {
  console.groupCollapsed('History');
  console.log('History:', batch);
  console.groupEnd();
};

const logHistoryToConsole = (history, state) => {
  console.groupCollapsed('History & State');
  console.log('History:', history);
  console.log('State:', state);
  console.groupEnd();
};

const { flushHistory, reduxLogsMiddleware } = reduxLogs({
  maxHistorySize: 10,
  sync: syncHistory,
  onError: (history, state, flush) => {
    logHistoryToConsole(history, state);
    flush();
  },
});

const store = createStore(
  reducer,
  applyMiddleware(reduxLogsMiddleware),
);

store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(incrementAction());
flushHistory();
store.dispatch(decrementAction());
store.dispatch(throwAction());
