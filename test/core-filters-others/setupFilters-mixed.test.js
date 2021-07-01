const cf0 = require("../../lib/core-filters");

test("setupFilters/mixed/1", () => {
    var workingObject = {
        validatedOption: { skipIfExists: true, skipIfNewer: true },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [cf0.skipIfExists, cf0.skipIfNewer] });
});

test("setupFilters/mixed/2", () => {
    var workingObject = {
        validatedOption: { skipIfNotExists: true, skipIfOlder: true },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [cf0.skipIfNotExists, cf0.skipIfOlder] });
});

test("setupFilters/mixed/3", () => {
    var workingObject = {
        validatedOption: { skipIfBigger: true, skipIfSmaller: true },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [cf0.skipIfBigger, cf0.skipIfSmaller] });
});

test("setupFilters/mixed/4", () => {
    var workingObject = {
        validatedOption: { skipIfNewer: true, skipIfOlder: true },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [cf0.skipIfNewer, cf0.skipIfOlder] });
});
test("setupFilters/mixed/5", () => {
    var workingObject = {
        validatedOption: { skipIfNewer: true, skipIfOlder: true, skipIfSameAge: true },
        fileFilters: []
    };

    return expect(cf0.setupFilters(workingObject))
        .resolves
        .toMatchObject({ fileFilters: [cf0.skipIfNewer, cf0.skipIfOlder, cf0.skipIfSameAge] });
});
