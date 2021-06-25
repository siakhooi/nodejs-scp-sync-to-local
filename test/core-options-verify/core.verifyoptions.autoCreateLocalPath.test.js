const core = require("../../lib/core-options");
const util = require('util');

const DEFAULT_AUTOCREATELOCALPATH = true;


test.each([true, "Y", "on", 1, "y", "yes"])("verifyOptions/AutoCreateLocalPath/true", (value) => {
    var workingObject = {
        userOption: { autoCreateLocalPath: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsAutoCreateLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: { autoCreateLocalPath: value },
            validatedOption: { autoCreateLocalPath: true }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifyOptions/autoCreateLocalPath/false", (value) => {
    var workingObject = {
        userOption: { autoCreateLocalPath: value },
        validatedOption: {}
    };

    expect(core.verifyOptionsAutoCreateLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: { autoCreateLocalPath: value },
            validatedOption: { autoCreateLocalPath: false }
        });
});

test("verifyOptions/autoCreateLocalPath/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    expect(core.verifyOptionsAutoCreateLocalPath(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                autoCreateLocalPath: DEFAULT_AUTOCREATELOCALPATH
            }
        });
});

test.each(["ANC", "3453"])("verifyOptions/autoCreateLocalPath/not-boolean", (value) => {
    var workingObject = {
        userOption: { autoCreateLocalPath: value },
        validatedOption: {}
    };
    var msg = util.format("Error: autoCreateLocalPath is not a boolean value [%s].", value);
    expect(core.verifyOptionsAutoCreateLocalPath(workingObject))
        .rejects
        .toThrow(msg);
});
