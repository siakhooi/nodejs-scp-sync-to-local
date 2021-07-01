const cf0 = require("../../lib/core-filters");

test("setupFilters/skipIfSameAge/true", () => {
    var workingObject = {
        validatedOption: { skipIfSameAge: true },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [cf0.skipIfSameAge] });
});

test("setupFilters/skipIfSameAge/false", () => {
    var workingObject = {
        validatedOption: { skipIfSameAge: false },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({ fileFilters: [cf0.skipIfSameAge] });
});
