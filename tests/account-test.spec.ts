import { test, expect } from '@playwright/test';
import * as loginPage from '../pages/login-page';
import * as accountPage from '../pages/account-page';
import { user, accountNumber } from "../resource/test-data";

test.only("User should be able to transfer money in your Online Banking Account", async ({page: page}) => {
    await test.step("Sign In with user credentials", async () => {
        await loginPage.signInAccount(page, user.username, user.password);
        await expect(page.getByText('Welcome to Altoro Mutual Online.')).toBeVisible();
    });

    await test.step("Transfer some Money to another account", async () => {
        await accountPage.transferFundsFromOneAccountToAnother(page, accountNumber.Checking, accountNumber.Savings);
    });

});