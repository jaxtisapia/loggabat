const {describe} = require("mocha");
const {expect, should} = require("chai");

const Logga = require('../src/logga/logga');
const LoggaType = require('../src/logga/type');

describe("Logga", () => {

    let logga;

    let loggaInitialisedWithProductionMode;
    let loggaInitialisedWithTestMode;
    let loggaInitialisedWithStringPrefix;
    let loggaInitialisedWithNumberPrefix;

    let loggaInitialisedWithString;
    let loggaInitialisedWithNumber;
    let loggaInitialisedWithFunction;

    const MY_APP_PREFIX_STRING = "This is my new app:";
    const MY_APP_PREFIX_NUMBER = 234;

    beforeEach(() => {
        logga = new Logga({});

        loggaInitialisedWithProductionMode = new Logga({ productionMode: true });
        loggaInitialisedWithTestMode = new Logga({ productionMode: false });

        loggaInitialisedWithStringPrefix = new Logga({ prefix: MY_APP_PREFIX_STRING });
        loggaInitialisedWithNumberPrefix = new Logga({ prefix: MY_APP_PREFIX_NUMBER });

        loggaInitialisedWithString = new Logga({ productionMode: "string" });
        loggaInitialisedWithNumber = new Logga({ productionMode: "number" });
        loggaInitialisedWithFunction = new Logga({ productionMode: () => "hello there!" });
    });

    describe("#constructor", () => {

        it('should create a new Logga instance - without arguments', () => {

            const productionMode = logga.productionMode();

            expect(productionMode).to.be.a("boolean");
            expect(productionMode).to.equal(false);
        });

        it('should create a new Logga instance with all expected true arguments set', () => {

            expect(loggaInitialisedWithProductionMode.productionMode()).to.equal(true);
            expect(loggaInitialisedWithTestMode.productionMode()).to.equal(false);

            expect(loggaInitialisedWithStringPrefix.prefix()).to.equal(MY_APP_PREFIX_STRING);
            expect(loggaInitialisedWithNumberPrefix.prefix()).to.equal(MY_APP_PREFIX_NUMBER);

        });

        it('should create a new Logga instance with all unexpected arguments set - Constructor Mismatching', () => {
            expect(loggaInitialisedWithString.productionMode()).equal(false);
            expect(loggaInitialisedWithNumber.productionMode()).equal(false);
            expect(loggaInitialisedWithFunction.productionMode()).equal(false);
        });

    });

    describe("#setProductionEnvironment", () => {

        it('should set production mode to true', () => {

            const initialProductionMode = logga.productionMode();

            logga.setProductionEnvironment();
            const finalProductionMode = logga.productionMode();

            expect(initialProductionMode).to.equal(false);
            expect(finalProductionMode).to.equal(true);
        })

    });

    describe("#setTestEnvironment", () => {

        it('#setTestEnvironemnt should set production mode to true', () => {

            const initialProductionMode = loggaInitialisedWithProductionMode.productionMode();

            loggaInitialisedWithProductionMode.setTestEnvironment();
            const finalProductionMode = loggaInitialisedWithProductionMode.productionMode();

            expect(initialProductionMode).to.equal(true);
            expect(finalProductionMode).to.equal(false);
        })

    });

    describe("#logging", () => {

        const WARNING = "I am warned";
        const INFO = "I am informed";
        const LOG = "I am logged";
        const ERROR = "I am errored, Yikes!";

        it('should LOG when Logga in testEnvironment, and pre-production function called', () => {

            const resultWithWarn = loggaInitialisedWithTestMode.prod().warn(WARNING);
            const resultWithInfo = loggaInitialisedWithTestMode.prod().info(INFO);
            const resultWithLog = loggaInitialisedWithTestMode.prod().log(LOG);
            const resultWithError = loggaInitialisedWithTestMode.prod().error(ERROR);

            expect(resultWithWarn.logged).to.equal(true);
            expect(resultWithWarn.type).to.equal(LoggaType.WARN);

            expect(resultWithInfo.logged).to.equal(true);
            expect(resultWithInfo.type).to.equal(LoggaType.INFO);

            expect(resultWithLog.logged).to.equal(true);
            expect(resultWithLog.type).to.equal(LoggaType.LOG);

            expect(resultWithError.logged).to.equal(true);
            expect(resultWithError.type).to.equal(LoggaType.ERROR);

        });

        it('should LOG when Logga in testEnvironment, and pre-production function not called', () => {

            const resultWithWarn = loggaInitialisedWithTestMode.warn(WARNING);
            const resultWithInfo = loggaInitialisedWithTestMode.info(INFO);
            const resultWithLog = loggaInitialisedWithTestMode.log(LOG);
            const resultWithError = loggaInitialisedWithTestMode.error(ERROR);

            expect(resultWithWarn.logged).to.equal(true);
            expect(resultWithWarn.type).to.equal(LoggaType.WARN);

            expect(resultWithInfo.logged).to.equal(true);
            expect(resultWithInfo.type).to.equal(LoggaType.INFO);

            expect(resultWithLog.logged).to.equal(true);
            expect(resultWithLog.type).to.equal(LoggaType.LOG);

            expect(resultWithError.logged).to.equal(true);
            expect(resultWithError.type).to.equal(LoggaType.ERROR);

        });

        it('should NOT LOG when Logga in productionEnvironment, and pre-production function not called', () => {

            const resultWithWarn = loggaInitialisedWithProductionMode.warn(WARNING);
            const resultWithInfo = loggaInitialisedWithProductionMode.info(INFO);
            const resultWithLog = loggaInitialisedWithProductionMode.log(LOG);
            const resultWithError = loggaInitialisedWithProductionMode.error(ERROR);

            expect(resultWithWarn.logged).to.equal(false);
            expect(resultWithWarn.type).to.equal(LoggaType.WARN);

            expect(resultWithInfo.logged).to.equal(false);
            expect(resultWithInfo.type).to.equal(LoggaType.INFO);

            expect(resultWithLog.logged).to.equal(false);
            expect(resultWithLog.type).to.equal(LoggaType.LOG);

            expect(resultWithError.logged).to.equal(false);
            expect(resultWithError.type).to.equal(LoggaType.ERROR);

        });

        it('should NOT LOG when Logga in productionEnvironment, and pre-production function called', () => {

            const resultWithWarn = loggaInitialisedWithProductionMode.prod().warn(WARNING);
            const resultWithInfo = loggaInitialisedWithProductionMode.prod().info(INFO);
            const resultWithLog = loggaInitialisedWithProductionMode.prod().log(LOG);
            const resultWithError = loggaInitialisedWithProductionMode.prod().error(ERROR);

            expect(resultWithWarn.logged).to.equal(true);
            expect(resultWithWarn.type).to.equal(LoggaType.WARN);

            expect(resultWithInfo.logged).to.equal(true);
            expect(resultWithInfo.type).to.equal(LoggaType.INFO);

            expect(resultWithLog.logged).to.equal(true);
            expect(resultWithLog.type).to.equal(LoggaType.LOG);

            expect(resultWithError.logged).to.equal(true);
            expect(resultWithError.type).to.equal(LoggaType.ERROR);

        });

        it('should LOG in a combined and dynamic environment', () => {

            const resultWithWarn = logga.prod().warn(WARNING);

            logga.setProductionEnvironment();
            const resultWithInfo = logga.prod().info(INFO);

            logga.setTestEnvironment();
            const resultWithError = logga.error(ERROR);


            expect(resultWithWarn.logged).to.equal(true);
            expect(resultWithWarn.type).to.equal(LoggaType.WARN);

            expect(resultWithInfo.logged).to.equal(true);
            expect(resultWithInfo.type).to.equal(LoggaType.INFO);

            expect(resultWithError.logged).to.equal(true);
            expect(resultWithError.type).to.equal(LoggaType.ERROR);
        });
	
		it ( 'should LOG with a prefix set to it' , () => {
			
			loggaInitialisedWithStringPrefix.warn(WARNING);
			loggaInitialisedWithNumberPrefix.info(INFO);
			
			expect(loggaInitialisedWithStringPrefix.getHistory()).to.have.length(1);
			expect(loggaInitialisedWithNumberPrefix.getHistory()).to.have.length(1);
			
		} )
    
    });

    describe("#getHistory", () => {

        it('should get all items that have been logged', () => {

            const firstMessage = "Bambi";
            const secondMessage = "Migdalia";

            let history = logga.getHistory();
            expect(history).to.be.an('array');

            logga.log(firstMessage);
            history = logga.getHistory();
            expect(history).to.have.length(1);
            expect(history).to.contain(firstMessage);

            logga.log(secondMessage);
            history = logga.getHistory();
            expect(history).to.have.length(2);
            expect(history).to.contain(secondMessage);

        })

    });

    describe("#resetHistory", () => {

        it('should clear previously stored data (or History) from the Logga Instance', () => {

            const firstMessage = "Bambi";
            const secondMessage = "Migdalia";

            let history = logga.getHistory();
            expect(history).to.be.an('array');
            expect(history).to.have.length(0);


            logga.log(firstMessage);
            history = logga.getHistory();
            expect(history).to.have.length(1);

            logga.resetHistory();
            history = logga.getHistory();
            expect(history).to.have.length(0);

        })


    });

});
