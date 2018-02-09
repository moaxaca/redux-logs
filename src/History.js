/**
 * History
 */
class History {
  constructor(size) {
    this.history = [];
    this.size = size;
  }

  getHistory() {
    return this.history;
  }

  add(event) {
    this.history.unshift(event);
    if (this.history.length > this.size) {
      this.history = this.history.slice(0, this.size - 1);
    }
  }

  flush() {
    this.history.length = 0;
  }
}

module.exports = History;
