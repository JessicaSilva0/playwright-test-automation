import { expect, test } from "@playwright/test";

test("Should login via API", async ({request}) => {
    const response = await request.post('/login', {
        data: {
            username: 'jsmith',
            password: 'demo1234',
        }
    });
    expect(response.ok());
});

test("Should transfer money via API", async ({request}) => {
    const response = await request.post('/transfer', {
        data: {
            toAccount: "800002",
            fromAccount: "800003",
            transferAmount: "50"
        }
    });
    expect(response.ok());
});