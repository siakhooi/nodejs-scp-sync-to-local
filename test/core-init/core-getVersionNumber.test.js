const scp = require("../../index");
const conf = require("../../index.conf");

test("getVersionNumber", () => {
    return expect(scp.getVersionNumber())
        .toBe(conf.PROGRAM_VERSION);
});
