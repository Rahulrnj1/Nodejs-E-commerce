

function getData() {
    throw new Error("Not found");

}
test("get Data", () => {
    expect(() => getData()).toThrow("Not found");
});