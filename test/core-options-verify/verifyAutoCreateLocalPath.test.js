const cov = require("../../lib/core-options-verify");
const util = require('util');

const DEFAULT_AUTOCREATELOCALPATH = true;


test.each([true, "Y", "on", 1, "y", "yes"])("verifyAutoCreateLocalPath/true", (value) => {
    var workingObject = {
        userOption: { autoCreateLocalPath: value },
        validatedOption: {}
    };

    expect(cov.verifyAutoCreateLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: { autoCreateLocalPath: value },
            validatedOption: { autoCreateLocalPath: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifyAutoCreateLocalPath/false", (value) => {
    var workingObject = {
        userOption: { autoCreateLocalPath: value },
        validatedOption: {}
    };

    expect(cov.verifyAutoCreateLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: { autoCreateLocalPath: value },
            validatedOption: { autoCreateLocalPath: false }
        });
});

test("verifyAutoCreateLocalPath/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    expect(cov.verifyAutoCreateLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { autoCreateLocalPath: DEFAULT_AUTOCREATELOCALPATH }
        });
});

test.each(["ANC", "3453"])("verifyAutoCreateLocalPath/not-boolean", (value) => {
    var workingObject = {
        userOption: { autoCreateLocalPath: value },
        validatedOption: {}
    };
    var msg = util.format("Error: autoCreateLocalPath is not a boolean value [%s].", value);
    expect(cov.verifyAutoCreateLocalPath(workingObject))
        .rejects
        .toThrow(msg);
});
