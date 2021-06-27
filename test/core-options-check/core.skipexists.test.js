const core = require("../../lib/core-options-check");
const util = require('util');

test("verifySkipExistsExclusive/error", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfExists: true, skipIfNotExists: true }
    };

    expect(core.verifySkipExistsExclusive(workingObject))
        .rejects
        .toThrow("Error: skipIfExists and skipIfNotExists are mutually exclusive.");
});

test.each([
    [true, false],
    [false, true],
    [false, false]
])("verifySkipExistsExclusive/ok", (exist, notExist) => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfExists: exist, skipIfNotExists: notExist }
    };

    expect(core.verifySkipExistsExclusive(workingObject))
        .resolves;
});
