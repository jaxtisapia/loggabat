const {expect} = require("chai");
const {describe} = require("mocha");

const LoggaHistory = require("../logga/history");

describe("LoggaHistory", () => {

    let loggaHistory;
    let loggaHistoryInitiatedWithUnnecessaryArgument;

    const FIRST_MESSAGE = "first message";
    const SECOND_MESSAGE = "second message";
    const THIRD_MESSAGE = "third message";

    beforeEach(() => {
        loggaHistory  = new LoggaHistory();
        loggaHistoryInitiatedWithUnnecessaryArgument  = new LoggaHistory("someString");

    });

    describe("#constructor", () => {

        it('should create an instance of LoggaHistory', () => {

            expect(loggaHistory).to.be.an('object');
            expect(loggaHistory.getQueue()).to.be.an("array");
            expect(loggaHistory.getQueue()).to.have.length(0);

            expect(loggaHistoryInitiatedWithUnnecessaryArgument).to.be.an('object');
            expect(loggaHistoryInitiatedWithUnnecessaryArgument.getQueue()).to.be.an("array");
            expect(loggaHistoryInitiatedWithUnnecessaryArgument.getQueue()).to.have.length(0);
        });

    });

    describe("#push", () => {

        it('should be able to add more than one items (strings) to the Queue', () => {

            loggaHistory.push(FIRST_MESSAGE);
            expect(loggaHistory.getQueue()).to.have.length(1);

            loggaHistory.push(SECOND_MESSAGE);
            expect(loggaHistory.getQueue()).to.have.length(2);

            loggaHistory.push(THIRD_MESSAGE);
            expect(loggaHistory.getQueue()).to.have.length(3);

        });

    });

    describe("#empty", () => {
        it('should clear the history Queue', () => {

            loggaHistory.push(FIRST_MESSAGE);
            expect(loggaHistory.getQueue()).to.have.length(1);

            loggaHistory.empty();
            expect(loggaHistory.getQueue()).to.have.length(0);
        })
    });

    describe("#getQueue", () => {
        it('should return an array of all items ever logged', () => {

            loggaHistory.push(FIRST_MESSAGE);
            loggaHistory.push(SECOND_MESSAGE);
            loggaHistory.push(THIRD_MESSAGE);

            expect(loggaHistory.getQueue()).to.have.length(3);
        })
    });

});
