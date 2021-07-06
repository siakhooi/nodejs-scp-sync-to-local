const util = require('util');
const covb = require("../../lib/core-options-verify-basic");

const DEFAULT_QUIET = false;


test.each([true, "Y", "on", 1, "y", "yes"])("verifyQuiet/true", (value) => {
    var workingObject = {
        userOption: { quiet: value },
        validatedOption: {}
    };

    expect(covb.verifyQuiet(workingObject))
        .resolves
        .toMatchObject({
            userOption: { quiet: value },
            validatedOption: { quiet: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifyQuiet/false", (value) => {
    var workingObject = {
        userOption: { quiet: value },
        validatedOption: {}
    };

    expect(covb.verifyQuiet(workingObject))
        .resolves
        .toMatchObject({
            userOption: { quiet: value },
            validatedOption: { quiet: false }
        });
});

test("verifyQuiet/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    expect(covb.verifyQuiet(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { quiet: DEFAULT_QUIET }
        });
});

test.each(["ANC", "3453"])("verifyQuiet/not-boolean", (value) => {
    var workingObject = {
        userOption: { quiet: value },
        validatedOption: {}
    };
    var msg = util.format("Error: quiet is not a boolean value [%s].", value);
    expect(covb.verifyQuiet(workingObject))
        .rejects
        .toThrow(msg);
});
