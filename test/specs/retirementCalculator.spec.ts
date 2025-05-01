import RetirementCalculatorPage from "../pageobjects/retirementCalculatorPage";
import * as path from 'path';
import { getTestData } from "../util/fileUtil";
import { RetirementFormDataLayer } from "../dataLayer/retirementFormDataLayer";
import { RetirementCalculatorInputDao } from "../daoLayer/inputDao/retirementCalculatorInputDao";
import logger from "../util/logger";
import allureReporter from '@wdio/allure-reporter';

describe('Retirement Calculator - Form Validation Tests', () => {
    
    allureReporter.addFeature('Retirement Calculator');
    
    // Test Data Layer
    const testDataFilePath = path.join(process.cwd(), "/test/testData/testData.json");
    const retirementFormData = getTestData(testDataFilePath, "retirementFormData");
    const validRetirementFormData: RetirementFormDataLayer = retirementFormData["validData"];
    const validationRetirementFormData = retirementFormData["validData"];

    console.log(validationRetirementFormData.inputAlertDesc);

    // Data Controller Layer
    const retirementCalculatorInputDao: RetirementCalculatorInputDao = 
    new RetirementCalculatorInputDao(validRetirementFormData);

    // Page Objects Layer
    const retirementCalculatorPage: RetirementCalculatorPage = new RetirementCalculatorPage();
    
    // beforeAll(async () => {
    //     await (await retirementCalculatorPage.openURL()).acceptCookiesIfPresent();
    // });

    it('Should submit form with all required fields filled', async () => {

        logger.info('Test case started: should submit form with all required fields filled');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: should submit form with all required fields filled');

        // Test Logic
        await ((await retirementCalculatorPage.openURL()).acceptCookies());
        await (await retirementCalculatorPage.fillForm(retirementCalculatorInputDao)).clickOnCalculate();

        //Verification Layer
        allureReporter.startStep('Validating the results');
        expect(await retirementCalculatorPage.isCanvasVisible()).toBeTrue(); 
        expect(await retirementCalculatorPage.isResultHeaderVisible()).toBeTrue(); 
        allureReporter.endStep();

        logger.info('Test case completed successfully: should submit form with all required fields filled');        
    });

    it('Should display error when submitting form without filling required fields', async () => {

        logger.info('Test case started: should display error when submitting form without filling required fields');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: should display error when submitting form without filling required fields');

        // Test Logic
        await ((await retirementCalculatorPage.openURL()).acceptCookies());
        await retirementCalculatorPage.clickOnCalculate();

        // Verification Layer
        allureReporter.startStep('Validating the error messages');
        expect(await retirementCalculatorPage.isInputAlertVisible()).toBeTrue();
        expect(await retirementCalculatorPage.getInputAlertText()).toContain(validationRetirementFormData.inputAlertDesc);
        allureReporter.endStep();

        logger.info('Test case completed successfully: should display error when submitting form without filling required fields');
    });

    it('should hide Social Security Override input when toggle is No', async () => {
        logger.info('Test case started: should hide Social Security Override input when toggle is No');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: should hide Social Security Override input when toggle is No');

        // Test Logic
        await (await (await retirementCalculatorPage.openURL()).acceptCookies());
        await retirementCalculatorPage.clickOnNoSocialBenefitsRadioButton(retirementCalculatorInputDao); 
        const isVisible = await retirementCalculatorPage.isOverrideVisible();

        // Verification Layer
        allureReporter.startStep('Validating that Social Security Override input is hidden');
        console.log(retirementCalculatorPage.isOverrideVisible());
        expect(isVisible).toBeFalse();
        allureReporter.endStep();

        logger.info('Test case completed successfully: should hide Social Security Override input when toggle is No');
    });

    it('should show Social Security Override input when toggle is Yes', async () => {
        logger.info('Test case started: should show Social Security Override input when toggle is Yes');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: should show Social Security Override input when toggle is Yes');

        // Test Logic
        await (await retirementCalculatorPage.openURL()).acceptCookies();
        await retirementCalculatorPage.clickOnSocialBenefitsRadioButton(retirementCalculatorInputDao); 
        const isVisible = await retirementCalculatorPage.isOverrideVisible();

        // Verification Layer
        allureReporter.startStep('Validating that Social Security Override input is visible');
        expect(isVisible).toBeTrue();
        allureReporter.endStep();

        logger.info('Test case completed successfully: should show Social Security Override input when toggle is Yes');
    });
});
