const {expect} = require("chai");
const {describe} = require("mocha");

const LoggahHistory = require("../src/logga/history");

describe("LoggahHistory", () => {

    let loggahHistory;
    let loggahHistoryInitiatedWithUnnecessaryArgument;

    const FIRST_MESSAGE = "first message";
    const SECOND_MESSAGE = "second message";
    const THIRD_MESSAGE = "third message";

    beforeEach(() => {
        loggahHistory  = new LoggahHistory();
        loggahHistoryInitiatedWithUnnecessaryArgument  = new LoggahHistory("someString");

    });

    describe("#constructor", () => {

        it('should create an instance of LoggahHistory', () => {

            expect(loggahHistory).to.be.an('object');
            expect(loggahHistory.getQueue()).to.be.an("array");
            expect(loggahHistory.getQueue()).to.have.length(0);

            expect(loggahHistoryInitiatedWithUnnecessaryArgument).to.be.an('object');
            expect(loggahHistoryInitiatedWithUnnecessaryArgument.getQueue()).to.be.an("array");
            expect(loggahHistoryInitiatedWithUnnecessaryArgument.getQueue()).to.have.length(0);
        });

    });

    describe("#push", () => {

        it('should be able to add more than one items (strings) to the Queue', () => {

            loggahHistory.push(FIRST_MESSAGE);
            expect(loggahHistory.getQueue()).to.have.length(1);

            loggahHistory.push(SECOND_MESSAGE);
            expect(loggahHistory.getQueue()).to.have.length(2);

            loggahHistory.push(THIRD_MESSAGE);
            expect(loggahHistory.getQueue()).to.have.length(3);

        });

    });

    describe("#empty", () => {
        it('should clear the history Queue', () => {

            loggahHistory.push(FIRST_MESSAGE);
            expect(loggahHistory.getQueue()).to.have.length(1);

            loggahHistory.empty();
            expect(loggahHistory.getQueue()).to.have.length(0);
        })
    });

    describe("#getQueue", () => {
        it('should return an array of all items ever logged', () => {

            loggahHistory.push(FIRST_MESSAGE);
            loggahHistory.push(SECOND_MESSAGE);
            loggahHistory.push(THIRD_MESSAGE);

            expect(loggahHistory.getQueue()).to.have.length(3);
        })
    });

});
