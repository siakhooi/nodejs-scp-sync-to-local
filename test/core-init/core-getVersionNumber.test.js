const conf = require("../../index.conf.js");
const scp = require("../../index.js");

test("getVersionNumber", () => {
    return expect(scp.getVersionNumber()).toBe(conf.PROGRAM_VERSION);
});
