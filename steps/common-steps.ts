import {Page, test } from "@playwright/test";

export async function clickButton(page: Page, buttonName: string){
    await test.step(`Click on the button '${buttonName}'`, async () => {
        await page.getByRole('link', { name: buttonName }).click();
    });
}
export async function pressButton(page: Page, buttonName: string){
    await test.step(`Click on the button '${buttonName}'`, async () => {
        await page.getByRole('button', { name: buttonName }).click();
    });
}