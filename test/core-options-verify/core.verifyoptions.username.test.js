const core = require("../../lib/core-options.js");

test("verifyOptionsUser-Good", () => {
    var workingObject = {
        userOption: {
            username: "testuser"
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsUser(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                username: "testuser"
            },
            validatedOption: {
                username: "testuser"
            }
        });
});

test("verifyOptionsUser-blank", () => {
    var workingObject = {
        userOption: {
            username: ""
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsUser(workingObject))
        .rejects
        .toThrow("Error: username is not defined.");
});
test("verifyOptionsUser-undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    expect(core.verifyOptionsUser(workingObject))
        .rejects
        .toThrow("Error: username is not defined.");
});
