const corefilters = require("../../lib/core-filters");

test("filter/setupFilters/skipIfExists/true", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: true,
            skipIfNotExists: false
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
            skipIfNotExists: true
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject)).resolves.not.toMatchObject({
        fileFilters: [corefilters.skipIfExists]
    });
});

test("filter/setupFilters/skipIfNotExists/true", () => {
    var workingObject = {
        validatedOption: {
            skipIfExists: false,
            skipIfNotExists: true
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
            skipIfNotExists: false
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject)).resolves.not.toMatchObject({
        fileFilters: [corefilters.skipIfNotExists]
    });
});
