const scp = require("../index.js");

function err(e) { console.error(e); }

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
  verbose: true,
  quiet: false
};

scp.download(option).catch(err);
