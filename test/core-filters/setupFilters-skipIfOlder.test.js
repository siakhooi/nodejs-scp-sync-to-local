const corefilters = require("../../lib/core-filters");

test("filter/setupFilters/skipIfOlder/true", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: false,
            skipIfNotExists: false,
            skipIfNewer: false,
            skipIfOlder: true,
            skipIfBigger: false
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves
        .toMatchObject({
            fileFilters: [corefilters.skipIfOlder]
        });
});

test("filter/setupFilters/skipIfOlder/false", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: true,
            skipIfNotExists: false,
            skipIfNewer: false,
            skipIfOlder: false,
            skipIfBigger: false
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({
            fileFilters: [corefilters.skipIfOlder]
        });
});
