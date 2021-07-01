const cf0 = require("../../lib/core-filters");

test("setupFilters/skipIfBigger/true", () => {
    var workingObject = {
        validatedOption: { skipIfBigger: true },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [cf0.skipIfBigger] });
});

test("setupFilters/skipIfBigger/false", () => {
    var workingObject = {
        validatedOption: { skipIfBigger: false },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({ fileFilters: [cf0.skipIfBigger] });
});
