# Usage

- This module allow users to download files in a remote directory into a local directory via `scp`.

## To Install

```bash
npm install scp-sync-to-local [--save]
```

## To use this module

```js
const scp = require("scp-sync-to-local");
```

## `scp.download(option)`

### `option`

| name           | type      | default value | description |
| -------------- | --------- | ------------- | ----------- |
| `host`         | `String`  |               |             |
| `port`         | `integer` | `22`          |             |
| `username`     | `String`  |               |             |
| `password`     | `String`  |               |             |
| `remotepath`   | `String`  | `.`           |             |
| `localpath`    | `String`  | `.`           |             |
| `skipIfExists` | `boolean` | `true`        |             |

### Example

```js
var option = {
  host: "hostname",
  port: "22",
  username: "yourusername",
  password: "yourpassword",
  remotepath: "remotepath",
  localpath: "localpath",
  skipIfExists: true,
};

scp.download(option);
```
