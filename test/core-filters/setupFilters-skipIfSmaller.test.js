const corefilters = require("../../lib/core-filters");

test("filter/setupFilters/skipIfSmaller/true", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: false,
            skipIfNotExists: false,
            skipIfNewer: false,
            skipIfOlder: false,
            skipIfBigger: false,
            skipIfSmaller: true
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves
        .toMatchObject({
            fileFilters: [corefilters.skipIfSmaller]
        });
});

test("filter/setupFilters/skipIfSmaller/false", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: true,
            skipIfNotExists: false,
            skipIfNewer: false,
            skipIfOlder: false,
            skipIfBigger: false,
            skipIfSmaller: false
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({
            fileFilters: [corefilters.skipIfSmaller]
        });
});
