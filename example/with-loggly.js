const { createStore, applyMiddleware } = require('redux');
const {
  incrementAction,
  decrementAction,
  throwAction,
  reducer,
} = require('./counter');
const reduxLogs = require('../');

const { reduxLogsMiddleware, getHistory } = reduxLogs({
  onError: (history, state) => {
    console.log(history, state);
  }
});

const store = createStore(
  reducer,
  applyMiddleware(
    reduxLogsMiddleware
  )
);

store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(decrementAction());
store.dispatch(throwAction());
store.dispatch(incrementAction());
console.log(getHistory());
