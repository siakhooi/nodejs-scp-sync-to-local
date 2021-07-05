const cf0 = require("../../lib/core-filters");

var dummyFunction = () => { }

test("setupFilters/customFilter/true", () => {
    var workingObject = {
        validatedOption: { customFilter: dummyFunction },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [dummyFunction] });
});

test("setupFilters/customFilter/false", () => {
    var workingObject = {
        validatedOption: { customFilter: null },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves.not
        .toMatchObject({ fileFilters: [dummyFunction] });
});
