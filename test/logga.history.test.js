const {expect} = require("chai");
const {describe} = require("mocha");
const config = require("../src/config");

const LoggaBatHistory = require("../src/loggabat/history");
const LoggaBat = require("../src");

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
      it('should set default limit to DEFAULT_HISTORY_LIMIT value', () => {
        const initialLimit = loggabatHistory.getLimit();
        expect(initialLimit).to.equal(config.DEFAULT_HISTORY_LIMIT);

        const anotherLimit = loggabatHistoryInitiatedWithUnnecessaryArgument.getLimit();
        expect(anotherLimit).to.equal(config.DEFAULT_HISTORY_LIMIT);
      });

      it('should throw error when setting limit less than HISTORY_LOWER_THRESHOLD', () => {
        expect(() => loggabatHistory.setLimit(0)).to.throw();
        expect(() => loggabatHistory.setLimit(-0)).to.throw();
        expect(() => loggabatHistory.setLimit(-1)).to.throw();
        expect(() => loggabatHistory.setLimit(-22)).to.throw();
        expect(() => loggabatHistory.setLimit(-300)).to.throw();
        expect(() => loggabatHistory.setLimit(-4000)).to.throw();
      });

      it('should throw error when setting limit which is not a number', () => {
        expect(() => loggabatHistory.setLimit("")).to.throw();
        expect(() => loggabatHistory.setLimit(" ")).to.throw();
        expect(() => loggabatHistory.setLimit("a")).to.throw();
        expect(() => loggabatHistory.setLimit("some string")).to.throw();
      });

      it('should be able to set limit greater than HISTORY_LOWER_THRESHOLD', () => {
        expect(() => loggabatHistory.setLimit(config.HISTORY_LOWER_THRESHOLD)).to.not.throw();
        expect(() => loggabatHistory.setLimit(12)).to.not.throw();
        expect(() => loggabatHistory.setLimit(23423)).to.not.throw();
        expect(() => loggabatHistory.setLimit(99999999999999999999999999999999)).to.not.throw();
      });

      it('should hold log histories capped at the limit value', () => {
        const expectedNumberOfLogsInHistory = 600;

        const loggabat = new LoggaBat({ productionMode: false });
        loggabat.setHistoryQueue(loggabatHistory);

        loggabatHistory.setLimit(expectedNumberOfLogsInHistory);

        // To test our history object can hold maximum value 'expectedNumberOfLogsInHistory',
        // we stress-test it with multiple the maximum value
        // We then check if it actually held the maximum value
        const actualNumberOfLogs = expectedNumberOfLogsInHistory * 2;

        for (let index = 0; index < actualNumberOfLogs; index++) {
          loggabat.warn(index);
        }

        const historyOfLogs = loggabat.getHistory();

        expect(historyOfLogs.length).to.not.equal(actualNumberOfLogs);
        expect(historyOfLogs.length).to.equal(expectedNumberOfLogsInHistory);
      });
    });

    describe('#getLimit', function () {
      it('should return DEFAULT_HISTORY_LIMIT when no limit is set', () => {
        expect(loggabatHistory.getLimit()).to.equal(config.DEFAULT_HISTORY_LIMIT);
      });

      it('should return a number-value that corresponds to history limit', () => {
        loggabatHistory.setLimit(55);
        expect(loggabatHistory.getLimit()).to.equal(55)
      });
    });

});
