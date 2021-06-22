const u = require("../../lib/core-util.js");

test.each(["1", "Y", "y", "on", "On", "Yes", "YES", 1, true, "TRUE"])("isTrue-True", (value) => {
    return expect(u.isTrue(value)).toBe(true);
});
test.each(["0", "N", "n", "off", "Off", "No", "NO", 0, false, "FALSE"])("isTrue-False", (value) => {
    return expect(u.isTrue(value)).toBe(false);
});
test.each(["ABC", 123])("isTrue-Wrong", (value) => {
    return expect(u.isTrue(value)).toBe(true);
});


test.each(["1", "Y", "y", "on", "On", "Yes", "YES", 1, true, "TRUE"])("isBoolean-True", (value) => {
    return expect(u.isBoolean(value)).toBe(true);
});
test.each(["0", "N", "n", "off", "Off", "No", "NO", 0, false, "FALSE"])("isBoolean-False", (value) => {
    return expect(u.isBoolean(value)).toBe(true);
});
test.each(["ABC", 1234])("isBoolean-Wrong", (value) => {
    return expect(u.isBoolean(value)).toBe(false);
});

