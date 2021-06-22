const core = require("../../lib/core-options.js");

test("verifyOptionsPassword", () => {
    var workingObject = {
        userOption: {
            password: "testpassword"
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsPassword(workingObject))
        .resolves
        .toMatchObject({
            userOption: {
                password: "testpassword"
            },
            validatedOption: {
                password: "testpassword"
            }
        });
});

test("verifyOptionsPassword-blank", () => {
    var workingObject = {
        userOption: {
            password: ""
        },
        validatedOption: {}
    };

    expect(core.verifyOptionsPassword(workingObject))
        .rejects
        .toMatch("Error: password is not defined.");
});
test("verifyOptionsPassword-undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    expect(core.verifyOptionsPassword(workingObject))
        .rejects
        .toMatch("Error: password is not defined.");
});
