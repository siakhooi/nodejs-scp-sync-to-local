const corefilters = require("../../lib/core-filters");

test("filter/setupFilters/mixed", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: true,
            skipIfNotExists: false,
            skipIfNewer: true,
            skipIfOlder: false
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
            skipIfNewer: false,
            skipIfOlder: true
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves
        .toMatchObject({
            fileFilters: [corefilters.skipIfNotExists, corefilters.skipIfOlder]
        });
});

test("filter/setupFilters/mixed", () => {
    var workingObject = {
        validatedOption: {
            skipIfBigger: true,
            skipIfSmaller: true
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves
        .toMatchObject({
            fileFilters: [corefilters.skipIfBigger, corefilters.skipIfSmaller]
        });
});

test("filter/setupFilters/mixed", () => {
    var workingObject = {
        validatedOption: {
            skipIfNewer: true,
            skipIfOlder: true
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves
        .toMatchObject({
            fileFilters: [corefilters.skipIfNewer, corefilters.skipIfOlder]
        });
});
