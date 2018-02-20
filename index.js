const History = require('./src/History');
const reduxMiddleware = require('./src/reduxMiddleware');

const defaultSync = (batch) => {
  console.groupCollapsed('Sync attempted but not defined!');
  console.log('Batch of history:', batch);
  console.groupEnd();
};

/**
 * @param config {*}
 * @param config.onError {function}
 * @param config.maxHistorySize {number}
 * @param config.syncInterval {number}
 * @param config.sync {func}
 * @returns {{reduxLogsMiddleware, getHistory: (function(*=))}}
 */
module.exports = (config = {}) => {
  const syncInterval = config.syncInterval || null;
  const syncFn = config.sync || defaultSync;
  const onError = config.onError || null;
  const maxHistorySize = config.maxHistorySize || 500;
  const history = new History(maxHistorySize, syncFn);
  if (syncInterval) {
    history.startSyncing(syncInterval);
  }
  return {
    syncHistory: () => history.sync(),
    flushHistory: () => history.flush(),
    getHistory: () => history.actions,
    reduxLogsMiddleware: reduxMiddleware(history, onError),
  };
};
