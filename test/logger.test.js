const {describe} = require("mocha");
const {expect, should} = require("chai");

const LoggaBat = require('../src/loggabat/logga');
const LoggaBatType = require('../src/loggabat/type');

describe("LoggaBat", () => {

    let loggabat;

    let loggabatInitialisedWithProductionMode;
    let loggabatInitialisedWithTestMode;
    let loggabatInitialisedWithStringPrefix;
    let loggabatInitialisedWithNumberPrefix;

    let loggabatInitialisedWithString;
    let loggabatInitialisedWithNumber;
    let loggabatInitialisedWithFunction;

    const MY_APP_PREFIX_STRING = "This is my new app:";
    const MY_APP_PREFIX_NUMBER = 234;

    beforeEach(() => {
        loggabat = new LoggaBat({});

        loggabatInitialisedWithProductionMode = new LoggaBat({ productionMode: true });
        loggabatInitialisedWithTestMode = new LoggaBat({ productionMode: false });

        loggabatInitialisedWithStringPrefix = new LoggaBat({ prefix: MY_APP_PREFIX_STRING });
        loggabatInitialisedWithNumberPrefix = new LoggaBat({ prefix: MY_APP_PREFIX_NUMBER });

        loggabatInitialisedWithString = new LoggaBat({ productionMode: "string" });
        loggabatInitialisedWithNumber = new LoggaBat({ productionMode: "number" });
        loggabatInitialisedWithFunction = new LoggaBat({ productionMode: () => "hello there!" });
    });

    describe("#constructor", () => {

        it('should create a new LoggaBat instance - without arguments', () => {

            const productionMode = loggabat.productionMode();

            expect(productionMode).to.be.a("boolean");
            expect(productionMode).to.equal(false);
        });

        it('should create a new LoggaBat instance with all expected true arguments set', () => {

            expect(loggabatInitialisedWithProductionMode.productionMode()).to.equal(true);
            expect(loggabatInitialisedWithTestMode.productionMode()).to.equal(false);

            expect(loggabatInitialisedWithStringPrefix.prefix()).to.equal(MY_APP_PREFIX_STRING);
            expect(loggabatInitialisedWithNumberPrefix.prefix()).to.equal(MY_APP_PREFIX_NUMBER);

        });

        it('should create a new LoggaBat instance with all unexpected arguments set - Constructor Mismatching', () => {
            expect(loggabatInitialisedWithString.productionMode()).equal(false);
            expect(loggabatInitialisedWithNumber.productionMode()).equal(false);
            expect(loggabatInitialisedWithFunction.productionMode()).equal(false);
        });

    });

    describe("#setProductionEnvironment", () => {

        it('should set production mode to true', () => {

            const initialProductionMode = loggabat.productionMode();

            loggabat.setProductionEnvironment();
            const finalProductionMode = loggabat.productionMode();

            expect(initialProductionMode).to.equal(false);
            expect(finalProductionMode).to.equal(true);
        })

    });

    describe("#p, #prod, #production", () => {
        it('#p should set production mode to true',  () =>{
            const initialProductionMode = loggabat.p().productionMode();

            loggabat.setProductionEnvironment();
            const finalProductionMode = loggabat.p().productionMode();

            expect(initialProductionMode).to.equal(false);
            expect(finalProductionMode).to.equal(true);
        })

        it('#prop should set production mode to true',  () =>{
            const initialProductionMode = loggabat.prod().productionMode();

            loggabat.setProductionEnvironment();
            const finalProductionMode = loggabat.prod().productionMode();

            expect(initialProductionMode).to.equal(false);
            expect(finalProductionMode).to.equal(true);
        })

        it('#production should set production mode to true',  () =>{
            const initialProductionMode = loggabat.production().productionMode();

            loggabat.setProductionEnvironment();
            const finalProductionMode = loggabat.production().productionMode();

            expect(initialProductionMode).to.equal(false);
            expect(finalProductionMode).to.equal(true);
        })
    })

    describe("#setTestEnvironment", () => {

        it('#setTestEnvironment should set production mode to true', () => {

            const initialProductionMode = loggabatInitialisedWithProductionMode.productionMode();

            loggabatInitialisedWithProductionMode.setTestEnvironment();
            const finalProductionMode = loggabatInitialisedWithProductionMode.productionMode();

            expect(initialProductionMode).to.equal(true);
            expect(finalProductionMode).to.equal(false);
        })

    });

    describe("#logging", () => {

        const WARNING = "I am warned";
        const INFO = "I am informed";
        const LOG = "I am logged";
        const ERROR = "I am errored, Yikes!";

        it('should LOG when LoggaBat in testEnvironment, and pre-production function called', () => {

            const resultWithWarn = loggabatInitialisedWithTestMode.prod().warn(WARNING);
            const resultWithInfo = loggabatInitialisedWithTestMode.prod().info(INFO);
            const resultWithLog = loggabatInitialisedWithTestMode.prod().log(LOG);
            const resultWithError = loggabatInitialisedWithTestMode.prod().error(ERROR);

            expect(resultWithWarn.logged).to.equal(true);
            expect(resultWithWarn.type).to.equal(LoggaBatType.WARN);

            expect(resultWithInfo.logged).to.equal(true);
            expect(resultWithInfo.type).to.equal(LoggaBatType.INFO);

            expect(resultWithLog.logged).to.equal(true);
            expect(resultWithLog.type).to.equal(LoggaBatType.LOG);

            expect(resultWithError.logged).to.equal(true);
            expect(resultWithError.type).to.equal(LoggaBatType.ERROR);

        });

        it('should LOG when LoggaBat in testEnvironment, and pre-production function not called', () => {

            const resultWithWarn = loggabatInitialisedWithTestMode.warn(WARNING);
            const resultWithInfo = loggabatInitialisedWithTestMode.info(INFO);
            const resultWithLog = loggabatInitialisedWithTestMode.log(LOG);
            const resultWithError = loggabatInitialisedWithTestMode.error(ERROR);

            expect(resultWithWarn.logged).to.equal(true);
            expect(resultWithWarn.type).to.equal(LoggaBatType.WARN);

            expect(resultWithInfo.logged).to.equal(true);
            expect(resultWithInfo.type).to.equal(LoggaBatType.INFO);

            expect(resultWithLog.logged).to.equal(true);
            expect(resultWithLog.type).to.equal(LoggaBatType.LOG);

            expect(resultWithError.logged).to.equal(true);
            expect(resultWithError.type).to.equal(LoggaBatType.ERROR);

        });

        it('should NOT LOG when LoggaBat in productionEnvironment, and pre-production function not called', () => {

            const resultWithWarn = loggabatInitialisedWithProductionMode.warn(WARNING);
            const resultWithInfo = loggabatInitialisedWithProductionMode.info(INFO);
            const resultWithLog = loggabatInitialisedWithProductionMode.log(LOG);
            const resultWithError = loggabatInitialisedWithProductionMode.error(ERROR);

            expect(resultWithWarn.logged).to.equal(false);
            expect(resultWithWarn.type).to.equal(LoggaBatType.WARN);

            expect(resultWithInfo.logged).to.equal(false);
            expect(resultWithInfo.type).to.equal(LoggaBatType.INFO);

            expect(resultWithLog.logged).to.equal(false);
            expect(resultWithLog.type).to.equal(LoggaBatType.LOG);

            expect(resultWithError.logged).to.equal(false);
            expect(resultWithError.type).to.equal(LoggaBatType.ERROR);

        });

        it('should NOT LOG when LoggaBat in productionEnvironment, and pre-production function called', () => {

            const resultWithWarn = loggabatInitialisedWithProductionMode.prod().warn(WARNING);
            const resultWithInfo = loggabatInitialisedWithProductionMode.prod().info(INFO);
            const resultWithLog = loggabatInitialisedWithProductionMode.prod().log(LOG);
            const resultWithError = loggabatInitialisedWithProductionMode.prod().error(ERROR);

            expect(resultWithWarn.logged).to.equal(true);
            expect(resultWithWarn.type).to.equal(LoggaBatType.WARN);

            expect(resultWithInfo.logged).to.equal(true);
            expect(resultWithInfo.type).to.equal(LoggaBatType.INFO);

            expect(resultWithLog.logged).to.equal(true);
            expect(resultWithLog.type).to.equal(LoggaBatType.LOG);

            expect(resultWithError.logged).to.equal(true);
            expect(resultWithError.type).to.equal(LoggaBatType.ERROR);

        });

        it('should LOG in a combined and dynamic environment', () => {

            const resultWithWarn = loggabat.prod().warn(WARNING);

            loggabat.setProductionEnvironment();
            const resultWithInfo = loggabat.prod().info(INFO);

            loggabat.setTestEnvironment();
            const resultWithError = loggabat.error(ERROR);


            expect(resultWithWarn.logged).to.equal(true);
            expect(resultWithWarn.type).to.equal(LoggaBatType.WARN);

            expect(resultWithInfo.logged).to.equal(true);
            expect(resultWithInfo.type).to.equal(LoggaBatType.INFO);

            expect(resultWithError.logged).to.equal(true);
            expect(resultWithError.type).to.equal(LoggaBatType.ERROR);
        });
	
		it ( 'should LOG with a prefix set to it' , () => {
			
			loggabatInitialisedWithStringPrefix.warn(WARNING);
			loggabatInitialisedWithNumberPrefix.info(INFO);
			
			expect(loggabatInitialisedWithStringPrefix.getHistory()).to.have.length(1);
			expect(loggabatInitialisedWithNumberPrefix.getHistory()).to.have.length(1);
			
		} )
    
    });

    describe("#getHistory", () => {

        it('should get all items that have been logged', () => {

            const firstMessage = "Bambi";
            const secondMessage = "Migdalia";

            let history = loggabat.getHistory();
            expect(history).to.be.an('array');

            loggabat.log(firstMessage);
            history = loggabat.getHistory();
            expect(history).to.have.length(1);
            expect(history).to.contain(firstMessage);

            loggabat.log(secondMessage);
            history = loggabat.getHistory();
            expect(history).to.have.length(2);
            expect(history).to.contain(secondMessage);

        })

    });

    describe("#resetHistory", () => {

        it('should clear previously stored data (or History) from the LoggaBat Instance', () => {

            const firstMessage = "Bambi";
            const secondMessage = "Migdalia";

            let history = loggabat.getHistory();
            expect(history).to.be.an('array');
            expect(history).to.have.length(0);


            loggabat.log(firstMessage);
            history = loggabat.getHistory();
            expect(history).to.have.length(1);

            loggabat.resetHistory();
            history = loggabat.getHistory();
            expect(history).to.have.length(0);

        })


    });

});
