beforeAll(() => {
    console.log("run before all test")
})
afterAll(() => {
    console.log("run after all test")
})
afterEach(() => {
    console.log("run after each test")
})


beforeEach(() => {
    console.log("run before each test")
})



describe("Auth", () => {
    it("test", () => { });
    it("test2", () => { });
});

describe("Product", () => {
    it("test", () => { });
    it("test2", () => { });
});
test("hello", () => { });