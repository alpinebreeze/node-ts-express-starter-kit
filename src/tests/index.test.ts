const mockServer = { start: jest.fn() };

jest.mock("../server", () => ({ default: mockServer }));

it("should call server.start with process.argv minus the first 2 args", () => {

    const argv = process.argv;
    const expectedArgs = ["--port", "8001"];
    process.argv = ["node", "test.js", ...expectedArgs];
    require("../");
    expect(mockServer.start).toBeCalledWith(expectedArgs);
    process.argv = argv;
});
