const core = require("../../lib/core-options-check");
const util = require('util');

test("verifySkipSizeExclusive/error", () => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfBigger: true, skipIfSmaller: true }
    };

    expect(core.verifySkipSizeExclusive(workingObject))
        .rejects
        .toThrow("Error: skipIfBigger and skipIfSmaller are mutually exclusive.");
});

test.each([
    [true, false],
    [false, true],
    [false, false]
])("verifySkipSizeExclusive/ok", (newer, older) => {
    var workingObject = {
        userOption: {},
        validatedOption: { skipIfBigger: newer, skipIfSmaller: older }
    };

    expect(core.verifySkipSizeExclusive(workingObject))
        .resolves;
});
