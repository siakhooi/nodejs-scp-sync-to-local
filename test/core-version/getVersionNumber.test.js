const conf = require("../../index.conf");
const cv0 = require("../../lib/core-version");

test("cv0/getVersionNumber", () => {
    return expect(cv0.getVersionNumber())
        .toBe(conf.PROGRAM_VERSION);
});
