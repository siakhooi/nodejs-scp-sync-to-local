const corefilters = require("../../lib/core-filters");

test("filter/setupFilters/skipIfSameAge/true", () => {
    var workingObject = {
        validatedOption: {
            skipIfSameAge: true
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves
        .toMatchObject({
            fileFilters: [corefilters.skipIfSameAge]
        });
});

test("filter/setupFilters/skipIfSameAge/false", () => {
    var workingObject = {
        validatedOption: {
            skipIfSameAge: false
        },
        fileFilters: []
    };

    return expect(corefilters.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({
            fileFilters: [corefilters.skipIfSameAge]
        });
});
