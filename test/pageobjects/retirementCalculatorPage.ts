import { ChainablePromiseElement } from 'webdriverio';
import { Page } from './page';
import { RetirementCalculatorInputDao } from '../daoLayer/inputDao/retirementCalculatorInputDao';
import logger from "../util/logger";

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
    private retirementCalculatorPageutl: string = 'insights-tools/retirement-calculator.html';
    
    public async fillForm(retirementCalculatorInputDao: RetirementCalculatorInputDao) : Promise<this> {
        logger.info("Filling the retirement calculator form with provided input data.");
        await this.setElementValue(this.currentAge(), retirementCalculatorInputDao.getCurrentAge());
        await this.setElementValue(this.retirementAge(), retirementCalculatorInputDao.getRetirementAge());
        await this.setElementValue(this.currentAnnualIncome(), retirementCalculatorInputDao.getCurrentIncome());
        await this.setElementValue(this.spouseAnnualIncome(), retirementCalculatorInputDao.getSpouseIncome());
        await this.setElementValue(this.currentTotalSaving(), retirementCalculatorInputDao.getSavings());
        await this.setElementValue(this.currentAnnualSaving(), retirementCalculatorInputDao.getContribution());
        await this.setElementValue(this.savingsIncreaseRate(), retirementCalculatorInputDao.getIncreaseRate());

        await this.clickWhenVisible(this.socialBenefitsRadioButton(retirementCalculatorInputDao.getSocialSecurityBenfits()));
        await this.clickWhenVisible(this.maritalStatusRadioButton(retirementCalculatorInputDao.getMaritalStatus()));
        await this.setElementValue(this.socialSecurityOverride(), retirementCalculatorInputDao.getSocialSecurityOverride());

        logger.info("Form filled.");   
        return this
    }

    public async clickOnCalculate() :Promise<this> {
        await this.calculateButton().click();
        return this;
    }

    public async openURL(): Promise<this> {
        logger.info("Opening the Retirement Calculator URL.");
        await this.open(this.retirementCalculatorPageutl);
        logger.info("Retirement Calculator URL opened successfully.");
        await this.waitForPageLoad();
        return this;
    }

    public async acceptCookiesIfPresent() {
            logger.info("Checking for cookie banner.");
            if (await this.acceptCookiesButton().isExisting()) {
                await this.acceptCookiesButton().click();
                logger.info("Cookies accepted successfully.");
            } else {
                logger.info("No cookie banner found.");
            }
    }
}