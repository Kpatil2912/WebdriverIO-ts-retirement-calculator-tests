import { browser } from '@wdio/globals'
import { ChainablePromiseElement } from 'webdriverio';

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export class Page {

    protected async open(path: string): Promise<this> {
        await browser.url(`${path}`);
        return this;
    }

    async setElementValue(
      element: ChainablePromiseElement,
      value: string,
    ): Promise<void> {
      try {
        await element.waitForEnabled({ timeout: 5000 });
        await element.waitForClickable({ timeout: 5000 });
        await element.scrollIntoView({ block: 'center' });
        await element.click();
        await element.clearValue(); // Optional: clear previous value
        await element.setValue(value);
      } catch (error) {
        console.error(`Error setting value for element: ${error}`);
        throw error; // Re-throw the error after logging
      }
    }
    async clickWhenVisible(
        element: ChainablePromiseElement,
        timeout = 10000
    ): Promise<void> {
        await element.moveTo();
        await element.scrollIntoView({ block: 'center' });
        await element.waitForDisplayed({ timeout });
        await element.waitForClickable({ timeout });
        await element.click();
        
    }

    async  waitForPageLoad(timeout = 10000) {
        await browser.waitUntil(
          async () => (await browser.execute(() => document.readyState)) === 'complete',
          {
            timeout,
            timeoutMsg: 'Page did not finish loading in time'
          }
        );
      }
      

}
