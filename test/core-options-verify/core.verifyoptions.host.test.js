const core = require("../../lib/core-options.js");

test("verifyOptionsHost", () => {
    var workingObject = {
        userOption: {
            host: "localhost"
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsHost(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                host: "localhost"
            },
            validatedOption: {
                host: "localhost"
            }
        });
});

test("verifyOptionsHost-blank", () => {
    var workingObject = {
        userOption: {
            host: ""
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsHost(workingObject))
        .rejects
        .toMatch("Error: host is not defined.");
});
test("verifyOptionsHost-undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    expect(core.verifyOptionsHost(workingObject))
        .rejects
        .toMatch("Error: host is not defined.");
});
