const scp = require("../index");
const cf = require("../filters");

function err(e) { console.error(e); }

//downloadOnlyThisFile = (l, r) => { return r.name == 'xxx.zip' }
//downloadOnlyThisFile = (l, r) => { return r.name == 'xxx.zip' || cf.skipIfExists(l, r); }

var option = {
  host: "192.168.0.106", //local vm
  port: 22,
  username: "testuser",
  password: "testpassword",
  remotePath: "/home/testuser/data",
  localPath: "./test-data",
  skipIfExists: false,
  skipIfNotExists: false,
  skipIfNewer: false,
  skipIfOlder: false,
  skipIfSameAge: false,
  skipIfBigger: false,
  skipIfSmaller: false,
  skipIfSameSize: false,
  customFilter: null,
  verbose: true,
  quiet: false
};

scp.download(option).catch(err);
