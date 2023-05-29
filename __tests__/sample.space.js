const crypto = require("crypto");

const { getData } = require("../sample.test")

jest.mock("crypto")

test("Fetch Data", async () => {

    crypto.randomBytes.mockReturnValueOnce("bytes");
    const res = await getData();
    console.log(res);
})