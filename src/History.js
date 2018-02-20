/**
 * History
 */
class History {
  constructor(size, syncFn) {
    this.actions = [];
    this.size = size;
    this.syncOffset = 0;
    this.syncFn = syncFn;
  }

  startSyncing(syncInterval) {
    setInterval(this.sync.bind(this), syncInterval);
  }

  async sync() {
    const batch = this.actions;
    await this.syncFn(batch);
  }

  add(action) {
    this.actions.unshift(action);
    if (this.actions.length > this.size) {
      this.actions = this.actions.slice(0, this.size - 1);
    }
  }

  flush() {
    this.actions.length = 0;
  }
}

module.exports = History;
