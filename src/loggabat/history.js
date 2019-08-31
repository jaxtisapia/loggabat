/* eslint-disable no-underscore-dangle */
import config from '../config';

/**
 * History Collector for all contents logged onto the console
 */
class LoggaBatHistory {
  /**
   * Create a new LoggaBatHistory instance
   * @constructor
   */
  constructor() {
    this._queue = [];
    this._limit = config.DEFAULT_HISTORY_LIMIT;
    this._minimumLimitThreshold = config.HISTORY_LOWER_THRESHOLD;
  }

  /**
   * Add a new {@link LoggedContent} to history
   * @param {LoggedContent} content - logged item to be added to history
   */
  push(content) {
    this._queue.push(content);

    const isQueueAboveMaxThreshold = this._queue.length > this._limit;
    if (isQueueAboveMaxThreshold) {
      this.dequeue();
    }
  }

  /**
   * Remove the oldest saved log from history
   */
  dequeue() {
    this._queue.shift();
  }

  /**
   * Clear history. Cannot be recovered once cleared
   */
  empty() {
    this._queue = [];
  }

  /**
   * Get all LoggedContents successfully logged into console
   * @return {Array}
   */
  getQueue() {
    return this._queue;
  }

  setLimit(limit) {
    this._checkForValidLimit(limit);
    this._limit = limit;
  }

  getLimit() {
    return this._limit;
  }

  _checkForValidLimit(limit) {
    const isLimitLessThanLowerThreshold = limit < this._minimumLimitThreshold;
    if (isLimitLessThanLowerThreshold) {
      throw new Error(config.ERRORS.HISTORY_LIMIT_BELOW_THRESHOLD);
    }

    const isLimitNumber = typeof limit === 'number';
    if (!isLimitNumber) {
      throw new Error(config.ERRORS.THRESHOLD_NOT_NUMBER);
    }
  }
}

module.exports = LoggaBatHistory;
