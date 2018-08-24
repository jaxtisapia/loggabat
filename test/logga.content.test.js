const {expect} = require("chai");
const {describe} = require("mocha");

const LoggaBatContent = require("../src/loggabat/content");
const LoggaBatType = require("../src/loggabat/type");

describe("LoggaBatContent", () => {

    let loggedContent;
    let loggabatContentInitializedWithTypeOnly;
    let loggabatContentInitializedWithWrongTypeOnly;
    let loggabatContentInitializedWithMessageOnly;
    let loggabatContentInitializedWithLoggedStatusOnly;
    let loggabatContentInitializedWithAllParameters;

    const DEFAULT_TYPE = LoggaBatType.LOG;
    const DEFAULT_MESSAGE = null;
    const DEFAULT_LOGGED_STATUS = false;

    const SAMPLE_LOGGABAT_WRONG_TYPE = "WRONG_TYPE";
    const SAMPLE_LOGGABAT_MESSAGE = "Hello Moto!";
    const SAMPLE_LOGGABAT_LOGGED_STATUS = true;

    beforeEach(() => {

        loggedContent = new LoggaBatContent({});
        loggabatContentInitializedWithTypeOnly = new LoggaBatContent({ type: LoggaBatType.WARN });
        loggabatContentInitializedWithWrongTypeOnly = new LoggaBatContent({ type: SAMPLE_LOGGABAT_WRONG_TYPE });
        loggabatContentInitializedWithMessageOnly = new LoggaBatContent({ message: SAMPLE_LOGGABAT_MESSAGE });
        loggabatContentInitializedWithLoggedStatusOnly = new LoggaBatContent({ logged: true });
        loggabatContentInitializedWithAllParameters = new LoggaBatContent({ type: LoggaBatType.WARN, message: SAMPLE_LOGGABAT_MESSAGE, logged: SAMPLE_LOGGABAT_LOGGED_STATUS });

    });

    describe("#constructor", () => {

        it('should initialise with no arguments set', () => {

            expect(loggedContent.type).to.equal(DEFAULT_TYPE);
            expect(loggedContent.message).to.equal(DEFAULT_MESSAGE);
            expect(loggedContent.logged).to.equal(DEFAULT_LOGGED_STATUS);

        });

        it('should initialise with only -type- argument set', () => {

            expect(loggabatContentInitializedWithTypeOnly.type).to.equal(LoggaBatType.WARN);
            expect(loggabatContentInitializedWithTypeOnly.message).to.equal(DEFAULT_MESSAGE);
            expect(loggabatContentInitializedWithTypeOnly.logged).to.equal(DEFAULT_LOGGED_STATUS);

        });

        it('should initialise with only WRONG -type- argument set', () => {

            expect(loggabatContentInitializedWithWrongTypeOnly.type).to.equal(DEFAULT_TYPE);
            expect(loggabatContentInitializedWithWrongTypeOnly.message).to.equal(DEFAULT_MESSAGE);
            expect(loggabatContentInitializedWithWrongTypeOnly.logged).to.equal(DEFAULT_LOGGED_STATUS);

        });

        it('should initialise with only -message- argument set', () => {

            expect(loggabatContentInitializedWithMessageOnly.type).to.equal(DEFAULT_TYPE);
            expect(loggabatContentInitializedWithMessageOnly.message).to.equal(SAMPLE_LOGGABAT_MESSAGE);
            expect(loggabatContentInitializedWithMessageOnly.logged).to.equal(DEFAULT_LOGGED_STATUS);

        });

        it('should initialise with only -logged- argument set', () => {

            expect(loggabatContentInitializedWithLoggedStatusOnly.type).to.equal(DEFAULT_TYPE);
            expect(loggabatContentInitializedWithLoggedStatusOnly.message).to.equal(DEFAULT_MESSAGE);
            expect(loggabatContentInitializedWithLoggedStatusOnly.logged).to.equal(SAMPLE_LOGGABAT_LOGGED_STATUS);

        })

    });

    describe("#setSuccessful", () => {

        it('should indicate that a log has successfully be executed', () => {

            expect(loggedContent.logged).to.equal(false);

            loggedContent.setSuccessful();
            expect(loggedContent.logged).to.not.equal(false);
        })

    });

});
