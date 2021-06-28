const corefilters = require("../../lib/core-filters");

test("filter/setupFilters/skipIfNotExists/true", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: false,
            skipIfNotExists: true,
            skipIfNewer: false,
            skipIfOlder: false,
            skipIfBigger: false
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject)).resolves.toMatchObject({
        fileFilters: [corefilters.skipIfNotExists]
    });

});
test("filter/setupFilters/skipIfNotExists/false", () => {
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

    return expect(corefilters.setupFilters(workingObject)).resolves.not.toMatchObject({
        fileFilters: [corefilters.skipIfNotExists]
    });
});
