const core = require("../../lib/core-options-exclusive-check.js");
const util = require('util');

test("verifySkipExistsExclusive", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfExists: true, skipIfNotExists: true }
    };

    expect(core.verifySkipExistsExclusive(workingObject))
        .rejects
        .toMatch("Error: skipIfExists and skipIfNotExists are mutually exclusive.");
});

test.each([
    [true, false],
    [false, true],
    [false, false]
])("verifySkipExistsExclusive-true", (exist, notExist) => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfExists: exist, skipIfNotExists: notExist }
    };

    expect(core.verifySkipExistsExclusive(workingObject))
        .resolves;
});
