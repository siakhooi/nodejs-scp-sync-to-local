const corefilters = require("../../lib/core-filters");

test("filter/setupFilters/skipIfExists/true", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: true,
            skipIfNotExists: false,
            skipIfNewer: false,
            skipIfOlder: false
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject)).resolves.toMatchObject({
        fileFilters: [corefilters.skipIfExists]
    });

});
test("filter/setupFilters/skipIfExists/false", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: false,
            skipIfNotExists: true,
            skipIfNewer: false,
            skipIfOlder: false
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject)).resolves.not.toMatchObject({
        fileFilters: [corefilters.skipIfExists]
    });
});
