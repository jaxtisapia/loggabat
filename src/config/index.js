// Default number of logs a loggabat instance can store in history
const DEFAULT_HISTORY_LIMIT = 100;

// The minimum number of logs a loggabat instance can hold
const HISTORY_LOWER_THRESHOLD = 1;

const ERRORS = {
  HISTORY_LIMIT_BELOW_THRESHOLD: `Minimum threshold for history should be above ${HISTORY_LOWER_THRESHOLD}`,
  THRESHOLD_NOT_NUMBER: 'Minimum threshold for history should be a number'
};

const config = {
  DEFAULT_HISTORY_LIMIT,
  HISTORY_LOWER_THRESHOLD,
  ERRORS
};

module.exports = config;
