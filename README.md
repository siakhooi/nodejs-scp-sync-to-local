# scp-sync-to-local

- SCP all files in remote directory to local directory

## Status

![GitHub](https://img.shields.io/github/license/siakhooi/nodejs-scp-sync-to-local)
![GitHub issues](https://img.shields.io/github/issues/siakhooi/nodejs-scp-sync-to-local)
![GitHub closed issues](https://img.shields.io/github/issues-closed/siakhooi/nodejs-scp-sync-to-local)
![GitHub top language](https://img.shields.io/github/languages/top/siakhooi/nodejs-scp-sync-to-local)
![GitHub language count](https://img.shields.io/github/languages/count/siakhooi/nodejs-scp-sync-to-local)
![GitHub repo size](https://img.shields.io/github/repo-size/siakhooi/nodejs-scp-sync-to-local)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/siakhooi/nodejs-scp-sync-to-local)  
![test](https://github.com/siakhooi/nodejs-scp-sync-to-local/actions/workflows/test-eslint.yml/badge.svg)
![test](https://github.com/siakhooi/nodejs-scp-sync-to-local/actions/workflows/test-jest.yml/badge.svg)
![test](https://github.com/siakhooi/nodejs-scp-sync-to-local/actions/workflows/test-jest-coveralls.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/siakhooi/nodejs-scp-sync-to-local/badge.svg?branch=master)](https://coveralls.io/github/siakhooi/nodejs-scp-sync-to-local?branch=master)
![Coveralls](https://img.shields.io/coveralls/github/siakhooi/nodejs-scp-sync-to-local)  
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siakhooi/nodejs-scp-sync-to-local/Publish%20to%20GitHub%20Package%20Registry)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/siakhooi/nodejs-scp-sync-to-local)
![deploy gpr](https://github.com/siakhooi/nodejs-scp-sync-to-local/actions/workflows/publish-gpr.yml/badge.svg)
![GitHub all releases](https://img.shields.io/github/downloads/siakhooi/nodejs-scp-sync-to-local/total?color=33cb56)
![GitHub Release Date](https://img.shields.io/github/release-date/siakhooi/nodejs-scp-sync-to-local)  
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/siakhooi/nodejs-scp-sync-to-local/Publish%20to%20npm%20Registry)
![npm](https://img.shields.io/npm/v/scp-sync-to-local?color=0e7fc0&label=release)
![deploy npm](https://github.com/siakhooi/nodejs-scp-sync-to-local/actions/workflows/publish-npm.yml/badge.svg)
![npm](https://img.shields.io/npm/dt/scp-sync-to-local)  
![npms.io (final)](https://img.shields.io/npms-io/final-score/scp-sync-to-local)
![npms.io (final)](https://img.shields.io/npms-io/maintenance-score/scp-sync-to-local)
![npms.io (final)](https://img.shields.io/npms-io/quality-score/scp-sync-to-local)
![npms.io (final)](https://img.shields.io/npms-io/popularity-score/scp-sync-to-local)  
[![Generic badge](https://img.shields.io/badge/Funding-BuyMeACoffee-33cb56.svg)](https://www.buymeacoffee.com/siakhooi)
[![Generic badge](https://img.shields.io/badge/Funding-Ko%20Fi-33cb56.svg)](https://ko-fi.com/siakhooi)

## Install

```bash
npm install scp-sync-to-local [--save]
```

## Usage

- see [USAGE as package](USAGE.md)
- see [Usage as CLI](CLI.md)

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
- <https://coveralls.io/github/siakhooi/nodejs-scp-sync-to-local>

## Dependencies

- <https://www.npmjs.com/package/node-scp>
- <https://www.npmjs.com/package/prompt>

## Other Reference

- <https://keepachangelog.com>
- <https://github.com/standard/standard>
