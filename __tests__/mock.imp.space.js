
test("mockImplementation", () => {
    const mockFn = jest.fn(() => "default").mockImplementation(() => "first call");
    const res1 = mockFn();
    const res2 = mockFn();


    console.log((res1));
    console.log((res2));

})
test("mockImplementationOnce", () => {
    const mockFn = jest
    .fn(() => "default")
    .mockImplementationOnce(() => "First call")
    .mockImplementationOnce(() => "Second call");

    const res1 = mockFn();
    const res2 = mockFn();
    const res3 = mockFn();


    console.log((res1));
    console.log((res2));
    console.log((res3));

})