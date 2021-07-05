const cov = require("../../lib/core-options-verify");
const util = require('util');

const DEFAULT_CUSTOMFILTER = null;

var dummyFunction = () => { }

test("verifyCustomFilter/good", () => {
    var workingObject = {
        userOption: { customFilter: dummyFunction },
        validatedOption: {}
    };

    expect(cov.verifyCustomFilter(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { customFilter: dummyFunction }
        });
});


test("verifyCustomFilter/undefined", () => {
    var workingObject = {
        userOption: {},
        validatedOption: {}
    };

    expect(cov.verifyCustomFilter(workingObject))
        .resolves
        .toMatchObject({
            userOption: {},
            validatedOption: { customFilter: DEFAULT_CUSTOMFILTER }
        });
});

test.each(["ANC", 3453, true])("verifyCustomFilter/not-function", (value) => {
    var workingObject = {
        userOption: { customFilter: value },
        validatedOption: {}
    };
    var msg = util.format("Error: customFilter is not a function [%s].", value)
    expect(cov.verifyCustomFilter(workingObject))
        .rejects
        .toThrow(msg);
});
