import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export class Page {

    protected async open(path: string): Promise<this> {
        await browser.url(`${path}`);
        return this;
    }
}
