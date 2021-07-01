const cf0 = require("../../lib/core-filters");

test("setupFilters/skipIfSameSize/true", () => {
    var workingObject = {
        validatedOption: { skipIfSameSize: true },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [cf0.skipIfSameSize] });
});

test("setupFilters/skipIfSameSize/false", () => {
    var workingObject = {
        validatedOption: { skipIfSameSize: false },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({ fileFilters: [cf0.skipIfSameSize] });
});
