const cf0 = require("../../lib/core-filters");

test("setupFilters/skipIfOlder/true", () => {
    var workingObject = {
        validatedOption: { skipIfOlder: true },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [cf0.skipIfOlder] });
});

test("setupFilters/skipIfOlder/false", () => {
    var workingObject = {
        validatedOption: { skipIfOlder: false },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({ fileFilters: [cf0.skipIfOlder] });
});
