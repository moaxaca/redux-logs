/**
 * @param history {History}
 * @param onError
 */
module.exports = (history, onError) => store => next => (action) => {
  history.add(action);
  try {
    return next(action);
  } catch (e) {
    if (typeof onError === 'function') {
      onError(
        history.actions,
        store.getState(),
        () => history.flush(),
      );
    }
    return store.getState();
  }
};
