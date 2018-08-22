const LoggaType = require("./type");

class LoggedContent {

    /**
     * @constructor
     * @param {LoggaType} type
     * @param {any} message
     * @param {boolean} logged
     */
    constructor({ type, message, logged }){
        this.type = (Object.values(LoggaType).includes(type)) ?  type: LoggaType.LOG;

        this.message = (message) ? message : null;
        this.logged = (typeof logged === 'boolean') ? logged : false;
    }

    /**
     *
     */
    setSuccessful() {
        this._setLogged(true)
    }

    /**
     * @param {boolean} condition
     * @private
     */
    _setLogged(condition){
        if (typeof condition === "boolean") this.logged = condition;
    }
}

module.exports = LoggedContent;