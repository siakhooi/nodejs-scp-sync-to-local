const cf0 = require("../../lib/core-filters");

test("setupFilters/skipIfExists/true", () => {
    var workingObject = {
        validatedOption: { skipIfExists: true },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [cf0.skipIfExists] });

});
test("setupFilters/skipIfExists/false", () => {
    var workingObject = {
        validatedOption: { skipIfExists: false },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({ fileFilters: [cf0.skipIfExists] });
});
