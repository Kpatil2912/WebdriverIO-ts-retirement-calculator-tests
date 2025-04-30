import RetirementCalculatorPage from "../pageobjects/retirementCalculatorPage";
import * as path from 'path';
import { getTestData } from "../util/fileUtil";
import { RetirementFormDataLayer } from "../dataLayer/retirementFormDataLayer";
import { RetirementCalculatorInputDao } from "../daoLayer/inputDao/retirementCalculatorInputDao";
import logger from "../util/logger";
import allureReporter from '@wdio/allure-reporter';

describe('Retirement Calculator - Form Validation Tests', () => {
    allureReporter.addFeature('Retirement Calculator');

    it('should submit form with all required fields filled', async () => {

        logger.info('Test case started: should submit form with all required fields filled');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: should submit form with all required fields filled');

            // Test Data
            const testDataFilePath = path.join(process.cwd(), "/test/testData/testData.json");
            const retirementFormData = getTestData(testDataFilePath, "retirementFormData");
            const validRetirementFormData: RetirementFormDataLayer = retirementFormData["validData"];

            // Data Layer
            const retirementCalculatorInputDao: RetirementCalculatorInputDao = new RetirementCalculatorInputDao(validRetirementFormData);

            // Page Objects
            const retirementCalculatorPage: RetirementCalculatorPage = new RetirementCalculatorPage();

            // Test Logic
            await (await retirementCalculatorPage.openURL()).acceptCookiesIfPresent();
            allureReporter.startStep('Filling the retirement calculator form with valid data');
            await(await retirementCalculatorPage.fillForm(retirementCalculatorInputDao)).clickOnCalculate();
            
            allureReporter.endStep();
            logger.info('Test case completed successfully: should submit form with all required fields filled');        
    });

});
