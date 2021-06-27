const corefilters = require("../../lib/core-filters");

test("filter/setupFilters/mixed", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: true,
            skipIfNotExists: false,
            skipIfNewer: true
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves
        .toMatchObject({
            fileFilters: [corefilters.skipIfExists, corefilters.skipIfNewer]
        });
});

test("filter/setupFilters/mixed", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: false,
            skipIfNotExists: true,
            skipIfNewer: true
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves
        .toMatchObject({
            fileFilters: [corefilters.skipIfNotExists, corefilters.skipIfNewer]
        });
});
