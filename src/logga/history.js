/* eslint-disable no-underscore-dangle */
class LoggaHistory {
  // const MAX_SIZE = 5;

  /**
     * @constructor
     */
  constructor() {
    this._queue = [];
  }

  /**
     *
     * @param content
     */
  push(content) {
    this._queue.push(content);
  }

  /**
     *
     */
  empty() {
    this._queue = [];
  }

  /**
     * @return {Array}
     */
  getQueue() {
    return this._queue;
  }
}

module.exports = LoggaHistory;
