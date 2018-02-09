'use strict';

const History = require('./src/History');
const reduxMiddleware = require('./src/reduxMiddleware');

/**
 * @param config {*}
 * @param config.maxHistorySize {number}
 * @param config.onError {function}
 * @returns {{reduxLogsMiddleware, getHistory: (function(*=))}}
 */
module.exports = (config = {}) => {
  const onError = config.onError || null;
  const history = new History(config.maxHistorySize || 500);
  return {
    flushHistory: () => history.flush(),
    getHistory: () => history.getHistory(),
    reduxLogsMiddleware: reduxMiddleware(history, onError),
  };
};
