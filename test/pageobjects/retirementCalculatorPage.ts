import { ChainablePromiseElement } from 'webdriverio';
import { Page } from './page';
import { RetirementCalculatorInputDao } from '../daoLayer/inputDao/retirementCalculatorInputDao';
import logger from "../util/logger";
import allureReporter from '@wdio/allure-reporter';

export default class RetirementCalculatorPage extends Page {
    
    private currentAge(): ChainablePromiseElement {
        return $("#current-age");
    }
    private retirementAge(): ChainablePromiseElement {
        return $("#retirement-age");
    }
    private currentAnnualIncome() : ChainablePromiseElement{
        return $("#current-income");
    }
     private spouseAnnualIncome(): ChainablePromiseElement {
        return $("#spouse-income");
    }
    private currentTotalSaving(): ChainablePromiseElement {
        return $("#current-total-savings");
    }
    private currentAnnualSaving(): ChainablePromiseElement {
        return $("#current-annual-savings");
    }
    private savingsIncreaseRate(): ChainablePromiseElement {
        return $("#savings-increase-rate");
    }
    private socialBenefitsRadioButton(option :string): ChainablePromiseElement {
        return $(`//label[@for="${option}-social-benefits"]`);
    }
    private maritalStatusRadioButton(option :string): ChainablePromiseElement {
        return $(`//label[@for="${option}"]`);
    }
    private socialSecurityOverride(): ChainablePromiseElement {
        return $("#social-security-override");
    }
    private calculateButton(): ChainablePromiseElement {
        return $("//button[@data-tag-id='submit']");
    }
    private acceptCookiesButton(): ChainablePromiseElement {
        return $("//button[text()='Accept all cookies']");
    }
    private resultsChartGrapth(): ChainablePromiseElement {
        return $("#results-chart");
    }
    private resultsHeader(): ChainablePromiseElement {
        return $(`//h3[text()='Results']`);
    }
    private calculatorInputAlert(): ChainablePromiseElement {
        return $(`#calculator-input-alert-desc`);
    }
    private retirementCalculatorPageutl: string = 'insights-tools/retirement-calculator.html';
    
    public async fillForm(retirementCalculatorInputDao: RetirementCalculatorInputDao) : Promise<this> {
        logger.info("Filling the retirement calculator form with provided input data.");
        allureReporter.startStep('Filling the retirement calculator form with valid data');
        await this.setElementValue(this.currentAge(), retirementCalculatorInputDao.getCurrentAge());
        await this.setElementValue(this.retirementAge(), retirementCalculatorInputDao.getRetirementAge());
        await this.setElementValue(this.currentAnnualIncome(), retirementCalculatorInputDao.getCurrentIncome());
        await this.setElementValue(this.spouseAnnualIncome(), retirementCalculatorInputDao.getSpouseIncome());
        await this.setElementValue(this.currentTotalSaving(), retirementCalculatorInputDao.getSavings());
        await this.setElementValue(this.currentAnnualSaving(), retirementCalculatorInputDao.getContribution());
        await this.setElementValue(this.savingsIncreaseRate(), retirementCalculatorInputDao.getIncreaseRate());

        //await this.clickWhenVisible(this.socialBenefitsRadioButton(retirementCalculatorInputDao.getSocialSecurityBenfits()));
        await this.clickOnSocialBenefitsRadioButton(retirementCalculatorInputDao);
        
        await this.clickWhenVisible(this.maritalStatusRadioButton(retirementCalculatorInputDao.getMaritalStatus()));


        await this.setElementValue(this.socialSecurityOverride(), retirementCalculatorInputDao.getSocialSecurityOverride());


        logger.info("Form filled.");   
        allureReporter.endStep();
        return this
    }

    public async clickOnCalculate() :Promise<this> {
        await this.clickWhenVisible( this.calculateButton());
        return this;
    }
    public async clickOnSocialBenefitsRadioButton(retirementCalculatorInputDao: RetirementCalculatorInputDao) :Promise<this> {
        await this.clickWhenVisible(this.socialBenefitsRadioButton(retirementCalculatorInputDao.getSocialSecurityBenfits()));
        return this;
    }
    public async clickOnNoSocialBenefitsRadioButton(retirementCalculatorInputDao: RetirementCalculatorInputDao) :Promise<this> {
        await this.clickWhenVisible(this.socialBenefitsRadioButton(retirementCalculatorInputDao.getNoSocialSecurityBenfits()));
        return this;
    }
    public async isCanvasVisible(): Promise<boolean> {
        return await this.isVisible(this.resultsChartGrapth());
    }
    public async isOverrideVisible(): Promise<boolean> {
        return await this.isVisible(this.socialSecurityOverride());
    }

    // public async isOverrideVisible(): Promise<boolean> {
    //     try {
    //         await this.socialSecurityOverride().scrollIntoView({ block: 'center' });
    //       await this.socialSecurityOverride().waitForDisplayed();
    //       return await this.socialSecurityOverride().isDisplayed();
    //     } catch (error) {
    //       return false; // Return false if element is not displayed
    //     }
    //   }


    public async isResultHeaderVisible(): Promise<boolean> {
        return await this.isVisible(this.resultsHeader());
    }
    public async isInputAlertVisible(): Promise<boolean> {
        return await this.isVisible(this.calculatorInputAlert());
    }
    public async getInputAlertText(): Promise<string> {
        return  await this.getElementText(this.calculatorInputAlert()); 
    }

    public async openURL(): Promise<this> {
        logger.info("Opening the Retirement Calculator URL.");
        await this.open(this.retirementCalculatorPageutl);
        logger.info("Retirement Calculator URL opened successfully.");
        return this;
    }
    public async acceptCookiesIfPresent(): Promise<void> {
        logger.info("Checking for cookie banner.");
        try {
            const isButtonExisting = await this.acceptCookiesButton().isExisting();
            if (isButtonExisting) {
                const isButtonDisplayed = await this.acceptCookiesButton().isDisplayed();
                if (isButtonDisplayed) {
                    await this.acceptCookiesButton().click();
                    logger.info("Cookies accepted successfully.");
                } else {
                    logger.info("Cookie banner button exists but is not visible.");
                }
            } else {
                logger.info("No cookie banner found.");
            }
        } catch (error) {
            logger.warn("Error while checking or interacting with the cookie banner: ", error);
        }
    }

    public async acceptCookies(): Promise<void> {
        try {
          await this.acceptCookiesButton().waitForDisplayed({ timeout: 1000 });
          await this.acceptCookiesButton().click();
          // Optional: Wait for popup to disappear
          await this.acceptCookiesButton().waitForDisplayed({ timeout: 1000, reverse: true });
        } catch (error) {
          if (error instanceof Error) {
              console.log('Cookie popup not found or already accepted:', error.message);
          } else {
              console.log('Cookie popup not found or already accepted:', error);
          }
        }
      }
}