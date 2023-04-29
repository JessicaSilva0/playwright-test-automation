import { expect, Page, test } from "@playwright/test";
import * as step from '../steps/common-steps';
import { faker } from '@faker-js/faker';

type accountNumber = '800002' | '800003' | '4539082039396288';

export async function chooseAccount(accountPage: Page, accountName: string){
    await test.step(`View Account Details and Select account: '${accountName}'` , async () => {
        const listAccount = accountPage.locator('#listAccounts');
        switch (accountName){
            case "Savings":
                await listAccount.selectOption('800002');
                break;
            case "Checking":
                await listAccount.selectOption('800003');
                break;
            case "Credit Card":
                await listAccount.selectOption('4539082039396288');
                break;
            case undefined: console.log("This account doesn't exist, please check again");
                break
        }
    });
    await step.pressButton(accountPage, "GO");
    await expect(accountPage.getByRole('heading', {name: "Account History"})).toBeVisible()
}

export async function goToTransferFunds(accountPage: Page){
    await test.step("Go to Transfer Funds", async () => {
        await step.clickLink(accountPage, "Transfer Funds");
    });
}

export async function selectTransferFromAccount(accountPage: Page, accountNumber: accountNumber){
    await test.step(`Transfer From account: ${accountNumber}`, async () => {
        await accountPage.locator('#fromAccount').selectOption(accountNumber);
    });
}

export async function selectTransferToAccount(accountPage: Page, accountNumber: accountNumber){
    await test.step(`Transfer To account: ${accountNumber}`, async () => {
        await accountPage.locator('#toAccount').selectOption(accountNumber);
    });
}

export async function typeAmountToTransfer(accountPage: Page){
    await test.step(`Amount to Transfer`, async () => {
        const amount = faker.finance.amount()
        await accountPage.locator('#transferAmount').type(amount);
    });
}

export async function clickTransferMoney(accountPage: Page){
    await step.pressButton(accountPage, "Transfer Money");
    await expect(accountPage.getByText("was successfully transferred from Account")).toBeVisible();
}

export async function transferFundsFromOneAccountToAnother(accountPage: Page, accountNumber: accountNumber){
    await goToTransferFunds(accountPage);
    await selectTransferFromAccount(accountPage, accountNumber);
    await selectTransferToAccount(accountPage, accountNumber);
    await typeAmountToTransfer(accountPage);
    await clickTransferMoney(accountPage);
}

