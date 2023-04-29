import { Page, test, expect } from '@playwright/test';
import * as homePage from '../pages/home-page';
import * as loginPage from '../pages/login-page';
import {user, adminUser} from '../resource/test-data';

test.describe("Access Online Banking Account", async () => {
    test("Sign In with user client successfully", async ({page: page, browser: Browser}) => {
        await test.step("User should Sign In your Online Banking Account", async () => {
            await homePage.goToBanking(page);
            await homePage.goToLoginPage(page);
            await loginPage.inputCredentials(page, user.username, user.password);
            await expect(page.getByText('Hello John Smith Welcome to Altoro Mutual Online.')).toBeVisible();
        });

    });
    test("Sign In with user Admin successfully", async ({page: page, browser: Browser}) => {
        await test.step("Admin operator should Sign In your Online Banking Account", async () => {
            await homePage.goToBanking(page);
            await homePage.goToLoginPage(page);
            await loginPage.inputCredentials(page, adminUser.username, adminUser.password);
            await expect(page.getByText('Welcome to Altoro Mutual Online.')).toBeVisible();
        });
    });
    test("Sign Off successfully", async ({page: page, browser: Browser}) => {
        await test.step("Admin operator should Sign Off your Online Banking Account", async () => {
            await loginPage.signInAccount(page, adminUser.username, adminUser.password);
            await expect(page.getByText('Welcome to Altoro Mutual Online.')).toBeVisible();
            await loginPage.signOffAccount(page);
            await expect(page.getByRole('link', {name: 'Sign In'})).toBeVisible();
        });
    });
});