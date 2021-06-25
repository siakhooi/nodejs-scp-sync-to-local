const u = require("../../lib/core-util");

test.each([
    "1", "Y", "y", "on", "On", "Yes", "YES", 1, true, "TRUE"
])("isTrue/true", (value) => {
    return expect(u.isTrue(value)).toBe(true);
});
test.each([
    "0", "N", "n", "off", "Off", "No", "NO", 0, false, "FALSE"
])("isTrue/false", (value) => {
    return expect(u.isTrue(value)).toBe(false);
});
test.each([
    "ABC", 123
])("isTrue/not-boolean", (value) => {
    return expect(u.isTrue(value)).toBe(true);
});


test.each([
    "1", "Y", "y", "on", "On", "Yes", "YES", 1, true, "TRUE"
])("isBoolean/true", (value) => {
    return expect(u.isBoolean(value)).toBe(true);
});
test.each([
    "0", "N", "n", "off", "Off", "No", "NO", 0, false, "FALSE"
])("isBoolean/false", (value) => {
    return expect(u.isBoolean(value)).toBe(true);
});
test.each([
    "ABC", 1234
])("isBoolean/not-boolean", (value) => {
    return expect(u.isBoolean(value)).toBe(false);
});
