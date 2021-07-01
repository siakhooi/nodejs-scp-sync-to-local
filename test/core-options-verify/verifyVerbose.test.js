const util = require('util');
const cov = require("../../lib/core-options-verify");

const DEFAULT_VERBOSE = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifyVerbose/true", (value) => {
    var workingObject = {
        userOption: { verbose: value },
        validatedOption: {}
    };

    expect(cov.verifyVerbose(workingObject))
        .resolves
        .toMatchObject({
            userOption: { verbose: value },
            validatedOption: { verbose: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifyVerbose/false", (value) => {
    var workingObject = {
        userOption: { verbose: value },
        validatedOption: {}
    };

    expect(cov.verifyVerbose(workingObject))
        .resolves
        .toMatchObject({
            userOption: { verbose: value },
            validatedOption: { verbose: false }
        });
});

test("verifyVerbose/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    expect(cov.verifyVerbose(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { verbose: DEFAULT_VERBOSE }
        });
});

test.each(["ANC", "3453"])("verifyVerbose/not-boolean", (value) => {
    var workingObject = {
        userOption: { verbose: value },
        validatedOption: {}
    };
    var msg = util.format("Error: verbose is not a boolean value [%s].", value);
    expect(cov.verifyVerbose(workingObject))
        .rejects
        .toThrow(msg);
});
