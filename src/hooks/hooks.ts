import {Before,After,AfterAll,setDefaultTimeout} from '@cucumber/cucumber';
import { execSync } from 'child_process';
import {chromium,Browser,BrowserContext,Page} from '@playwright/test';

setDefaultTimeout(120000);

let browser: Browser;

Before(async function () {
    browser = await chromium.launch({
        headless: process.env.HEADLESS !== 'false'
    });

    const context: BrowserContext = await browser.newContext();

    this.context = context;
    this.page = await context.newPage();
});

After(async function (scenario) {

    if (scenario.result?.status === 'FAILED') {

        const screenshot = await this.page.screenshot({
            fullPage: true
        });

        await this.attach(
            screenshot,
            'image/png'
        );
    }

    if (browser) {
        await browser.close();
    }
});

AfterAll(async function () {

    try {
        execSync(
            'npx allure generate allure-results --clean -o allure-report',
            {
                stdio: 'inherit'
            }
        );

        console.log('\nAllure report successfully generated.\n');

    } catch (error) {

        console.error(
            '\nFailed to generate Allure report:',
            error
        );
    }
});