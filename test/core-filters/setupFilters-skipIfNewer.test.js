const corefilters = require("../../lib/core-filters");

test("filter/setupFilters/skipIfNewer/true", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: false,
            skipIfNotExists: false,
            skipIfNewer: true,
            skipIfOlder: false
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves
        .toMatchObject({
            fileFilters: [corefilters.skipIfNewer]
        });
});

test("filter/setupFilters/skipIfNewer/false", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: true,
            skipIfNotExists: false,
            skipIfNewer: false,
            skipIfOlder: false
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({
            fileFilters: [corefilters.skipIfNewer]
        });
});
