import { test, expect } from '@playwright/test';
import * as loginPage from '../pages/login-page';
import * as accountPage from '../pages/account-page';
import { user, accountNumber } from "../resource/test-data";
import { faker } from "@faker-js/faker";

test.describe("Transfer Funds", async () => {
    test("User must be able to transfer money between their accounts", async ({page: page}) => {
        await test.step("Sign In with user credentials", async () => {
            await loginPage.signInAccount(page, user.username, user.password);
            await expect(page.getByText('Welcome to Altoro Mutual Online.')).toBeVisible();
        });

        await test.step("Transfer some Money to another account", async () => {
            const amount = faker.finance.amount()
            await accountPage.transferFundsFromOneAccountToAnother(page, accountNumber.Checking, accountNumber.Savings, amount);
            await expect(page.getByText("was successfully transferred from Account")).toBeVisible();
        });
    });

    test("User should not be able to transfer money to the same account", async ({page: page}) => {
        await test.step("Sign In with user credentials", async () => {
            await loginPage.signInAccount(page, user.username, user.password);
            await expect(page.getByText('Welcome to Altoro Mutual Online.')).toBeVisible();
        });

        await test.step("Transfer some Money to the same account", async () => {
            const amount = faker.finance.amount()
            await accountPage.goToTransferFunds(page);
            await accountPage.selectTransferFromAccount(page, "800003");
            await accountPage.selectTransferToAccount(page, "800003");
            await accountPage.typeAmountToTransfer(page, amount);
            await accountPage.clickTransferMoney(page);
        });
        await test.step("Wait for the transaction to be processed", async () => {
            page.once("dialog", (dialog) => {
                return dialog.message().match("From Account and To Account fields cannot be the same.");
            });
        });
    });

    test("User should not be able to transfer money without informing the amount", async ({page: page}) => {
        await test.step("Sign In with user credentials", async () => {
            await loginPage.signInAccount(page, user.username, user.password);
            await expect(page.getByText('Welcome to Altoro Mutual Online.')).toBeVisible();
        });

        await test.step("Transfer some Money to another account without amount", async () => {
            const amount = faker.finance.amount(0, 0);
            await accountPage.transferFundsFromOneAccountToAnother(page, accountNumber.CreditCard, accountNumber.Checking, amount);
        });

        await test.step("Wait for the transaction to be processed", async () => {
            page.once("dialog", (dialog) => {
                return dialog.message().match("Transfer Amount must be a number greater than 0.");
            });
        });
    });
});


