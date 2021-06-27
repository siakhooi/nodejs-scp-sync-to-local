const core = require("../../lib/core-options-check");
const util = require('util');

test("verifySkipAgeExclusive/error", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfNewer: true, skipIfOlder: true }
    };

    expect(core.verifySkipAgeExclusive(workingObject))
        .rejects
        .toThrow("Error: skipIfNewer and skipIfOlder are mutually exclusive.");
});

test.each([
    [true, false],
    [false, true],
    [false, false]
])("verifySkipAgeExclusive/ok", (newer, older) => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfNewer: newer, skipIfOlder: older }
    };

    expect(core.verifySkipAgeExclusive(workingObject))
        .resolves;
});
