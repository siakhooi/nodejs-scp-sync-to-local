const scp = require("../index.js");

var option = {
  host: "192.168.0.106", //local vm
  port: 22,
  username: "testuser",
  password: "testpassword",
  remotePath: "/home/testuser/data",
  localPath: "./test/data",
  skipIfExists: true,
  verbose: true,
  quiet: true
};

scp.download(option);
