const cf0 = require("../../lib/core-filters");

test("setupFilters/skipIfNewer/true", () => {
    var workingObject = {
        validatedOption: { skipIfNewer: true },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [cf0.skipIfNewer] });
});

test("setupFilters/skipIfNewer/false", () => {
    var workingObject = {
        validatedOption: { skipIfNewer: false },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({ fileFilters: [cf0.skipIfNewer] });
});
