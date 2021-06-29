const corefilters = require("../../lib/core-filters");

test("filter/setupFilters/skipIfSameSize/true", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: false,
            skipIfNotExists: false,
            skipIfNewer: false,
            skipIfOlder: false,
            skipIfBigger: false,
            skipIfSmaller: false,
            skipIfSameSize: true
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves
        .toMatchObject({
            fileFilters: [corefilters.skipIfSameSize]
        });
});

test("filter/setupFilters/skipIfSameSize/false", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: true,
            skipIfNotExists: false,
            skipIfNewer: false,
            skipIfOlder: false,
            skipIfBigger: false,
            skipIfSmaller: false,
            skipIfSameSize: false
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({
            fileFilters: [corefilters.skipIfSameSize]
        });
});
