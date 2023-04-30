import { expect, Page, test } from "@playwright/test";
import * as step from '../steps/common-steps';
import { accountNumber } from "../resource/test-data";


export async function chooseAccount(accountPage: Page, accountName: string){
    await test.step(`View Account Details and Select account: '${accountName}'` , async () => {
        const listAccount = accountPage.locator('#listAccounts');
        switch (accountName){
            case "Savings":
                await listAccount.selectOption(accountNumber.Savings);
                break;
            case "Checking":
                await listAccount.selectOption(accountNumber.Checking);
                break;
            case "Credit Card":
                await listAccount.selectOption(accountNumber.CreditCard);
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

export async function selectTransferFromAccount(accountPage: Page, accountNumber: string){
    await test.step(`Transfer From account: ${accountNumber}`, async () => {
        await accountPage.locator('#fromAccount').selectOption(accountNumber);
    });
}

export async function selectTransferToAccount(accountPage: Page, accountNumber: string){
    await test.step(`Transfer To account: ${accountNumber}`, async () => {
        await accountPage.locator('#toAccount').selectOption(accountNumber);
    });
}

export async function typeAmountToTransfer(accountPage: Page, amount: string){
    await test.step(`enter the amount to be transferred: '${amount}'`, async () => {
        await accountPage.locator('#transferAmount').type(amount);
    });
}

export async function clickTransferMoney(accountPage: Page){
    await step.pressButton(accountPage, "Transfer Money");
}

export async function transferFundsFromOneAccountToAnother(accountPage: Page, accountFrom: string, accountTarget: string, amount: string){
    await goToTransferFunds(accountPage);
    await selectTransferFromAccount(accountPage, accountFrom);
    await selectTransferToAccount(accountPage, accountTarget);
    await typeAmountToTransfer(accountPage, amount);
    await clickTransferMoney(accountPage);
}

