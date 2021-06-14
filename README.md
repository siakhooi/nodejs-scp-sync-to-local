# scp-sync-to-local

- SCP all files in remote directory to local directory

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
