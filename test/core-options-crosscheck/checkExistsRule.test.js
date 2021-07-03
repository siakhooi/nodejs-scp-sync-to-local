const coc = require("../../lib/core-options-crosscheck");

test("checkExistsRule/error", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfExists: true, skipIfNotExists: true }
    };

    expect(coc.checkExistsRule(workingObject))
        .rejects
        .toThrow("Error: skipIfExists and skipIfNotExists are mutually exclusive.");
});

test.each([
    [true, false],
    [false, true],
    [false, false]
])("checkExistsRule/ok", (exist, notExist) => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfExists: exist, skipIfNotExists: notExist }
    };

    expect(coc.checkExistsRule(workingObject))
        .resolves;
});