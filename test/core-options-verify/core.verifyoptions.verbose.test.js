const core = require("../../lib/core-options.js");
const conf = require('../../index.conf.js')
const util = require('util');

test.each([true, "Y", "on", 1, "y", "yes"])("verifyOptionsVerbose-Good-True", (value) => {
    var workingObject = {
        userOption: {
            verbose: value
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsVerbose(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                verbose: value
            },
            validatedOption: {
                verbose: true
            }
        });
});

test.each([false, "N", "off", 0, "n", "no"])("verifyOptionsVerbose-Good-False", (value) => {
    var workingObject = {
        userOption: {
            verbose: value
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsVerbose(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                verbose: value
            },
            validatedOption: {
                verbose: false
            }
        });
});

test("verifyOptionsVerbose-undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    expect(core.verifyOptionsVerbose(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: {
                verbose: conf.DEFAULT_VERBOSE
            }
        });
});

test.each(["ANC", "3453"])("verifyOptionsVerbose-Not Boolean", (value) => {
    var workingObject = {
        userOption: {
            verbose: value
        },
        validatedOption: {}
    };
    var msg = util.format("Error: verbose is not a boolean value [%s].", value);
    expect(core.verifyOptionsVerbose(workingObject))
        .rejects
        .toThrow(msg);
});
