# scp-sync-to-local

- SCP all files in remote directory to local directory

## Status

- ![GitHub issues](https://img.shields.io/github/issues/siakhooi/nodejs-scp-sync-to-local) ![GitHub closed issues](https://img.shields.io/github/issues-closed/siakhooi/nodejs-scp-sync-to-local)
- ![build](https://github.com/siakhooi/nodejs-scp-sync-to-local/actions/workflows/build.yml/badge.svg) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest) ![GitHub repo size](https://img.shields.io/github/repo-size/siakhooi/nodejs-scp-sync-to-local) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/siakhooi/nodejs-scp-sync-to-local)
- ![deploy gpr](https://github.com/siakhooi/nodejs-scp-sync-to-local/actions/workflows/publish-gpr.yml/badge.svg) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/siakhooi/nodejs-scp-sync-to-local) ![GitHub all releases](https://img.shields.io/github/downloads/siakhooi/nodejs-scp-sync-to-local/total) ![GitHub Release Date](https://img.shields.io/github/release-date/siakhooi/nodejs-scp-sync-to-local)
- ![deploy npm](https://github.com/siakhooi/nodejs-scp-sync-to-local/actions/workflows/publish-npm.yml/badge.svg) ![npm](https://img.shields.io/npm/v/scp-sync-to-local) ![npm](https://img.shields.io/npm/dt/scp-sync-to-local)
- ![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/scp-sync-to-local)

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

## Other Reference

- <https://keepachangelog.com>
