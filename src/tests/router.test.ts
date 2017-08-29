const mockGet = jest.fn();
const mockRouter = jest.fn(() => ({ get: mockGet }));

jest.mock("express", () => ({
    Router: mockRouter,
}));

import router, { getRootRequestHandler } from "../router";

describe("getRootRequestHandler", () => {

    it("should send json {message:'Hello, World!'} when no name is passed as a query", () => {

        const mockRes: any = {
            json: jest.fn(),
        };

        getRootRequestHandler({ query: {} } as any, mockRes, jest.fn());
        expect(mockRes.json).toBeCalledWith({ message: "Hello, World!" });
    });

    it("should send json {message:'Hello, Richard!'} when name Richard is passed as a query", () => {

        const mockRes: any = {
            json: jest.fn(),
        };

        getRootRequestHandler({ query: { name: "Richard" } } as any, mockRes, jest.fn());
        expect(mockRes.json).toBeCalledWith({ message: "Hello, Richard!" });
    });
});

describe("router", () => {

    it("should bind getRootRequestHandler to the HTTP GET method", () => {

        router();
        expect(mockGet).toBeCalledWith("/", getRootRequestHandler);
    });
});
