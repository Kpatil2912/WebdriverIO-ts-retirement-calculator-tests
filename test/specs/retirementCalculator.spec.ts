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

    // Data Controller Layer
    const retirementCalculatorInputDao: RetirementCalculatorInputDao = 
    new RetirementCalculatorInputDao(validRetirementFormData);

    // Page Objects Layer
    const retirementCalculatorPage: RetirementCalculatorPage = new RetirementCalculatorPage();

    beforeAll(async () => {
        await retirementCalculatorPage.openURL();
        await retirementCalculatorPage.acceptCookies();
    });

    beforeEach(async () => { await retirementCalculatorPage.openURL();  });
        
    it('Should submit form with all required fields filled', async () => {
        //Report Setup
        logger.info('Test case started: should submit form with all required fields filled');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: should submit form with all required fields filled');

        // Test Logic
        await (await retirementCalculatorPage.fillFormRequired(retirementCalculatorInputDao)).clickOnCalculate();

        //Verification Layer
        allureReporter.startStep('Validating the results');
        expect(await retirementCalculatorPage.isCanvasVisible()).toBeTrue(); 
        expect(await retirementCalculatorPage.isResultHeaderVisible()).toBeTrue(); 
        
        allureReporter.endStep();
        logger.info('Test case completed successfully: should submit form with all required fields filled');        
    });

    it('User should be able to submit form with all fields filled in', async () => {
         //Report Setup
        logger.info('Test case started: User should be able to submit form with all fields filled in');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: User should be able to submit form with all fields filled in');

        // Test Logic
        await (await retirementCalculatorPage.fillForm(retirementCalculatorInputDao)).clickOnCalculate();

        // Verification Layer
        allureReporter.startStep('Validating the results');
        expect(await retirementCalculatorPage.isCanvasVisible()).toBeTrue(); 
        expect(await retirementCalculatorPage.isResultHeaderVisible()).toBeTrue(); 

        allureReporter.endStep();
        logger.info('Test case completed successfully: User should be able to submit form with all fields filled in');        
    });


    it('Should display error when submitting form without filling required fields', async () => {
         //Report Setup
        logger.info('Test case started: should display error when submitting form without filling required fields');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: should display error when submitting form without filling required fields');

        // // Test Logic
        await retirementCalculatorPage.clickOnCalculate();

        // Verification Layer
        allureReporter.startStep('Validating the error messages');
        expect(await retirementCalculatorPage.isInputAlertVisible()).toBeTrue();
        expect(await retirementCalculatorPage.getInputAlertText()).toContain(validationRetirementFormData.inputAlertDesc);

        allureReporter.endStep();
        logger.info('Test case completed successfully: should display error when submitting form without filling required fields');
    });

    it('should hide Social Security Override input when toggle is set to No', async () => {
         //Report Setup
        logger.info('Test case started: should hide Social Security Override input when toggle is No');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: should hide Social Security Override input when toggle is No');

        // Test Logic
        await retirementCalculatorPage.clickOnNoSocialBenefitsRadioButton(retirementCalculatorInputDao); 
        const isVisible = await retirementCalculatorPage.isOverrideVisible();

        // Verification Layer
        allureReporter.startStep('Validating that Social Security Override input is hidden');
        console.log(retirementCalculatorPage.isOverrideVisible());
        expect(isVisible).toBeFalse();

        allureReporter.endStep();
        logger.info('Test case completed successfully: should hide Social Security Override input when toggle is No');
    });

    it('should show Social Security Override input when toggle is set to Yes', async () => {
         //Report Setup
        logger.info('Test case started: should show Social Security Override input when toggle is Yes');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: should show Social Security Override input when toggle is Yes');

        // Test Logic
        await retirementCalculatorPage.clickOnSocialBenefitsRadioButton(retirementCalculatorInputDao); 
        const isVisible = await retirementCalculatorPage.isOverrideVisible();

        // Verification Layer
        allureReporter.startStep('Validating that Social Security Override input is visible');
        expect(isVisible).toBeTrue();

        allureReporter.endStep();
        logger.info('Test case completed successfully: should show Social Security Override input when toggle is Yes');
    });

    it('should show error if Current Age is empty', async () => {
         //Report Setup
        logger.info('Test case started: should show error if Current Age is empty');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: should show error if Current Age is empty');

        // Test Logic
        await retirementCalculatorPage.setEmptyCurrentAge(retirementCalculatorInputDao);
        await retirementCalculatorPage.clickOnCalculate();

        // Verification Layer
        allureReporter.startStep('Validating the error message for empty Current Age');
        const isVisible = await retirementCalculatorPage.isInvalidCurrentAgeErrorVisible();
        expect(isVisible).toBeTrue();

        allureReporter.endStep();
        logger.info('Test case completed successfully: should show error if Current Age is empty');
    });

    it('should show error if Retirement Age is less than Current Age', async () => {
         //Report Setup
        logger.info('Test case started: should show error if Retirement Age is less than or equal to Current Age');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: should show error if Retirement Age is less than or equal to Current Age');

        // Test Logic
        await retirementCalculatorPage.setLessRetirementAge(retirementCalculatorInputDao);
        await retirementCalculatorPage.clickOnCalculate();

        // Verification Layer
        allureReporter.startStep('Validating the error message for invalid Retirement Age');
        expect(await retirementCalculatorPage.isInvalidRetirementAgeError()).toBeTrue();
        expect(await retirementCalculatorPage.getInvalidRetirementAgeError()).toContain(validationRetirementFormData.retirementAgeAlertDEsc);

        allureReporter.endStep();
        logger.info('Test case completed successfully: should show error if Retirement Age is less than or equal to Current Age');
    });

    it('should show error if Retirement Age is equal to Current Age', async () => {
         //Report Setup
        logger.info('Test case started: should show error if Retirement Age is less than or equal to Current Age');
        allureReporter.addStory('Form Validation');
        allureReporter.addSeverity('critical');
        allureReporter.startStep('Test case started: should show error if Retirement Age is less than or equal to Current Age');

        // Test Logic
        await retirementCalculatorPage.setEqualRetirementAge(retirementCalculatorInputDao);
        await retirementCalculatorPage.clickOnCalculate();

        // Verification Layer
        allureReporter.startStep('Validating the error message for invalid Retirement Age');
       expect(await retirementCalculatorPage.isInvalidRetirementAgeError()).toBeTrue();
        expect(await retirementCalculatorPage.getInvalidRetirementAgeError()).toContain(validationRetirementFormData.retirementAgeAlertDEsc);

        allureReporter.endStep();
        logger.info('Test case completed successfully: should show error if Retirement Age is less than or equal to Current Age');
    });

    it('should allow user to update default calculator values and submit form', async () => {
         //Report Setup
          logger.info('Test case started: should allow user to update default calculator values');
          allureReporter.addStory('Form Submission');
          allureReporter.addSeverity('critical');
          allureReporter.startStep('Test case started: should allow user to update default calculator values');
      
          // Test Logic
            await retirementCalculatorPage.fillDefaultValues(retirementCalculatorInputDao);
            await retirementCalculatorPage.clickDefaultValuesSaveChnagesButton();
            await (await retirementCalculatorPage.fillFormRequired(retirementCalculatorInputDao)).clickOnCalculate();

          // Update values and submit
          allureReporter.startStep('Updating values and submitting form');
          allureReporter.endStep();
      
          // Verification Layer
          allureReporter.startStep('Validating the results');
          expect(await retirementCalculatorPage.isCanvasVisible()).toBeTrue(); 
          expect(await retirementCalculatorPage.isResultHeaderVisible()).toBeTrue(); 

          allureReporter.endStep();
          logger.info('Test case completed successfully: should allow user to update default calculator values');
    });

});
