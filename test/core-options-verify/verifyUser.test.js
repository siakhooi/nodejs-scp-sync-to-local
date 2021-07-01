const cov = require("../../lib/core-options-verify");

test("verifyUser/Good", () => {
    var workingObject = {
        userOption: { username: "testuser" },
        validatedOption: {}
    };

    expect(cov.verifyUser(workingObject))
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

test("verifyUser/blank", () => {
    var workingObject = {
        userOption: {
            username: ""
        },
        validatedOption: {}
    };

    expect(cov.verifyUser(workingObject))
        .rejects
        .toThrow("Error: username is not defined.");
});
test("verifyUser/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    expect(cov.verifyUser(workingObject))
        .rejects
        .toThrow("Error: username is not defined.");
});
