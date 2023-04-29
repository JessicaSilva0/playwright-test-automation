import {Page, test} from "@playwright/test";
import * as loginStep from '../steps/common-steps';
import * as homePage from '../pages/home-page';

export async function inputCredentials(
    loginPage: Page,
    username: string,
    password: string)
{
    await test.step("input user credentials", async () => {
        await test.step(`input user: '${username}' and pswd:'${password}'`, async () => {
            await loginPage.locator("#uid").type(username);
            await loginPage.locator("#passw").type(password);
        });
    });
    await loginStep.pressButton(loginPage, 'Login');
}

export async function signInAccount(page: Page, username: string, password: string){
    await test.step("Open Banking and Login on Account", async () => {
        await homePage.goToBanking(page);
        await homePage.goToLoginPage(page);
        await inputCredentials(page, username, password);
    });
}

export async function signOffAccount(loginPage: Page){
    await test.step("Click on Sign Off Account", async () => {
        await loginStep.clickLink(loginPage, "Sign Off");
    });
}