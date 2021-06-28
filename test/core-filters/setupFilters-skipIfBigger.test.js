const corefilters = require("../../lib/core-filters");

test("filter/setupFilters/skipIfBigger/true", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: false,
            skipIfNotExists: false,
            skipIfNewer: false,
            skipIfOlder: false,
            skipIfBigger: true
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves
        .toMatchObject({
            fileFilters: [corefilters.skipIfBigger]
        });
});

test("filter/setupFilters/skipIfBigger/false", () => {
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
            fileFilters: [corefilters.skipIfBigger]
        });
});
