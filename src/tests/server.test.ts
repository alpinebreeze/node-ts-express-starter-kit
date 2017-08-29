const mockListen = jest.fn((port, callback) => {
    callback();
});

jest.mock("express", () => jest.fn(() => ({
    listen: mockListen,
    use: jest.fn(),
})));

jest.mock("../router", () => ({ default: jest.fn() }));

import server from "../server";

let tempConsoleLog: any;
const mockLog = jest.fn();

beforeAll(() => {
    tempConsoleLog = console.log;
    console.log = mockLog;
});

beforeEach(() => {
    mockListen.mockClear();
    mockLog.mockClear();
});

afterAll(() => {
    console.log = tempConsoleLog;
});

it("should listen on port 8000 when no args are passed", () => {

    server.start();
    expect(mockListen.mock.calls[0][0]).toBe(8000);
});

it("should listen on port 8001 when --port 8001 is set in args", () => {

    server.start(["--port", "8001"]);
    expect(mockListen.mock.calls[0][0]).toBe(8001);
});

it("should log 'test server listening on port 8000' when NODE_ENV is set to test", () => {

    server.start();
    expect(mockLog).toBeCalledWith("test server listening on port 8000");
});

it("should log 'development server listening on port 8000' when NODE_ENV is falsy", () => {

    const tempEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "";
    server.start();
    expect(mockLog).toBeCalledWith("development server listening on port 8000");
    process.env.NODE_ENV = tempEnv;
});
