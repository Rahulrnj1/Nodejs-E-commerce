const crypto = require("crypto");

describe('Sample Test', () => {
    it('should test that true === true', () => {

        expect(true).toBe(true)
    })
})
test("null", () => {
    const i = null;

    expect.assertions(1);

    expect(i).toBenull;
    expect(i).toBeDefined();

});

async function getData() {
    console.log(crypto.randomBytes(20))
    return crypto.randomBytes(20);
}
getData;
module.exports = {
    getData,
};

beforeEach(() => {
    console.log("run before each test")
})