const cu = require("../../lib/core-util");

test.each([
    "1", "Y", "y", "on", "On", "Yes", "YES", 1, true, "TRUE"
])("isBoolean/true", (value) => {
    return expect(cu.isBoolean(value)).toBe(true);
});
test.each([
    "0", "N", "n", "off", "Off", "No", "NO", 0, false, "FALSE"
])("isBoolean/false", (value) => {
    return expect(cu.isBoolean(value)).toBe(true);
});
test.each([
    "ABC", 1234
])("isBoolean/not-boolean", (value) => {
    return expect(cu.isBoolean(value)).toBe(false);
});
