import { browser } from '@wdio/globals'
import { ChainablePromiseElement } from 'webdriverio';

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export class Page {

  // Opens a specific URL path
  protected async open(path: string): Promise<this> {
    await browser.url(`${path}`);
    return this;
  }

  // Sets the value of an input element
  async setElementValue(
    element: ChainablePromiseElement,
    value: string,
  ): Promise<void> {
    try {
    await element.waitForEnabled({ timeout: 5000 });
    await element.waitForClickable({ timeout: 5000 });
    await element.scrollIntoView({ block: 'center' });
    await element.click();
    await element.clearValue(); 
    await element.setValue(value);
    } catch (error) {
    console.error(`Error setting value for element: ${error}`);
    throw error; 
    }
  }
  
  // Clicks an element when it becomes visible and clickable
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
  async isVisible(
    element: ChainablePromiseElement,
  ): Promise<boolean> {
    await element.scrollIntoView({ block: 'center' });
    await element.waitForDisplayed({ });
    return await element.isDisplayed();
  }


// Retrieves the text content of an element
  async getElementText(element: ChainablePromiseElement): Promise<string> {
    try {
      await element.waitForDisplayed({ timeout: 5000 });
      await element.scrollIntoView({ block: 'center' });
      return await element.getText();
    } catch (error) {
      console.error(`Error retrieving text from element: ${error}`);
      throw error;
    }
  }

  // Waits for the page to fully load
  async waitForPageLoad(timeout = 10000) {
    await browser.waitUntil(
      async () => (await browser.execute(() => document.readyState)) === 'complete',
      {
      timeout,
      timeoutMsg: 'Page did not finish loading in time'
      }
    );
    }
}
