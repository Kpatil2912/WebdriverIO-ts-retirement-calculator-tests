import { browser } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';
import { step } from "@wdio/allure-reporter";
import { Page } from './page';
import { RetirementCalculatorInputDao } from '../daoLayer/inputDao/retirementCalculatorInputDao';
import logger from "../util/logger";

export default class RetirementCalculatorPage extends Page {

    private currentAge(): ChainablePromiseElement {
        return browser.$("#current-age");
    }
    private retirementAge(): ChainablePromiseElement {
        return browser.$("#retirement-age");
    }
    private currentAnnualIncome(): ChainablePromiseElement {
        return browser.$("#current-income");
    }
    private spouseAnnualIncome(): ChainablePromiseElement {
        return browser.$("#spouse-income");
    }
    private acceptCookiesButton(): ChainablePromiseElement {
        return browser.$("//button[text()='Accept all cookies']");
    }

    public async fillForm(retirementCalculatorInputDao: RetirementCalculatorInputDao) {
        logger.info("Filling the retirement calculator form with provided input data.");
        try {
            logger.debug(`Setting current age: ${retirementCalculatorInputDao.getCurrentAge()}`);
            await this.currentAge().setValue(retirementCalculatorInputDao.getCurrentAge());

            logger.debug(`Setting retirement age: ${retirementCalculatorInputDao.getRetirementAge()}`);
            await this.retirementAge().setValue(retirementCalculatorInputDao.getRetirementAge());

            logger.debug(`Setting current annual income: ${retirementCalculatorInputDao.getCurrentIncome()}`);
            await this.currentAnnualIncome().setValue(retirementCalculatorInputDao.getCurrentIncome());

            logger.debug(`Setting spouse annual income: ${retirementCalculatorInputDao.getSpouseIncome()}`);
            await this.spouseAnnualIncome().setValue(retirementCalculatorInputDao.getSpouseIncome());

            logger.info("Form filled successfully.");
        } catch (error) {
            logger.error("Error occurred while filling the form.", error);
            throw error;
        }
    }

    public async openURL(): Promise<this> {
        logger.info("Opening the Retirement Calculator URL.");
        await step("User Opens the Retirement Calculator URL", async (step) => {
            try {
                await super.open("insights-tools/retirement-calculator.html");
                logger.info("Retirement Calculator URL opened successfully.");
            } catch (error) {
                logger.error("Error occurred while opening the Retirement Calculator URL.", error);
                throw error;
            }
        });
        return this;
    }

    public async acceptCookiesIfPresent() {
        logger.info("Checking for cookie banner.");
        try {
            if (await this.acceptCookiesButton().isExisting()) {
                logger.info("Cookie banner found. Accepting cookies.");
                await this.acceptCookiesButton().click();
                logger.info("Cookies accepted successfully.");
            } else {
                logger.info("No cookie banner found.");
            }
        } catch (error) {
            logger.error("Error occurred while handling the cookie banner.", error);
            throw error;
        }
    }
}