import { UnauthorizedExceptionFilter } from "../filters/unauthorized-exception.filter";

describe("UnauthorizedExceptionFilter", () => {
    it("should be defined", () => {
        expect(new UnauthorizedExceptionFilter()).toBeDefined();
    });
});
