import {Page, test} from '@playwright/test';
import * as step from '../steps/common-steps';

export async function goToBanking(homePage: Page){
        await test.step("Go to Online Banking", async () => {
            await homePage.goto('https://demo.testfire.net/index.jsp')
        });
}

export async function goToLoginPage(homePage: Page) {
        await test.step("Go to Login Page", async () => {
            await step.clickLink(homePage,"Sign In");
        });
}
