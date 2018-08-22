const {expect} = require("chai");
const {describe} = require("mocha");

const LoggaContent = require("../src/logga/content");
const LoggaType = require("../src/logga/type");

describe("LoggaContent", () => {

    let loggaContent;
    let loggaContentInitializedWithTypeOnly;
    let loggaContentInitializedWithWrongTypeOnly;
    let loggaContentInitializedWithMessageOnly;
    let loggaContentInitializedWithLoggedStatusOnly;
    let loggaContentInitializedWithAllParameters;

    const DEFAULT_TYPE = LoggaType.LOG;
    const DEFAULT_MESSAGE = null;
    const DEFAULT_LOGGED_STATUS = false;

    const SAMPLE_LOGGA_WRONG_TYPE = "WRONG_TYPE";
    const SAMPLE_LOGGA_MESSAGE = "Hello Moto!";
    const SAMPLE_LOGGA_LOGGED_STATUS = true;

    beforeEach(() => {

        loggaContent = new LoggaContent({});
        loggaContentInitializedWithTypeOnly = new LoggaContent({ type: LoggaType.WARN });
        loggaContentInitializedWithWrongTypeOnly = new LoggaContent({ type: SAMPLE_LOGGA_WRONG_TYPE });
        loggaContentInitializedWithMessageOnly = new LoggaContent({ message: SAMPLE_LOGGA_MESSAGE });
        loggaContentInitializedWithLoggedStatusOnly = new LoggaContent({ logged: true });
        loggaContentInitializedWithAllParameters = new LoggaContent({ type: LoggaType.WARN, message: SAMPLE_LOGGA_MESSAGE, logged: SAMPLE_LOGGA_LOGGED_STATUS });

    });

    describe("#constructor", () => {

        it('should initialise with no arguments set', () => {

            expect(loggaContent.type).to.equal(DEFAULT_TYPE);
            expect(loggaContent.message).to.equal(DEFAULT_MESSAGE);
            expect(loggaContent.logged).to.equal(DEFAULT_LOGGED_STATUS);

        });

        it('should initialise with only -type- argument set', () => {

            expect(loggaContentInitializedWithTypeOnly.type).to.equal(LoggaType.WARN);
            expect(loggaContentInitializedWithTypeOnly.message).to.equal(DEFAULT_MESSAGE);
            expect(loggaContentInitializedWithTypeOnly.logged).to.equal(DEFAULT_LOGGED_STATUS);

        });

        it('should initialise with only WRONG -type- argument set', () => {

            expect(loggaContentInitializedWithWrongTypeOnly.type).to.equal(DEFAULT_TYPE);
            expect(loggaContentInitializedWithWrongTypeOnly.message).to.equal(DEFAULT_MESSAGE);
            expect(loggaContentInitializedWithWrongTypeOnly.logged).to.equal(DEFAULT_LOGGED_STATUS);

        });

        it('should initialise with only -message- argument set', () => {

            expect(loggaContentInitializedWithMessageOnly.type).to.equal(DEFAULT_TYPE);
            expect(loggaContentInitializedWithMessageOnly.message).to.equal(SAMPLE_LOGGA_MESSAGE);
            expect(loggaContentInitializedWithMessageOnly.logged).to.equal(DEFAULT_LOGGED_STATUS);

        });

        it('should initialise with only -logged- argument set', () => {

            expect(loggaContentInitializedWithLoggedStatusOnly.type).to.equal(DEFAULT_TYPE);
            expect(loggaContentInitializedWithLoggedStatusOnly.message).to.equal(DEFAULT_MESSAGE);
            expect(loggaContentInitializedWithLoggedStatusOnly.logged).to.equal(SAMPLE_LOGGA_LOGGED_STATUS);

        })

    });

    describe("#setSuccessful", () => {

        it('should indicate that a log has successfully be executed', () => {

            expect(loggaContent.logged).to.equal(false);

            loggaContent.setSuccessful();
            expect(loggaContent.logged).to.not.equal(false);
        })

    });

});
