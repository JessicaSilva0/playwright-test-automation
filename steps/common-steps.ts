import {Page, test } from "@playwright/test";

export async function clickLink(page: Page, linkName: string){
    await test.step(`Click on the button '${linkName}'`, async () => {
        await page.getByRole('link', { name: linkName }).click();
    });
}
export async function pressButton(page: Page, buttonName: string){
    await test.step(`Click on the button '${buttonName}'`, async () => {
        await page.getByRole('button', { name: buttonName, exact: true }).click();
    });
}