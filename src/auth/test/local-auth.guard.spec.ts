import { LocalAuthGuard } from "../guards/local-auth.guard";

describe("LocalAuthGuard", () => {
    it("should be defined", () => {
        expect(new LocalAuthGuard()).toBeDefined();
    });
});
