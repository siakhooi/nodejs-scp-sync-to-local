const cf0 = require("../../lib/core-filters");

test("setupFilters/skipIfSmaller/true", () => {
    var workingObject = {
        validatedOption: { skipIfSmaller: true },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [cf0.skipIfSmaller] });
});

test("setupFilters/skipIfSmaller/false", () => {
    var workingObject = {
        validatedOption: { skipIfSmaller: false },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({ fileFilters: [cf0.skipIfSmaller] });
});
