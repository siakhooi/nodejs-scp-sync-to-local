# scp-sync-to-local

- SCP all files in remote directory to local directory

## Status

- ![build](https://github.com/siakhooi/nodejs-scp-sync-to-local/actions/workflows/build.yml/badge.svg) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
- ![deploy gpr](https://github.com/siakhooi/nodejs-scp-sync-to-local/actions/workflows/publish-gpr.yml/badge.svg)
- ![deploy npm](https://github.com/siakhooi/nodejs-scp-sync-to-local/actions/workflows/publish-npm.yml/badge.svg) [![npm version](https://badge.fury.io/js/scp-sync-to-local.svg)](https://badge.fury.io/js/scp-sync-to-local)

## Install

```bash
npm install scp-sync-to-local [--save]
```

## Usage

- see [USAGE.md](USAGE.md)

### Quick Example

```js
const scp = require("scp-sync-to-local");

var option = {
  host: "hostname",
  username: "yourUsername",
  password: "yourPassword",
  remotePath: "remotePath",
  localPath: "localPath",
};

scp.download(option);
```

## Locations

- <https://www.npmjs.com/package/scp-sync-to-local>
- <https://github.com/siakhooi/nodejs-scp-sync-to-local>
