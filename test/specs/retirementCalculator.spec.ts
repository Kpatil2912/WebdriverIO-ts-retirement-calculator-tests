import RetirementCalculatorPage from "../pageobjects/retirementCalculatorPage";
import * as path from 'path';
import { getTestData } from "../util/fileUtil";
import { RetirementFormDataLayer } from "../dataLayer/retirementFormDataLayer";
import { RetirementCalculatorInputDao } from "../daoLayer/inputDao/retirementCalculatorInputDao";
import logger from "../util/logger";

describe('Retirement Calculator - Form Validation Tests', () => {

    it('should submit form with all required fields filled', async () => {
        logger.info('Test case started: should submit form with all required fields filled');

        try {
            // Test Data
            logger.info('Fetching test data from file');
            const testDataFilePath = path.join(process.cwd(), "/test/testData/testData.json");
            const retirementFormData = getTestData(testDataFilePath, "retirementFormData");
            const validRetirementFormData: RetirementFormDataLayer = retirementFormData["validData"];
            logger.info('Test data successfully fetched and parsed');

            // Data Layer
            logger.info('Initializing RetirementCalculatorInputDao with valid test data');
            const retirementCalculatorInputDao: RetirementCalculatorInputDao = new RetirementCalculatorInputDao(validRetirementFormData);

            // Page Objects
            logger.info('Initializing RetirementCalculatorPage');
            const retirementCalculatorPage: RetirementCalculatorPage = new RetirementCalculatorPage();

            // Test Logic
            logger.info('Opening Retirement Calculator URL');
            await (await retirementCalculatorPage.openURL()).acceptCookiesIfPresent();
            logger.info('Cookies accepted if present');

            logger.info('Filling the retirement calculator form with valid data');
            await retirementCalculatorPage.fillForm(retirementCalculatorInputDao);

            logger.info('Form filled successfully. Proceeding with further test logic');
            // Add further assertions based on expected outcome
            // e.g., expect($('.result')).toBeExisting();

            logger.info('Test case completed successfully: should submit form with all required fields filled');
            
        } catch (error) {
            logger.error('An error occurred during the test execution', error);
            throw error; // Re-throw the error to ensure the test fails
        }
    });

});