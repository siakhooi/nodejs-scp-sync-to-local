const scp = require("../index.js");

var option = {
  host: "192.168.0.106", //local vm
  port: "22",
  username: "testuser",
  password: "testpassword",
  remotepath: "/home/testuser/data",
  localpath: "./test/data",
  skipIfExists: true
};

scp.download(option);
