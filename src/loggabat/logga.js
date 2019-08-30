/* eslint-disable no-underscore-dangle,no-console */
const LoggahHistory = require('./history');
const LoggedContent = require('./content');
const LoggahType = require('./type');

/**
 * Special Logger for filtering logs you need in production, and logs you need in test mode only
 *
 * @property {boolean} _productionMode - state of LoggaBat. Either in production mode or test mode
 * @property {LoggahHistory} _history - an array of all logs successfully ran
 *
 * @property {boolean} _nextMessageTestType - determines the message type of next item to be logged.
 * Either a production-friendly log, or a non-important test-environment message
 *
 * @property {string | number} _prefix - value to be prepended to all log messages
 *
 * @author Justice Appiah <jaxtis.apia@gmail.com>
 * @version 1.0.0
 */
class LoggaBat {
  /**
   * Create a LoggaBat
   * @constructor
   *
   * @example
   * const logger = new LoggaBat({ productionMode: true, prefix:"MY-APP-NAMESPACE"})
   *
   * @param { boolean } productionMode - Determines behaviour of LoggaBat with
   * respect to production. Some logs are hidden in production mode.
   * When not specified, defaults to false.
   * Passing a non boolean also defaults to false.
   * @param {any} prefix - Value to be prepended to all logs
   *
   * @return {LoggaBat} an instance of the LoggaBat
   */
  constructor({ productionMode, prefix }) {
    this.setPrefix(prefix);
    this._productionMode = (typeof productionMode === 'boolean') ? productionMode : false;
    this._history = new LoggahHistory();
    this._nextMessageTestType = true;
  }

  /**
   * Clear temporary indicator of next message being production-friendly
   * @private
   */
  _resetNextMessageType() {
    this._nextMessageTestType = true;
  }

  /**
   * Proxy function to create standard content passed to the parent logger
   *
   * @private
   *
   * @param {any} message
   * @return {{message: *, isTestModeMessage: boolean}}
   */
  _createLoggerContent(message) {
    const isTestModeMessage = this._nextMessageTestType;

    // reset the _nextMessageTestType and release neutrality
    // and independence of futher loggah actions
    this._resetNextMessageType();

    return { message, isTestModeMessage };
  }

  /**
   * Return prefix value assigned to a LoggaBat instance
   * @return {any|*}
   */
  prefix() {
    return this._prefix;
  }

  /**
   * Set a value to prepend to all logs
   *
   * @example
   * const loggah = new LoggaBat({});
   * loggah.setPrefix("My Heroku App");
   *
   * @param { string | number } value - value to be prepended to all logs
   */
  setPrefix(value) {
    this._prefix = value;
  }

  /**
   * Proxy function for all logging actions
   * @private
   *
   * @example
   * const loggerFunction = console.warn
   * const loggerContent = { message: "App successfully started", isTestModeMessage: true };
   * _log(loggerFunction, loggerContent);
   *
   * @param {function} loggerFunction - Log Function to run
   * @param {string} message - Message to be logged
   * @param {boolean} isTestModeMessage - Determines if message is production relevant. True when
   * not relevant in production mode, False when relevant in production mode
   * @param  {string} type - Log level, example: an info, a warning.
   *
   * @return {LoggedContent} Details of log action
   */
  _log(loggerFunction, { message, isTestModeMessage }, type = LoggahType.INFO) {
    let contentMessage = message;

    const loggedContent = new LoggedContent({ logged: false, message: contentMessage, type });
    const loggahHistory = this._history;

    // Filters all relevant log actions according to 'productionMode' of LoggaBat Instance
    if (isTestModeMessage && this.productionMode()) return loggedContent;

    // Hooray!!! You made it to this space
    // At this point, all log functions are RAN SUCCESSFULLY
    if (this.isPrefixSet()) contentMessage = this._prependPrefixToMessage(contentMessage);

    loggahHistory.push(contentMessage);
    loggerFunction(contentMessage);
    loggedContent.setSuccessful();

    return loggedContent;
  }

  /**
   * Return <b>True</b> when prefix is set for a LoggaBat, or <b>False</b> when no prefix is set
   * @return {boolean}
   */
  isPrefixSet() {
    const prefix = this.prefix();
    return !!(prefix);
  }

  /**
   * Prepend prefix message to a message to be LoggaBat'd
   * @private
   *
   * @see setPrefix
   *
   * @param {any} message - Message to be manipulated. Example, message = "Magnificent Cat"
   *
   * @return {string} - manipulated message.
   * Example "CAT-APP Magnificent Cat", assuming is a set prefix.
   */
  _prependPrefixToMessage(message) {
    const prefix = this.prefix();
    return `${prefix} ${message}`;
  }

  /**
   * Prepares next message to be LoggaBat'd as a production-friendly one
   *
   * @see prod
   * @return {LoggaBat} Self item for further manipulations
   */
  production() {
    this._nextMessageTestType = false;
    return this;
  }

  /**
   * Same as  {@link production}
   * @see production
   * @return {LoggaBat}
   */
  prod() {
    return this.production();
  }

  /**
   * Same as  {@link production}
   * @see production
   * @return {LoggaBat}
   */
  p() {
    return this.production();
  }

  /**
   * Set mode into a production-ready environment
   *
   * @example
   * const loggah = new LoggaBat({}); // LoggaBat is in test mode
   * loggah.setProductionEnvironment(); // LoggaBat is in production mode
   *
   * @see setTestEnvironment
   *
   * @return {void}
   */
  setProductionEnvironment() {
    this._productionMode = true;
  }

  /**
   * Set mode into a test environment
   *
   * @example
   * const loggah = new LoggaBat({productionMode: true}); // LoggaBat is in production mode
   * loggah.setProductionEnvironment(); // LoggaBat is in test mode
   *
   * @see setProductionEnvironment
   *
   * @return {void}
   */
  setTestEnvironment() {
    this._productionMode = false;
  }

  /**
   * Get production environment LoggaBat is curently operating in.
   * <b>True</b> when in production mode,
   * <b>False</b> when in test mode
   *
   * @return {boolean} true when LoggaBat is production-ready or in test mode
   */
  productionMode() {
    return this._productionMode;
  }

  /**
   * Clear all previously saved logs from LoggaBat's history
   *
   * @return {void}
   */
  resetHistory() {
    this._history.empty();
  }

  /**
   * Return an array of all logs a LoggaBat has ran successfully
   *
   * @return {Array}
   */
  getHistory() {
    return this._history.getQueue();
  }

  /**
   * Console.log a message to the console
   * @param {string | number} message
   * @return {LoggedContent}
   */
  log(message) {
    const logger = console.log;
    const content = this._createLoggerContent(message);
    return this._log(logger, content, LoggahType.LOG);
  }

  /**
   * Console.info a message to the console
   * @param {string | number} message
   * @return {LoggedContent}
   */
  info(message) {
    const logger = console.info;
    const content = this._createLoggerContent(message);
    return this._log(logger, content, LoggahType.INFO);
  }

  /**
   * Console.warn a message to the console
   * @param {string | number} message
   * @return {LoggedContent}
   */
  warn(message) {
    const logger = console.warn;
    const content = this._createLoggerContent(message);
    return this._log(logger, content, LoggahType.WARN);
  }

  /**
   *  Console.error a message to the console
   * @param {string | number} message
   * @return {LoggedContent}
   */
  error(message) {
    const logger = console.error;
    const content = this._createLoggerContent(message);
    return this._log(logger, content, LoggahType.ERROR);
  }
}

module.exports = LoggaBat;
