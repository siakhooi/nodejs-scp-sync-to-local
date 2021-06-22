const core = require("../../lib/core-options.js");
const conf = require('../../index.conf.js')
const util = require('util');

test.each([
    true, "Y", "on", 1, "y", "yes"
])("verifyOptionsSkipIfExists-Good-True", (value) => {
    var workingObject = {
        userOption: {
            skipIfExists: value
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                skipIfExists: value
            },
            validatedOption: {
                skipIfExists: true
            }
        });
});

test.each([
    false, "N", "off", 0, "n", "no"
])("verifyOptionsSkipIfExists-Good-False", (value) => {
    var workingObject = {
        userOption: {
            skipIfExists: value
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsSkipIfExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                skipIfExists: value
            },
            validatedOption: {
                skipIfExists: false
            }
        });
});

test("verifyOptionsSkipIfExists-undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };
    var warnOutput = [];
    global.console.warn = jest.fn().mockImplementation((s) => { warnOutput.push(s); })

    expect(core.verifyOptionsSkipIfExists(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                skipIfExists: conf.DEFAULT_SKIPIFEXISTS
            }
        });
    var msg = util.format("Warning: skipIfExists undefined, defaulting to %s.", conf.DEFAULT_SKIPIFEXISTS);
    expect(console.warn).toBeCalled();
    expect(warnOutput).toContain(msg);
});

test.each(["ANC", "3453"])("verifyOptionsSkipIfExists-Not Boolean", (value) => {
    var workingObject = {
        userOption: {
            skipIfExists: value
        },
        validatedOption: {}
    };
    var msg = util.format("Error: skipIfExists is not a boolean value [%s].", value);
    expect(core.verifyOptionsSkipIfExists(workingObject))
        .rejects
        .toMatch(msg);
});
