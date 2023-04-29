import { test, expect } from '@playwright/test';
import * as loginPage from '../pages/login-page';
import * as accountPage from '../pages/account-page';
import { user } from "../resource/test-data";

test.only("user should be able to use your Online Banking Account", async ({page: page}) => {
    await test.step("Sign In with user credentials", async () => {
        await loginPage.signInAccount(page, user.username, user.password);
        await expect(page.getByText('Welcome to Altoro Mutual Online.')).toBeVisible();
    });
/*    await test.step("Select Account Details", async () => {
        await accountPage.chooseAccount(page, "Checking");
        await accountPage.goToTransferFunds(page);
        await accountPage.selectTransferFromAccount(page, "800003");
        await accountPage.selectTransferToAccount(page, "800002");
        await accountPage.typeAmountToTransfer(page);
    });

 */
    await test.step("Transfer some Money to another account", async () => {
        await accountPage.transferFundsFromOneAccountToAnother(page, "800003");
    });

});