'use strict';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const THROW = 'THROW';

module.exports = {
  reducer: (state = 0, action) => {
    switch (action.type) {
      case INCREMENT:
        return state + 1;
      case DECREMENT:
        return state - 1;
      case THROW:
        throw new Error();
      default:
        return state
    }
  },
  incrementAction: () => ({
    type: INCREMENT,
  }),
  decrementAction: () => ({
    type: DECREMENT,
  }),
  throwAction: () => ({
    type: THROW,
  }),
};
