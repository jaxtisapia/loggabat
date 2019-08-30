const {expect} = require("chai");
const {describe} = require("mocha");

const LoggaBatHistory = require("../src/loggabat/history");

describe("LoggaBatHistory", () => {

    let loggabatHistory;
    let loggabatHistoryInitiatedWithUnnecessaryArgument;

    const FIRST_MESSAGE = "first message";
    const SECOND_MESSAGE = "second message";
    const THIRD_MESSAGE = "third message";

    beforeEach(() => {
        loggabatHistory  = new LoggaBatHistory();
        loggabatHistoryInitiatedWithUnnecessaryArgument  = new LoggaBatHistory("someString");

    });

    describe("#constructor", () => {

        it('should create an instance of LoggaBatHistory', () => {

            expect(loggabatHistory).to.be.an('object');
            expect(loggabatHistory.getQueue()).to.be.an("array");
            expect(loggabatHistory.getQueue()).to.have.length(0);

            expect(loggabatHistoryInitiatedWithUnnecessaryArgument).to.be.an('object');
            expect(loggabatHistoryInitiatedWithUnnecessaryArgument.getQueue()).to.be.an("array");
            expect(loggabatHistoryInitiatedWithUnnecessaryArgument.getQueue()).to.have.length(0);
        });

    });

    describe("#push", () => {

        it('should be able to add more than one items (strings) to the Queue', () => {

            loggabatHistory.push(FIRST_MESSAGE);
            expect(loggabatHistory.getQueue()).to.have.length(1);

            loggabatHistory.push(SECOND_MESSAGE);
            expect(loggabatHistory.getQueue()).to.have.length(2);

            loggabatHistory.push(THIRD_MESSAGE);
            expect(loggabatHistory.getQueue()).to.have.length(3);

        });

    });

    describe("#empty", () => {
        it('should clear the history Queue', () => {

            loggabatHistory.push(FIRST_MESSAGE);
            expect(loggabatHistory.getQueue()).to.have.length(1);

            loggabatHistory.empty();
            expect(loggabatHistory.getQueue()).to.have.length(0);
        })
    });

    describe("#getQueue", () => {
        it('should return an array of all items ever logged', () => {

            loggabatHistory.push(FIRST_MESSAGE);
            loggabatHistory.push(SECOND_MESSAGE);
            loggabatHistory.push(THIRD_MESSAGE);

            expect(loggabatHistory.getQueue()).to.have.length(3);
        })
    });

    describe('#setLimit', function () {
      it('should set default limit to CONFIG_DEFAULT_LIMIT value');
      it('should throw error when setting limit less than 1');
      it('should throw error when setting limit which is not a number');
      it('should be able to set limit greater than 1');
    });

    describe('#getLimit', function () {
      it('should return CONFIG_DEFAULT_LIMIT when no limit is set');
      it('should return a number-value that corresponds to history limit');
    });

});
